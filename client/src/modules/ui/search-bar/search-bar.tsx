import { Button, Col, Input, Row, Typography } from "antd";
import { CompanySearch, serviceClient } from "modules/web-services";
import { useState } from "react";
import { Card, Portfolio } from "..";

const { Title } = Typography;

const SearchBar = () => {
    const [search, setSearch] = useState<string>("");
    const [companies, setCompanies] = useState<CompanySearch[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

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
            <Row gutter={16} justify="center">
                <Col span={8}>
                    <Input placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                </Col>
                <Col span={4}>
                    <Button onClick={handleSearch} type="primary" block>Submit</Button>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                {companies.map((company) =>
                    <Col key={company.symbol}>
                        <Card company={company} />
                    </Col>
                )}
            </Row>
            <Row>
                <Col span={24}>
                    <Title level={4}>Portfolio</Title>
                </Col>
                <Portfolio />
            </Row>
        </>
    );
};
export default SearchBar;