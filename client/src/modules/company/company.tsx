import { serviceClient } from "modules/web-services";
import { CompanyProfile } from "modules/web-services/finance-api/interfaces/company";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./sidebar/sidebar";
import { Col, Layout, Row, Spin, theme, Typography } from "antd";
import Dashboard from "./dashboard/dashboard";
import { TenKFinder, Tile } from "./dashboard/components";

const { Content } = Layout;
const { Text } = Typography;

const Company = () => {
    const [company, setCompany] = useState<CompanyProfile | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    const { ticker } = useParams<{ ticker: string; }>();
    const { token: { paddingLG } } = theme.useToken();

    const getCompanyProfile = async () => {

        await serviceClient.financeApi.getCompanyProfile(ticker!).then(data => {
            setCompany(data[0]);
        }).finally(() => {
            setLoading(false);
        });

    };

    useEffect(() => {
        setLoading(true);
        getCompanyProfile();
    }, []);

    return (
        <Layout>
            <Sidebar />
            <Content style={{ padding: paddingLG }}>
                <Spin spinning={loading}>
                    {company &&
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={12} md={12} lg={6}>
                                <Tile title="Company Name" subTitle={company.companyName} />
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={6}>
                                <Tile title="Price" subTitle={company.price} dollar />
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={6}>
                                <Tile title="DCF" subTitle={company.dcf} dollar />
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={6}>
                                <Tile title="Company Name" subTitle={company.sector} />
                            </Col>
                            <Col span={24}>
                                <TenKFinder ticker={company.symbol} />
                            </Col>
                            <Col span={24}>
                                <Text type="secondary">{company.description}</Text>
                            </Col>
                            <Col span={24}>
                                <Dashboard ticker={ticker!} />
                            </Col>
                        </Row>
                    }
                </Spin>
            </Content>
        </Layout>
    );
};

export default Company;