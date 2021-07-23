import { message } from "antd";
import { Res as HttpRes } from "use-http";

export type Res<T> = HttpRes<T> & {
  error?: Error;
};

export const interceptRequest = ({
  options = {},
}: {
  options: RequestInit;
}): RequestInit => {
  return {
    ...options,
    headers: {
      ...(options.headers ?? {}),
    },
  };
};

export const errorMessages: Record<number, string> = {
  401: "Please relogin to perform this action",
};

export const interceptResponse = async <T = any>({
  response,
}: {
  response: Res<T>;
}) => {
  let result;
  if (response.headers.get("content-type")?.includes("application/json")) {
    result = await response.json();
  }

  if (response.ok) {
    response.data = result;
  } else {
    const errMsg =
      result?.error ??
      result?.message ??
      errorMessages[response.status] ??
      response.statusText;
    const error = new Error(errMsg);
    response.error = error;

    message.error(result?.message ?? response.statusText);
  }

  return response;
};
