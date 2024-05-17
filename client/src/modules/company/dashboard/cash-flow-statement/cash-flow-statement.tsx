import { Table, TableProps } from "antd";
import { formatLargeMonetaryNumber } from "modules/ui";
import { serviceClient } from "modules/web-services";
import { CompanyCashFlow } from "modules/web-services/finance-api/interfaces/company";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const columns: TableProps<Partial<CompanyCashFlow>>["columns"] = [
    {
        title: "Date",
        render: (_, record) => record.date,
    },
    {
        title: "Operating Cashflow",
        render: (_, record) => formatLargeMonetaryNumber(record.operatingCashFlow),
    },
    {
        title: "Investing Cashflow",
        render: (_, record) => formatLargeMonetaryNumber(record.netCashUsedForInvestingActivites),
    },
    {
        title: "Financing Cashflow",
        render: (_, record) => formatLargeMonetaryNumber(record.netCashUsedProvidedByFinancingActivities),
    },
    {
        title: "Cash At End of Period",
        render: (_, record) => formatLargeMonetaryNumber(record.cashAtEndOfPeriod),
    },
    {
        title: "CapEX",
        render: (_, record) => formatLargeMonetaryNumber(record.capitalExpenditure),
    },
    {
        title: "Issuance Of Stock",
        render: (_, record) => formatLargeMonetaryNumber(record.commonStockIssued),
    },
    {
        title: "Free Cash Flow",
        render: (_, record) => formatLargeMonetaryNumber(record.freeCashFlow),
    },
];

const CashFlowStatement = () => {
    const [cashFlow, setCashFlow] = useState<CompanyCashFlow[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const ticker = useOutletContext<string>();

    const getCashFlowStatement = () => {
        setLoading(true);
        serviceClient
            .financeApi
            .getCashFlowStatement(ticker)
            .then((data) => {                
                setCashFlow(data);
            }).finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getCashFlowStatement();
    }, []);

    return <Table
        rowKey={(record) => `${record.finalLink}`}
        loading={loading}
        dataSource={cashFlow}
        columns={columns}
    />;

};
export default CashFlowStatement;