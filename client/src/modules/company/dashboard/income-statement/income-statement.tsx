import { Table, TableProps } from "antd";
import { formatLargeMonetaryNumber, formatRatio } from "modules/ui";
import { serviceClient } from "modules/web-services";
import { CompanyIncomeStatement } from "modules/web-services/finance-api/interfaces/company";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const columns: TableProps<Partial<CompanyIncomeStatement>>["columns"] = [
    {
        title: "Date",
        render: (_, record) => record.date,
        key: "date",
    },
    {
        title: "Revenue",
        render: (_, record) => formatLargeMonetaryNumber(record.revenue),
        key: "revenue",
    },
    {
        title: "Cost Of Revenue",
        render: (_, record) => formatLargeMonetaryNumber(record.costOfRevenue),
        key: "costOfRevenue",
    },
    {
        title: "Depreciation",
        render: (_, record) => formatLargeMonetaryNumber(record.depreciationAndAmortization),
        key: "depreciationAndAmortization",
    },
    {
        title: "Operating Income",
        render: (_, record) => formatLargeMonetaryNumber(record.operatingIncome),
        key: "operatingIncome",
    },
    {
        title: "Income Before Taxes",
        render: (_, record) => formatLargeMonetaryNumber(record.incomeBeforeTax),
        key: "incomeBeforeTax",
    },
    {
        title: "Net Income",
        render: (_, record) => formatLargeMonetaryNumber(record.netIncome),
        key: "netIncome",
    },
    {
        title: "Net Income Ratio",
        render: (_, record) => formatRatio(record.netIncomeRatio),
        key: "netIncomeRatio",
    },
    {
        title: "Earnings Per Share",
        render: (_, record) => formatRatio(record.eps),
        key: "eps",
    },
    {
        title: "Earnings Per Diluted",
        render: (_, record) => formatRatio(record.epsdiluted),
        key: "epsdiluted",
    },
    {
        title: "Gross Profit Ratio",
        render: (_, record) => formatRatio(record.grossProfitRatio),
        key: "grossProfitRatio",
    },
    {
        title: "Operating Income Ratio",
        render: (_, record) => formatRatio(record.operatingIncomeRatio),
        key: "operatingIncomeRatio",
    },
    {
        title: "Income Before Taxes Ratio",
        render: (_, record) => formatRatio(record.incomeBeforeTaxRatio),
        key: "incomeBeforeTaxRatio",
    },
];

const IncomeStatement = () => {
    const [incomeStatement, setIncomeStatement] = useState<CompanyIncomeStatement[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const ticker = useOutletContext<string>();

    const getIncomeStatement = async () => {
        await serviceClient
            .financeApi
            .getIncomeStatement(ticker)
            .then((data) => {
                setIncomeStatement(data);
            }).finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        setLoading(true);
        getIncomeStatement();
    }, []);

    return (
        <Table
            loading={loading}
            dataSource={incomeStatement}
            columns={columns}
            rowKey={(record) => `${record.link}`}
            scroll={{ x: 700 }}
        />
    );
};

export default IncomeStatement;