import client from "../base/client";
import { get, post, put, deleted } from "../base/fetch";
import { FilterOrderOptions } from "../base/filter";
import { usePaginate } from "../base/paginate";
import { RequestParams } from "../base/request";
import { Resident } from "./model";

export const create = async (resident: Resident, params?: RequestParams) => {
  return client.api.ResidentControllerCreate(resident, params);
};

export const update = async (resident: Resident, params?: RequestParams) => {
  return client.api.ResidentControllerUpdate(
    resident.id.toString(),
    resident,
    params
  );
};

export const image = async (image: any) => {
  return post("/api/resident/image", {
    image: image,
  } as any);
};

export const destroy = async (id: number) => {
  return client.api.ResidentControllerDeleteById(id.toString());
};

export const useResidentsList = (order?: FilterOrderOptions) => {
  return usePaginate<Resident>("/api/resident", { order });
};

export const getResident = async (
  query?: {
    select?: [];
    order?: any;
    where?: any;
    skip?: number;
    take?: number;
  },
  params?: RequestParams
) => {
  return client.api.ResidentControllerGetAll(query, params);
};
