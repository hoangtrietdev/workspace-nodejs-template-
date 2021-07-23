import { useEffect, useState } from "react";
import useFetch, { CachePolicies, IncomingOptions } from "use-http";

import { HttpResponse } from "./request";

import {
  FilterOptions,
  FilterOrderOptions,
  FilterResult,
  FilterWhereOptions,
  UseFilter,
} from "./filter";

export type RequestQueryParamsType = Record<string | number, any>;

const formatQueryParam = (query: RequestQueryParamsType, key: string) => {
  let value: any = query[key];
  if (Array.isArray(value)) {
    value = value.join(',');
  } else if (typeof value === 'object') {
    value = JSON.stringify(value);
  }
  return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
};

const formatQueryParams = (rawQuery?: RequestQueryParamsType): string => {
  const query = rawQuery || {};
  const keys = Object.keys(query).filter((key) => typeof query[key] !== 'undefined');
  return keys.length ? `?${keys.map((key) => formatQueryParam(query, key)).join('&')}` : '';
};

export default formatQueryParams;

export const DEFAULT_PAGE_SIZE = 10;

export type UsePaginate<T> = UseFilter<T> & {
  total: number;
  skip: number;
  take: number;
  setSkip: (skip?: number) => void;
  setTake: (take?: number) => void;
};

export type PagingOptions<T = any> = FilterOptions<T> & {
  skip?: number;
  take?: number;
};

export type PagingResult<T> = {
  data: FilterResult<T>;
  skip: number;
  take: number;
  total: number;
};

export type PaginateRequestFunc<
  T,
  A extends PagingOptions<T> = PagingOptions<T>
> = (args: A) => Promise<HttpResponse<PagingResult<T>, any>>;

export const usePaginate = <T>(
  url: string,
  options: PagingOptions<T> = {},
  fetchOptions: IncomingOptions = {}
): UsePaginate<T> => {
  const [skip, _setSkip] = useState(options.skip ?? 0);
  const [take, _setTake] = useState(options.take ?? DEFAULT_PAGE_SIZE);
  const [order, setOrder] = useState<FilterOrderOptions<T>>(
    options.order ?? {}
  );
  const [where, setWhere] = useState<FilterWhereOptions<T>>(
    options.where ?? {}
  );
  const [refetch, setRefetch] = useState(0);

  const baseUrl = process.env.REACT_APP_API_ENDPOINT ?? "";

  const defaultData: PagingResult<T> = {
    data: [],
    skip,
    take,
    total: 0,
  };

  const {
    get,
    data = defaultData,
    loading,
    abort,
  } = useFetch<PagingResult<T>>(baseUrl, {
    cachePolicy: CachePolicies.NO_CACHE,
    ...fetchOptions,
  });

  useEffect(() => {
    const params: PagingOptions<T> = {
      ...options,
      skip,
      take,
      where,
      order,
    };
    get(`${url}${formatQueryParams(params)}`);
  }, [refetch, skip, take, order, where]);

  const fetch = () => setRefetch(Date.now());
  const setSkip = (current = 1) => _setSkip(current);
  const setTake = (current = DEFAULT_PAGE_SIZE) => _setTake(current);

  return {
    data: data.data,
    total: data.total,
    loading,
    skip,
    take,
    setSkip,
    setTake,
    setOrder,
    setWhere,
    fetch,
    abort,
  };
};
