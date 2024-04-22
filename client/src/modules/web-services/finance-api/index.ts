import { requests } from "../service-client";

const base = "https://financialmodelingprep.com/api/v3/"

const financeClient = {
    search: (query: string) => requests.get(base + `search?query=${query}&limit=10&exchange=NASDAQ&apikey=${import.meta.env.VITE_FINANCE_KEY}`),
};

export { financeClient };
