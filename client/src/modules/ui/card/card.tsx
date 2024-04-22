import { Card as AntCard, Button, Flex, Form, Input, Typography } from "antd";
import { WithPortfolio, withPortfolio } from "modules/state";
import { CompanySearch } from "modules/web-services";

const { Title, Text } = Typography;

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
        <AntCard hoverable style={{ width: 240, height: "100%" }}>
            <Flex vertical justify="middle" align="middle" style={{ textAlign: "center" }}>
                <Title level={4}>{company.name} {`(${company.symbol})`}</Title>
                <Text>{company.currency}</Text>
                <Text>{company.exchangeShortName} - {company.stockExchange}</Text>
                <Form
                    form={form}
                    onFinish={handleSubmit}
                >
                    <Form.Item name="symbol" hidden initialValue={company.symbol}>
                        <Input hidden readOnly />
                    </Form.Item>
                    <Button disabled={portfolio.some((item => item === company.symbol))} htmlType="submit">Add To Portfolio</Button>
                </Form>
            </Flex>
        </AntCard>
    );
};

export default withPortfolio(Card);