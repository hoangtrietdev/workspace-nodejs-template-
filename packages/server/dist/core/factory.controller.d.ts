import { FindManyOptions, FindOneOptions } from 'typeorm';
import { PipeTransform, Type } from '@nestjs/common';
import { IBaseService, IPagingResult } from './factory.service';
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
declare type OperatorMap = {
    string: IStarndardOperators<string>;
    number: IStarndardOperators<number> & IRangeOperators<number>;
};
export declare type IFilterWhereOptions<T> = {
    [k in keyof T]?: T[k] extends string ? OperatorMap['string'] | string : T[k] extends number ? OperatorMap['number'] | number : T[k];
};
export declare type OrderDirection = 'ASC' | 'DESC';
export declare type IFilterOrderOptions<T> = {
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
export declare class ParseFilterPipe<T> implements PipeTransform<string | Record<string, any>, FindManyOptions<T>> {
    transform(value: string | Record<string, any>): FindManyOptions<T>;
}
export declare type CreateBaseControllerOptions = {
    list?: boolean | string;
    findOne?: boolean | string;
    findById?: boolean | string;
    create?: boolean | string;
    update?: boolean | string;
    deleteById?: boolean | string;
};
export declare type CreateBaseControllerResults<T> = {
    fields: string[];
    BaseController: Type<IBaseController<T>>;
    PagingResult: Type<IPagingResult<T>>;
    WhereOptions: Type<IFilterWhereOptions<T>>;
    FilterOptions: Type<IFilterOptions<T>>;
};
export declare const createBaseController: <T, K extends IBaseService<T>>(clz: Type<T>, options?: CreateBaseControllerOptions) => CreateBaseControllerResults<T>;
export {};
