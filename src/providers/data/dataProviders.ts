import { GET_BOX_HISTORY_ADMIN, GET_BOX_WINE_PRINT_CARD } from "./queries";
import { request } from "graphql-request";
import {
  DataProvider,
  CrudFilter,
  CustomParams,
  CustomResponse,
  BaseRecord,
  GetOneResponse,
} from "@refinedev/core";
import { GetBoxHistoryAdminResponse } from "@/routes/types";

const API_URL = "https://vineoback-gh-qa.caprover2.innogenio.com/graphql";
interface CustomDataProvider extends DataProvider {}

export const gqlDataProvider: CustomDataProvider = {
  getList: async ({
    pagination,
    filters,
  }): Promise<{ data: any[]; total: number }> => {
    try {
      const { current = 1, pageSize = 10 } = pagination ?? {};

      const searchFilter = filters?.find(
        (filter: CrudFilter) =>
          "field" in filter && filter.field === "searchString"
      );

      const searchString = searchFilter?.value || "";

      const variables = {
        searchString,
        page: current,
        pageSize,
      };

      const response: GetBoxHistoryAdminResponse =
        await request<GetBoxHistoryAdminResponse>(
          API_URL,
          GET_BOX_HISTORY_ADMIN,
          variables,
          {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          }
        );

      const data = response.getBoxHistoryAdmin.boxes;
      const total = response.getBoxHistoryAdmin.total;

      return { data, total };
    } catch (error) {
      console.error("Error in getList:", error);
      throw new Error("Failed to fetch data.");
    }
  },

  custom: async <
    TData extends BaseRecord = BaseRecord,
    TQuery = unknown,
    TPayload = unknown
  >({
    url,
    method,
    meta,
  }: CustomParams<TQuery, TPayload>): Promise<CustomResponse<TData>> => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        ...(meta?.headers || {}),
      };

      const response = await fetch(url, {
        method: method || "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify({
          query: meta?.query,
          variables: meta?.variables,
        }),
      });

      const result = await response.json();

      if (result.errors) {
        console.error("GraphQL Errors:", result.errors);
        throw new Error(result.errors[0]?.message || "GraphQL query error");
      }

      return {
        data: result.data as TData,
      };
    } catch (error) {
      console.error("Custom query error:", error);
      throw error;
    }
  },

  getOne: async <TData extends BaseRecord = BaseRecord>({
    resource,
    id,
  }: {
    resource: string;
    id: string | number;
  }): Promise<{ data: TData }> => {
    if (resource === "pdf") {
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({
            query: `
                            query getBoxWinePrintCard($box: String!) {
                                getBoxWinePrintCard(box: $box)
                            }
                        `,
            variables: { box: id.toString() },
          }),
        });

        const result = await response.json();

        if (result.errors) {
          throw new Error(result.errors[0]?.message || "Failed to fetch PDF");
        }

        // Explicitly cast the result to TData via unknown
        return {
          data: {
            id,
            pdfData: result.data.getBoxWinePrintCard,
          } as unknown as TData,
        };
      } catch (error) {
        console.error("Error fetching PDF:", error);
        throw new Error("Failed to fetch PDF.");
      }
    }

    throw new Error(`getOne for resource '${resource}' is not implemented`);
  },

  create: async () => {
    throw new Error("create not implemented");
  },
  update: async () => {
    throw new Error("update not implemented");
  },
  deleteOne: async () => {
    throw new Error("deleteOne not implemented");
  },
  getApiUrl: () => API_URL,
  getMany: async () => {
    throw new Error("getMany not implemented");
  },
  updateMany: async () => {
    throw new Error("updateMany not implemented");
  },
  deleteMany: async () => {
    throw new Error("deleteMany not implemented");
  },
};
