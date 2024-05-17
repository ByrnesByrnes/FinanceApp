import { Table, TableProps } from "antd";
import { serviceClient } from "modules/web-services";
import { CompanyBalanceSheet } from "modules/web-services/finance-api/interfaces/company";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const columns: TableProps<Partial<CompanyBalanceSheet>>["columns"] = [
    {
        title: <div className="font-bold">Total Assets</div>,
        render: (_, record) => record.totalAssets,
    },
    {
        title: "Current Assets",
        render: (_, record) => record.totalCurrentAssets,
    },
    {
        title: "Total Cash",
        render: (_, record) => record.cashAndCashEquivalents,
    },
    {
        title: "Property & equipment",
        render: (_, record) => record.propertyPlantEquipmentNet,
    },
    {
        title: "Intangible Assets",
        render: (_, record) => record.intangibleAssets,
    },
    {
        title: "Long Term Debt",
        render: (_, record) => record.longTermDebt,
    },
    {
        title: "Total Debt",
        render: (_, record) => record.otherCurrentLiabilities,
    },
    {
        title: <div className="font-bold">Total Liabilites</div>,
        render: (_, record) => record.totalLiabilities,
    },
    {
        title: "Current Liabilities",
        render: (_, record) => record.totalCurrentLiabilities,
    },
    {
        title: "Long-Term Debt",
        render: (_, record) => record.longTermDebt,
    },
    {
        title: "Long-Term Income Taxes",
        render: (_, record) => record.otherLiabilities,
    },
    {
        title: "Stakeholder's Equity",
        render: (_, record) => record.totalStockholdersEquity,
    },
    {
        title: "Retained Earnings",
        render: (_, record) => record.retainedEarnings,
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

    return <Table loading={loading} dataSource={balanceSheet} columns={columns} scroll={{ x: 700 }} />;
};

export default BalanceStatement;