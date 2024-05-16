import { Button, Col, Flex, Form, Input, List, Row, Typography } from "antd";
import { WithPortfolio, withPortfolio } from "modules/state";
import { CompanySearch } from "modules/web-services";
import * as ROUTES from "modules/route/constants";
import { Link } from "react-router-dom";

const { Text } = Typography;

interface Props extends WithPortfolio {
    company: CompanySearch;
}

const Card = ({ company, addPortfolio, portfolio }: Props) => {
    const [form] = Form.useForm();

    const handleSubmit = () => {

        form
            .validateFields()
            .then(async (value) => {
                addPortfolio(value.symbol);
            });
    };

    return (
        <List.Item>
            <div style={{ width: "100%" }}>
                <Row align="middle" gutter={[16, 16]} justify="end">
                    <Col flex="auto">
                        <Flex gap={8} wrap="wrap">
                            <Link to={`${ROUTES.COMPANY}/${company.symbol}`}>
                                <Text strong>{company.name} {`(${company.symbol})`}</Text>
                            </Link>
                            <Text type="secondary">{company.currency}</Text>
                            <Text strong>{company.exchangeShortName} - {company.stockExchange}</Text>
                        </Flex>
                    </Col>
                    <Col>
                        <Form
                            form={form}
                            onFinish={handleSubmit}
                        >
                            <Form.Item name="symbol" hidden initialValue={company.symbol}>
                                <Input hidden readOnly />
                            </Form.Item>
                            <Button type="primary" disabled={portfolio.some((item => item === company.symbol))} htmlType="submit">Add</Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        </List.Item>
    );
};

export default withPortfolio(Card);