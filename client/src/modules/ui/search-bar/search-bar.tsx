import { Button, Col, Input, List, Row, theme } from "antd";
import { CompanySearch, serviceClient } from "modules/web-services";
import { useState } from "react";
import { Card, Portfolio } from "..";

const SearchBar = () => {
    const [search, setSearch] = useState<string>("");
    const [companies, setCompanies] = useState<CompanySearch[]>([]);
    // const [loading, setLoading] = useState<boolean>(false);

    const { token: { paddingLG, borderRadiusLG, colorBorderSecondary } } = theme.useToken();

    const handleSearch = async () => {
        await serviceClient
            .financeApi
            .search(search)
            .then((companies) => setCompanies(companies))
            .catch((error) => console.log(error))
            .finally(() => { });
    };

    return (
        <>
            <div style={{
                background: colorBorderSecondary,
                padding: paddingLG,
                borderRadius: borderRadiusLG
            }}>
                <Row gutter={16} justify="center">
                    <Col span={8}>
                        <Input placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </Col>
                    <Col span={4}>
                        <Button onClick={handleSearch} type="primary" block>Submit</Button>
                    </Col>
                </Row>
            </div>
            <Portfolio />
            <Row gutter={[16, 16]}>
                <div style={{ padding: paddingLG, width: "100%" }}>
                    <List
                        bordered
                        dataSource={companies}
                        renderItem={(company) =>
                            <Card company={company} />
                        }
                    />
                </div>
            </Row>
        </>
    );
};
export default SearchBar;