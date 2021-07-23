import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Injectable, Logger, NotFoundException, Type } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { PAGING_DEFAULT_PAGE_SIZE } from './constants';
import { BusinessException } from './exceptions';

export const ER_DUP_ENTRY = 'ER_DUP_ENTRY';

export type WhereOptions<T> = FindManyOptions<T>['where'];

export interface IPagingResult<T> {
  total: number;
  skip: number;
  take: number;
  data: T[];
}

export interface IBaseService<T> {
  logger: Logger;
  repository: Repository<T>;
  count(options?: WhereOptions<T>): Promise<number>;
  find(options?: FindManyOptions<T>): Promise<T[]>;
  findOne(options?: FindOneOptions<T>): Promise<T | null>;
  findById(id: any): Promise<T | null>;
  paging(options?: FindManyOptions<T>): Promise<IPagingResult<T>>;
  create(entity: T): Promise<T>;
  updateById(id: any, entity: QueryDeepPartialEntity<T>): Promise<T>;
  upsert(entity: T): Promise<T>;
  delete(options?: WhereOptions<T>): Promise<number>;
  deleteById(id: any): Promise<T | null>;
}

export const createBaseService = <T>(clz: Type<T>): Type<IBaseService<T>> => {
  @Injectable()
  class BaseService implements IBaseService<T> {
    public readonly logger: Logger;

    constructor(
      @InjectRepository(clz)
      public readonly repository: Repository<T>,
    ) {
      this.logger = new Logger(`${clz.name}Service`);
    }

    public async count(options?: WhereOptions<T>) {
      return this.repository.count({ where: options ?? {} });
    }

    public async find(options?: FindManyOptions<T>) {
      return this.repository.find(options);
    }

    public async findOne(options?: FindOneOptions<T>) {
      return this.repository.findOne(options);
    }

    public async findById(id: any) {
      const [doc] = await this.repository.findByIds([id]);
      return doc;
    }

    public async findByIds(ids: any[]) {
      return this.repository.findByIds(ids);
    }

    public async paging(options: FindManyOptions<T> = {}) {
      const { skip = 0, take = PAGING_DEFAULT_PAGE_SIZE, where } = options;
      const [total, data] = await Promise.all([
        this.count(where),
        this.find({ ...options, skip, take }),
      ]);

      return {
        total,
        skip,
        take,
        data,
      };
    }

    public async create(entity: T) {
      const doc = this.repository.create(entity);
      try {
        const result = await this.repository.insert(doc);
        return Object.assign(entity, result.generatedMaps[0]);
      } catch (err) {
        if (err.code === ER_DUP_ENTRY) {
          throw new BusinessException('Object already exists');
        }

        throw err;
      }
    }

    public async updateById(id: any, entity: QueryDeepPartialEntity<T>) {
      const [doc] = await this.repository.findByIds([id]);
      if (!doc) {
        throw new NotFoundException('Not Found', `Not found ${clz.name} with id ${id}`);
      }

      await this.repository.update(id, entity);
      return Object.assign(doc, entity);
    }

    public async upsert(entity: T) {
      const doc = this.repository.create(entity);
      return this.repository.save(doc);
    }

    public async delete(options?: WhereOptions<T>) {
      const res = await this.repository.delete(options as any);
      return res.affected;
    }

    public async deleteById(id: any) {
      const [doc] = await this.repository.findByIds([id]);
      return doc && this.repository.remove(doc);
    }
  }

  return BaseService;
};
