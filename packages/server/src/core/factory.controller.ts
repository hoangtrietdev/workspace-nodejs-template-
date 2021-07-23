/* eslint-disable max-classes-per-file */

import { IsDate, IsNumber, IsString, Max, Min } from 'class-validator';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import {
  BadRequestException,
  Body,
  Delete,
  Get,
  Injectable,
  Param,
  PipeTransform,
  Post,
  Put,
  Query,
  Type,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  ApiQuery,
  getSchemaPath,
} from '@nestjs/swagger';
import { DECORATORS } from '@nestjs/swagger/dist/constants';
import { ModelPropertiesAccessor } from '@nestjs/swagger/dist/services/model-properties-accessor';

import { IBaseService, IPagingResult } from './factory.service';

const modelPropertiesAccessor = new ModelPropertiesAccessor();

export interface IStarndardOperators<T> {
  in?: T[];
  nin?: T[];
}

export interface IRangeOperators<T> {
  gt?: T;
  gte?: T;
  lt?: T;
  lte?: T;
}

type OperatorMap = {
  string: IStarndardOperators<string>;
  number: IStarndardOperators<number> & IRangeOperators<number>;
};

export type IFilterWhereOptions<T> = {
  [k in keyof T]?: T[k] extends string
    ? OperatorMap['string'] | string
    : T[k] extends number
    ? OperatorMap['number'] | number
    : T[k];
};

class StringOperators implements IStarndardOperators<string> {
  @ApiProperty({ type: String, isArray: true, required: false })
  in?: string[];

  @ApiProperty({ type: String, isArray: true, required: false })
  nin?: string[];
}

class NumberOperators
  implements IStarndardOperators<number>, IRangeOperators<number>
{
  @ApiProperty({ type: Number, isArray: true, required: false })
  in?: number[];

  @ApiProperty({ type: Number, isArray: true, required: false })
  nin?: number[];

  @ApiProperty({ type: Number, required: false })
  gt?: number;

  @ApiProperty({ type: Number, required: false })
  gte?: number;

  @ApiProperty({ type: Number, required: false })
  lt?: number;

  @ApiProperty({ type: Number, required: false })
  lte?: number;
}
class DateOperators implements IRangeOperators<Date> {
  @ApiProperty({ type: Date, required: false })
  gt?: Date;

  @ApiProperty({ type: Date, required: false })
  gte?: Date;

  @ApiProperty({ type: Date, required: false })
  lt?: Date;

  @ApiProperty({ type: Date, required: false })
  lte?: Date;
}

export type OrderDirection = 'ASC' | 'DESC';

export type IFilterOrderOptions<T> = {
  [field in keyof T]?: OrderDirection;
};

export interface IFilterOptions<T> {
  select?: Extract<keyof T, string>[];
  where?: IFilterWhereOptions<T>;
  order?: IFilterOrderOptions<T>;
}

export interface IPagingFilterOptions<T> extends IFilterOptions<T> {
  skip?: number;
  take?: number;
}

export interface IBaseController<T> {
  list?(options: FindManyOptions<T>): Promise<IPagingResult<T>>;
  findOne?(options: FindOneOptions<T>): Promise<T>;
  findById?(id: string): Promise<T>;
  create?(data: T): Promise<T>;
  update?(id: string, data: T): Promise<T>;
  deleteById?(id: string): Promise<boolean>;
}

@Injectable()
export class ParseFilterPipe<T>
  implements PipeTransform<string | Record<string, any>, FindManyOptions<T>>
{
  transform(value: string | Record<string, any>): FindManyOptions<T> {
    let parsed: IPagingFilterOptions<T> = {};

    if (typeof value === 'string') {
      try {
        parsed = JSON.parse(value || '{}');
      } catch (err) {
        throw new BadRequestException('Bad filter');
      }
    } else {
      parsed = value;
    }

    const filter: FindManyOptions<T> = {};
    if (Array.isArray(parsed.select)) {
      filter.select = parsed.select;
    }
    if (parsed.skip && !Number.isNaN(parsed.skip)) {
      filter.skip = Number(parsed.skip);
    }
    if (parsed.take && !Number.isNaN(parsed.take)) {
      filter.take = Number(parsed.take);
    }
    if (parsed.where) {
      if (typeof parsed.where === 'string') {
        try {
          parsed.where = JSON.parse(parsed.where || '{}');
        } catch (err) {
          throw new BadRequestException('Bad filter');
        }
      }
      filter.where = Object.keys(parsed.where).reduce((all, field) => {
        const fieldFilter = parsed.where[field];

        if (typeof fieldFilter !== 'object') {
          all[field] = fieldFilter;
        }

        return all;
      }, {});
    }
    if (parsed.order) {
      if (typeof parsed.order === 'string') {
        try {
          parsed.order = JSON.parse(parsed.order || '{}');
        } catch (err) {
          throw new BadRequestException('Bad filter');
        }
      }
      filter.order = parsed.order;
    }

    return filter;
  }
}

