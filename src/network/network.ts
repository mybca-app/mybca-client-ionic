import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import type { paths } from "./openapi/v1";

const fetchClient = createFetchClient<paths>({
    baseUrl: "https://mybca.link/",
});
export const $api = createClient(fetchClient);