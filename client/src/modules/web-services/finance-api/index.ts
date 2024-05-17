import { requests } from "../service-client";

const base = "https://financialmodelingprep.com/api/v3/";

const financeClient = {
    search: (query: string) => requests.get(`${base}search?query=${query}&limit=10&exchange=NASDAQ&apikey=${import.meta.env.VITE_FINANCE_KEY}`),
    getCompanyProfile: (query:string) => requests.get(`${base}profile/${query}?apikey=${import.meta.env.VITE_FINANCE_KEY}`),
    getMetricTTM: (query: string) => requests.get(`${base}key-metrics-ttm/${query}?apikey=${import.meta.env.VITE_FINANCE_KEY}`),
    getIncomeStatement: (query: string) => requests.get(`${base}income-statement/${query}?limit=40&apikey=${import.meta.env.VITE_FINANCE_KEY}`),
    getBalanceSheet: (query:string) => requests.get(`${base}balance-sheet-statement/${query}?limit=40&apikey=${import.meta.env.VITE_FINANCE_KEY}`),
    getCashFlowStatement: (query:string) => requests.get(`${base}cash-flow-statement/${query}?limit=40&apikey=${import.meta.env.VITE_FINANCE_KEY}`)
};

export { financeClient };