const OptionalDecorator =
  (
    enabled: boolean,
    decorator: (...args: any[]) => MethodDecorator,
    ...params: any[]
  ): MethodDecorator =>
  (target: any, key: string | symbol, descriptor: any) => {
    if (!enabled) return;
    return decorator(...params)(target, key, descriptor);
  };

const createPagingResultClass = <T>(clz: Type<T>): Type<IPagingResult<T>> => {
  class PagingResult implements IPagingResult<T> {
    @ApiProperty()
    total: number;

    @ApiProperty()
    skip: number;

    @ApiProperty()
    take: number;

    @ApiProperty({ type: clz, isArray: true })
    data: T[];
  }

  Object.defineProperty(PagingResult, 'name', {
    writable: false,
    configurable: true,
    value: `${clz.name}PagingResult`,
  });

  return PagingResult;
};

const createWhereOptionsClass = <T>(clz: Type<T>) => {
  @ApiExtraModels(StringOperators, NumberOperators, DateOperators)
  class WhereOptions {}

  const fields = modelPropertiesAccessor.getModelProperties(clz.prototype);
  fields.forEach((field) => {
    const metadata: any = Reflect.getMetadata(
      DECORATORS.API_MODEL_PROPERTIES,
      clz.prototype,
      field,
    );
    switch (metadata.type) {
      case String:
      case 'string':
        ApiProperty({
          required: false,
          type: String,
          oneOf: [
            { type: 'string', enum: metadata.enum },
            { $ref: getSchemaPath(StringOperators) },
          ],
        })(WhereOptions.prototype, field);
        IsString()(WhereOptions.prototype, field);
        break;
      case Number:
      case 'number':
        ApiProperty({
          required: false,
          type: Number,
          oneOf: [{ type: 'number' }, { $ref: getSchemaPath(NumberOperators) }],
        })(WhereOptions.prototype, field);
        IsNumber()(WhereOptions.prototype, field);
        break;
      case Date:
      case 'date':
        ApiProperty({
          required: false,
          type: NumberOperators,
        })(WhereOptions.prototype, field);
        IsDate()(WhereOptions.prototype, field);
        break;
      default:
        ApiProperty({
          ...metadata,
          required: false,
        })(WhereOptions.prototype, field);
    }
  });

  Object.defineProperty(WhereOptions, 'name', {
    writable: false,
    configurable: true,
    value: `${clz.name}WhereOptions`,
  });

  return WhereOptions;
};

const createOrderOptionsClass = <T>(clz: Type<T>) => {
  class OrderOptions {}

  const fields = modelPropertiesAccessor.getModelProperties(clz.prototype);
  fields.forEach((field) => {
    ApiProperty({
      type: String,
      required: false,
      enum: ['ASC', 'DESC'],
      enumName: 'OrderDirection',
    })(OrderOptions.prototype, field);
  });

  Object.defineProperty(OrderOptions, 'name', {
    writable: false,
    configurable: true,
    value: `${clz.name}OrderOptions`,
  });

  return OrderOptions;
};

const createFilterOptionsClass = <T>(
  clz: Type<T>,
  whereClz: Type<IFilterWhereOptions<T>>,
  orderClz: Type<IFilterOrderOptions<T>>,
  paging = false,
): Type<IFilterOptions<T>> => {
  const fields = modelPropertiesAccessor.getModelProperties(clz.prototype);

  @ApiExtraModels(whereClz, orderClz)
  class FilterOptions implements IFilterOptions<T> {
    @ApiProperty({
      type: String,
      isArray: true,
      required: false,
      enum: fields,
    })
    select?: Extract<keyof T, string>[];

    @ApiProperty({ required: false, type: whereClz })
    where?: IFilterWhereOptions<T>;

    @ApiProperty({ required: false, type: orderClz })
    order?: IFilterOrderOptions<T>;
  }

  if (paging) {
    ApiProperty({ required: false, type: Number })(
      FilterOptions.prototype,
      'skip',
    );
    ApiProperty({ required: false, type: Number })(
      FilterOptions.prototype,
      'take',
    );

    IsNumber()(FilterOptions.prototype, 'skip');
    IsNumber()(FilterOptions.prototype, 'take');
    Min(0)(FilterOptions.prototype, 'skip');
    Min(1)(FilterOptions.prototype, 'take');
    Max(100)(FilterOptions.prototype, 'take');
  }

  Object.defineProperty(FilterOptions, 'name', {
    writable: false,
    configurable: true,
    value: `${clz.name}${paging ? 'PagingFilterOptions' : 'FilterOptions'}`,
  });

  return FilterOptions;
};

export type CreateBaseControllerOptions = {
  list?: boolean | string;
  findOne?: boolean | string;
  findById?: boolean | string;
  create?: boolean | string;
  update?: boolean | string;
  deleteById?: boolean | string;
};

