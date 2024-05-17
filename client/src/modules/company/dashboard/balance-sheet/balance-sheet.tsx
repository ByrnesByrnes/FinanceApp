import { Table, TableProps } from "antd";
import { formatLargeMonetaryNumber } from "modules/ui";
import { serviceClient } from "modules/web-services";
import { CompanyBalanceSheet } from "modules/web-services/finance-api/interfaces/company";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const columns: TableProps<Partial<CompanyBalanceSheet>>["columns"] = [
    {
        title: <div className="font-bold">Total Assets</div>,
        render: (_, record) => formatLargeMonetaryNumber(record.totalAssets),
    },
    {
        title: "Current Assets",
        render: (_, record) => formatLargeMonetaryNumber(record.totalCurrentAssets),
    },
    {
        title: "Total Cash",
        render: (_, record) => formatLargeMonetaryNumber(record.cashAndCashEquivalents),
    },
    {
        title: "Property & equipment",
        render: (_, record) => formatLargeMonetaryNumber(record.propertyPlantEquipmentNet),
    },
    {
        title: "Intangible Assets",
        render: (_, record) => formatLargeMonetaryNumber(record.intangibleAssets),
    },
    {
        title: "Long Term Debt",
        render: (_, record) => formatLargeMonetaryNumber(record.longTermDebt),
    },
    {
        title: "Total Debt",
        render: (_, record) => formatLargeMonetaryNumber(record.otherCurrentLiabilities),
    },
    {
        title: <div className="font-bold">Total Liabilities</div>,
        render: (_, record) => formatLargeMonetaryNumber(record.totalLiabilities),
    },
    {
        title: "Current Liabilities",
        render: (_, record) => formatLargeMonetaryNumber(record.totalCurrentLiabilities),
    },
    {
        title: "Long-Term Debt",
        render: (_, record) => formatLargeMonetaryNumber(record.longTermDebt),
    },
    {
        title: "Long-Term Income Taxes",
        render: (_, record) => formatLargeMonetaryNumber(record.otherLiabilities),
    },
    {
        title: "Stakeholder's Equity",
        render: (_, record) => formatLargeMonetaryNumber(record.totalStockholdersEquity),
    },
    {
        title: "Retained Earnings",
        render: (_, record) => formatLargeMonetaryNumber(record.retainedEarnings),
    },
];

const BalanceStatement = () => {
    const [balanceSheet, setBalanceSheet] = useState<CompanyBalanceSheet[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const ticker = useOutletContext<string>();

    const getBalanceSheets = () => {
        setLoading(true);
        serviceClient.financeApi.getBalanceSheet(ticker).then((data) => {

            setBalanceSheet(data);
        }).finally(() => {
            setLoading(false);
        });
    };

    useEffect(() => {
        getBalanceSheets();
    }, []);

    return <Table
        rowKey={(record) => `${record.finalLink}`}
        loading={loading}
        dataSource={balanceSheet}
        columns={columns}
        scroll={{ x: 700 }}
    />;
};

export default BalanceStatement;