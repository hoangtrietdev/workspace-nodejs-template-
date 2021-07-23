import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Logger, Type } from '@nestjs/common';
export declare const ER_DUP_ENTRY = "ER_DUP_ENTRY";
export declare type WhereOptions<T> = FindManyOptions<T>['where'];
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
export declare const createBaseService: <T>(clz: Type<T>) => Type<IBaseService<T>>;
