import axios, { AxiosResponse } from "axios";
import { financeClient } from "./finance-api";

const response = (response: AxiosResponse) => response.data;

export const requests = {
    get: (url: string) => axios.get(url).then(response),
    post: <T>(url: string, body: T) => axios.post(url, body).then(response),
    put: <T>(url: string, body: T) => axios.put(url, body).then(response),
    delete: (url: string) => axios.delete(url).then(response),
};

const serviceClient = {
    financeApi: financeClient,
};

export default serviceClient;
