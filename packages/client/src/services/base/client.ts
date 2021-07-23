import { message } from 'antd';


import { errorMessages, interceptRequest } from './interceptors';

import { Api, HttpResponse } from './request';

const interceptResponse = async <T, E>({ response }: { response: HttpResponse<T, E> }) => {
  const { ok, error, statusText } = response;
  if (!ok) {
    const errMsg =
      (error as any)?.message ??
      // (error as any)?.error ??
      errorMessages[response.status] ??
      statusText;
    message.error(errMsg);
  }



  return response;
};

const client = new Api({
  baseUrl: process.env.REACT_APP_API_ENDPOINT || '',
  interceptors: { request: interceptRequest, response: interceptResponse },
});

export default client;
