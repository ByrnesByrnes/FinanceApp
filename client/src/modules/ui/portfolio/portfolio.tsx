import { Button, Card, Col, Flex, Row, Typography } from "antd";
import { WithPortfolio, withPortfolio } from "modules/state";
import { IoClose } from "react-icons/io5";
import Icon from "@ant-design/icons";
import { Link } from "react-router-dom";
import * as ROUTES from "modules/route/constants";

const { Title } = Typography;

interface Props extends WithPortfolio {

}

const Portfolio = ({ portfolio, removePortfolio }: Props) => {

    return (
        <Row gutter={[16, 16]}>
            <Col span={24}>
                <Title level={4} style={{ textAlign: "center" }}>Portfolio</Title>
            </Col>
            {portfolio.map((item: string, index: number) => (
                <Col key={item} xs={12} sm={8} md={6} lg={4} xxl={4}>
                    <Card>
                        <Flex vertical align="center" gap={16}>
                            <Link to={`${ROUTES.COMPANY}/${item}`}>
                                <Title level={5}>{item}</Title>
                            </Link>
                            <Button block type="primary" icon={<Icon component={IoClose} />} onClick={() => removePortfolio(index)} danger></Button>
                        </Flex>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default withPortfolio(Portfolio);