export type CreateBaseControllerResults<T> = {
  fields: string[];
  BaseController: Type<IBaseController<T>>;
  PagingResult: Type<IPagingResult<T>>;
  WhereOptions: Type<IFilterWhereOptions<T>>;
  FilterOptions: Type<IFilterOptions<T>>;
};

export const createBaseController = <T, K extends IBaseService<T>>(
  clz: Type<T>,
  options?: CreateBaseControllerOptions,
): CreateBaseControllerResults<T> => {
  const {
    list = true,
    findOne = list,
    findById = list,
    create = true,
    update = true,
    deleteById = true,
  } = options ?? {};

  const fields = modelPropertiesAccessor.getModelProperties(clz.prototype);

  const ClzPagingResult = createPagingResultClass(clz);
  const ClzWhereOptions = createWhereOptionsClass(clz);
  const ClzOrderOptions = createOrderOptionsClass(clz);
  const ClzFilterOptions = createFilterOptionsClass(
    clz,
    ClzWhereOptions,
    ClzOrderOptions,
    true,
  );

  @ApiExtraModels(ClzFilterOptions)
  @ApiBearerAuth()
  class BaseController implements IBaseController<T> {
    protected readonly service: K;

    @ApiQuery({
      name: 'take',
      type: Number,
      required: false,
      description: 'Page size',
    })
    @ApiQuery({
      name: 'skip',
      type: Number,
      required: false,
      description: 'Skip',
    })
    @ApiQuery({
      name: 'where',
      required: false,
      description: 'Where filter',
    })
    @ApiQuery({
      name: 'order',
      required: false,
      description: 'Order',
    })
    @ApiQuery({
      name: 'select',
      isArray: true,
      required: false,
      enum: fields,
      description: 'Fields to select',
    })
    @OptionalDecorator(!!list, ApiOkResponse, { type: ClzPagingResult })
    @OptionalDecorator(!!list, Get, '/')
    public async list(
      @Query(
        ParseFilterPipe,
        new ValidationPipe({ transform: true, expectedType: ClzFilterOptions }),
      )
      filter?: FindManyOptions<T>,
    ) {
      return this.service.paging(filter);
    }

    @ApiQuery({
      name: 'where',
      required: false,
      description: 'Where filter',
    })
    @ApiQuery({
      name: 'order',
      required: false,
      description: 'Order',
    })
    @ApiQuery({
      name: 'select',
      isArray: true,
      required: false,
      enum: fields,
      description: 'Fields to select',
    })
    @OptionalDecorator(!!list, ApiOkResponse, { type: [clz] })
    @OptionalDecorator(!!list, Get, '/all')
    public async getAll(
      @Query(
        ParseFilterPipe,
        new ValidationPipe({ transform: true, expectedType: ClzFilterOptions }),
      )
      filter?: FindManyOptions<T>,
    ) {
      return this.service.find(filter);
    }

    @ApiQuery({
      name: 'where',
      required: false,
      description: 'Where filter',
    })
    @ApiQuery({
      name: 'order',
      required: false,
      description: 'Order',
    })
    @ApiQuery({
      name: 'select',
      isArray: true,
      required: false,
      enum: fields,
      description: 'Fields to select',
    })
    @OptionalDecorator(!!findOne, ApiOkResponse, { type: clz })
    @OptionalDecorator(!!findOne, Get, '/findOne')
    public async findOne(
      @Query(
        ParseFilterPipe,
        new ValidationPipe({ transform: true, expectedType: ClzFilterOptions }),
      )
      filter?: FindOneOptions<T>,
    ) {
      return this.service.findOne(filter);
    }

    @OptionalDecorator(!!findById, ApiOkResponse, { type: clz })
    @OptionalDecorator(!!findById, Get, '/:id')
    public async findById(@Param('id') id: string) {
      return this.service.findById(id);
    }

    @OptionalDecorator(!!create, ApiOkResponse, { type: clz })
    @OptionalDecorator(!!create, ApiBody, { type: clz })
    @OptionalDecorator(!!create, Post, '/')
    public async create(@Body() body: T) {
      const res = await this.service.create(body);
      return res;
    }

    @OptionalDecorator(!!update, ApiOkResponse, { type: clz })
    @OptionalDecorator(!!update, ApiBody, { type: clz })
    @OptionalDecorator(!!update, Put, '/:id')
    public async update(@Param('id') id: string, @Body() body: T) {
      const res = await this.service.updateById(id, body);

      return res;
    }

    @OptionalDecorator(!!deleteById, ApiOkResponse, { type: Boolean })
    @OptionalDecorator(!!deleteById, Delete, '/:id')
    public async deleteById(@Param('id') id: string) {
      const doc = await this.service.deleteById(id);
      return !!doc;
    }
  }

  return {
    fields,
    BaseController,
    WhereOptions: ClzWhereOptions,
    FilterOptions: ClzFilterOptions,
    PagingResult: ClzPagingResult,
  };
};
