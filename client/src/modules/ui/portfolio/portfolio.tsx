import { Button, Card, Col, Row } from "antd";
import { WithPortfolio, withPortfolio } from "modules/state";

interface Props extends WithPortfolio {

}

const Portfolio = ({ portfolio, removePortfolio }: Props) => {

    return (
        <Row gutter={[16, 16]}>
            {portfolio.map((item: string, index: number) => (
                <Col key={item}>
                    <Card>
                        <div>{item}</div>
                        <Button onClick={() => removePortfolio(index)}></Button>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default withPortfolio(Portfolio);