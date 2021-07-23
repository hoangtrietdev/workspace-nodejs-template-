import { interceptResponse, Res } from './interceptors';

const _fetch = async <T>(url: string, options: RequestInit = {}): Promise<Response> => {
  return fetch(url).then(
    (response) => interceptResponse<T>({ response }),
    (err) => {
      throw err;
    },
  );
};

export const get = async <T>(url: string, options: RequestInit = {}): Promise<Res<T>> =>
  _fetch<T>(url, { ...options, method: 'GET' });

export const post = async <T>(
  url: string,
  body: RequestInit['body'] = null,
  options: RequestInit = {},
): Promise<Res<T>> => {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers ?? {}),
  };

  return _fetch(url, {
    ...options,
    headers,
    method: 'POST',
    body,
  });
};

export const put = async <T>(
  url: string,
  body: RequestInit['body'] = null,
  options: RequestInit = {},
): Promise<Res<T>> => {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers ?? {}),
  };

  return _fetch(url, {
    ...options,
    headers,
    method: 'PUT',
    body,
  });
};

export const deleted = async <T>(
  url: string,
  body: RequestInit['body'] = null,
  options: RequestInit = {},
): Promise<Res<T>> => {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers ?? {}),
  };

  return _fetch(url, {
    ...options,
    headers,
    method: 'DELETE',
    body,
  });
};

export default _fetch;
