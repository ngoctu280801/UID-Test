import * as qs from "qs";

export const DEFAULT_QUERY_STRING = "?page=0&limit=100";

export interface IQueryOptions {
  [key: string]:
    | string
    | string[]
    | undefined
    | null
    | number
    | number[]
    | qs.ParsedQs
    | qs.ParsedQs[];
}

export function queryStringToObject(query = ""): IQueryOptions {
  const parsedObject = qs.parse(query, {
    comma: true,
    ignoreQueryPrefix: true,
  });
  return parsedObject;
}

// creates a query string from query object

export function createQueryString(queryObject: IQueryOptions = {}): string {
  return qs.stringify(queryObject, { encode: false, arrayFormat: "indices" });
}
