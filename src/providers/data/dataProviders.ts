import { GET_BOX_HISTORY_ADMIN, GET_BOX_WINE_PRINT_CARD } from "./queries";
import { request } from "graphql-request";
import { DataProvider, CrudFilter } from "@refinedev/core";
import { GetBoxHistoryAdminResponse } from "@/routes/quotes/components/types";

const API_URL = "https://vineoback-gh-qa.caprover2.innogenio.com/graphql";
const accessToken = localStorage.getItem("access_token");

export const gqlDataProvider: DataProvider = {
    getList: async ({ pagination, filters }): Promise<{ data: any[]; total: number }> => {
        try {
            const { current = 1, pageSize = 10 } = pagination ?? {};

            // Type guard to filter for objects with a 'field' property
            const hasField = (filter: CrudFilter): filter is CrudFilter & { field: string; value: any } => {
                return "field" in filter && "value" in filter;
            };

            // Extract the searchString from filters
            const searchFilter = filters?.find(hasField)?.field === "searchString"
                ? filters?.find(hasField)
                : undefined;

            const searchString = searchFilter?.value || "";

            // GraphQL variables
            const variables = {
                searchString,
                page: current,
                pageSize,
            };

            console.log("Sending GraphQL request with variables:", variables);

            // Use the response type
            const response: GetBoxHistoryAdminResponse = await request<GetBoxHistoryAdminResponse>(
                API_URL,
                GET_BOX_HISTORY_ADMIN,
                variables,
                {
                    Authorization: `Bearer ${accessToken}`,
                }
            );

            console.log("GraphQL Response:", response);

            // Extract data and total
            const data = response.getBoxHistoryAdmin.boxes;
            const total = response.getBoxHistoryAdmin.total;

            return { data, total };
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error:", error.message);
            } else {
                console.error("Unexpected error:", error);
            }

            throw new Error("Failed to fetch data.");
        }
    },

    custom: async ({ resource, meta }: { resource: string; meta: any }) => {
        const query = meta?.query || GET_BOX_WINE_PRINT_CARD; // Default to GET_BOX_WINE_PRINT_CARD
        const variables = meta?.variables || {}; // Pass variables dynamically

        const headers = {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        };

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            body: JSON.stringify({ query, variables }),
        });

        const result = await response.json();

        if (result.errors) {
            console.error("GraphQL Errors:", result.errors);
            throw new Error(result.errors[0]?.message || "GraphQL query error");
        }

        return result.data;
    },

    getOne: async () => {
        throw new Error("getOne not implemented");
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
