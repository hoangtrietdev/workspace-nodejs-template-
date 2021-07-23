import { useEffect, useState } from "react";
import useFetch, { CachePolicies, IncomingOptions } from "use-http";

export enum OrderDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export type RequestQueryParamsType = Record<string | number, any>;

const formatQueryParam = (query: RequestQueryParamsType, key: string) => {
  let value: any = query[key];
  if (Array.isArray(value)) {
    value = value.join(",");
  } else if (typeof value === "object") {
    value = JSON.stringify(value);
  }
  return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
};

const formatQueryParams = (rawQuery?: RequestQueryParamsType): string => {
  const query = rawQuery || {};
  const keys = Object.keys(query).filter(
    (key) => typeof query[key] !== "undefined"
  );
  return keys.length
    ? `?${keys.map((key) => formatQueryParam(query, key)).join("&")}`
    : "";
};

export default formatQueryParams;

export type FilterOrderOptions<T = any> = {
  [field in Extract<keyof T, string>]?: OrderDirection;
};

export type FilterStandardOperators<T> = {
  in?: T[];
  nin?: T[];
};

export type FilterRangeOperators<T> = {
  gt?: T;
  gte?: T;
  lt?: T;
  lte?: T;
};

type OperatorMap = {
  string: FilterStandardOperators<string>;
  number: FilterStandardOperators<number> & FilterRangeOperators<number>;
};

export type FilterWhereOptions<T> = {
  [k in keyof T]?: T[k] extends string
    ? OperatorMap["string"] | string
    : T[k] extends number
    ? OperatorMap["number"] | number
    : T[k];
};

export type UseFilter<T> = {
  data: T[];
  error?: Error;
  loading: boolean;
  fetch: () => void;
  abort: () => void;
  setOrder: (order: FilterOrderOptions<T>) => void;
  setWhere: (where: FilterWhereOptions<T>) => void;
};

export type FilterOptions<T = any> = {
  select?: any[] | undefined;
  where?: FilterWhereOptions<T>;
  order?: FilterOrderOptions<T>;
};

export type FilterResult<T> = Array<T>;

export const useFilter = <T>(
  url: string,
  options: FilterOptions<T> = {},
  fetchOptions: IncomingOptions = {}
): UseFilter<T> => {
  const [order, setOrder] = useState<FilterOrderOptions<T>>({});
  const [where, setWhere] = useState<FilterWhereOptions<T>>({});
  const [refetch, setRefetch] = useState(0);

  const defaultData: FilterResult<T> = [];

  const {
    get,
    data = defaultData,
    error,
    loading,
    abort,
  } = useFetch<FilterResult<T>>({
    cachePolicy: CachePolicies.NO_CACHE,
    ...fetchOptions,
  });

  useEffect(() => {
    const params: FilterOptions<T> = {
      ...options,
      order,
      where,
    };

    get(`${url}${formatQueryParams(params)}`);
  }, [refetch, order, where]);

  const fetch = () => setRefetch(Date.now());

  return {
    data,
    error,
    loading,
    setOrder,
    setWhere,
    fetch,
    abort,
  };
};
