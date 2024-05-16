import { List } from "antd";
import { serviceClient } from "modules/web-services";
import { CompanyKeyMetrics } from "modules/web-services/finance-api/interfaces/company";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

interface KeyMetrics {
    title: string;
    subTitle: string;
    key: string;
}

const items: KeyMetrics[] = [
    {
        title: "Market Cap",
        subTitle: "Total value of all a company's shares of stock",
        key: "marketCapTTM"
    },
    {
        title: "Current Ratio",
        subTitle: "Measures the companies ability to pay short term debt obligations",
        key: "currentRatioTTM"

    },
    {
        title: "Return On Equity",
        subTitle: "Return on equity is the measure of a company's net income divided by its shareholder's equity",
        key: "roeTTM"
    },
    {
        title: "Return On Assets",
        subTitle: "Return on assets is the measure of how effective a company is using its assets",
        key: "returnOnTangibleAssetsTTM"
    },
    {
        title: "Free Cashflow Per Share",
        subTitle: "Return on assets is the measure of how effective a company is using its assets",
        key: "freeCashFlowPerShareTTM"

    },
    {
        title: "Book Value Per Share TTM",
        subTitle: "Book value per share indicates a firm's net asset value (total assets - total liabilities) on per share basis",
        key: "bookValuePerShareTTM"

    },
    {
        title: "Divdend Yield TTM",
        subTitle: "Shows how much a company pays each year relative to stock price",
        key: "dividendYieldTTM"
    },
    {
        title: "Capex Per Share TTM",
        subTitle:
            "Capex is used by a company to aquire, upgrade, and maintain physical assets",
        key: "capexPerShareTTM"

    },
    {
        title: "Graham Number",
        subTitle: "This is the upperbouind of the price range that a defensive investor should pay for a stock",
        key: "grahamNumberTTM"
    },
    {
        title: "PE Ratio",
        subTitle: "This is the upperbouind of the price range that a defensive investor should pay for a stock",
        key: "peRatioTTM"
    },
];

const Profile = () => {
    const [company, setCompany] = useState<CompanyKeyMetrics | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    const ticker = useOutletContext<string>();

    const getCompanyKeyMetrics = () => {
        serviceClient.financeApi.getMetricTTM(ticker).then((data) => {
            setCompany(data[0]);
        }).finally(() => {
            setLoading(false);
        });
    };

    useEffect(() => {
        setLoading(true);
        getCompanyKeyMetrics();
    }, []);

    return (
        <>
            {company &&
                <List
                    loading={loading}
                    dataSource={items}
                    renderItem={(item) => (
                        <List.Item key={item.key}>
                            <List.Item.Meta
                                title={item.title}
                                description={item.subTitle}
                            />
                            <div>{company[item.key as keyof CompanyKeyMetrics]}</div>
                        </List.Item>
                    )}
                />
            }
        </>
    );

};

export default Profile;