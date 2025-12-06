import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import type { paths } from "./openapi/v1";

const fetchClient = createFetchClient<paths>({
  baseUrl: import.meta.env.VITE_MAIN_SERVER_URL,
});
export const $api = createClient(fetchClient);
