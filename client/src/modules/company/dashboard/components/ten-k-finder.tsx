import { Button, Col, Row, Spin } from "antd";
import dayjs from "dayjs";
import { serviceClient } from "modules/web-services";
import { CompanyTenK } from "modules/web-services/finance-api/interfaces/company";
import { useEffect, useState } from "react";

interface Props {
    ticker: string;
}

const TenKFinder = ({ ticker }: Props) => {
    const [data, setData] = useState<CompanyTenK[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getTenK = () => {
        setLoading(true);
        serviceClient.financeApi.getTenK(ticker).then((data) => {
            setData(data);
        }).finally(() => {
            setLoading(false);
        });
    };

    useEffect(() => {
        getTenK();
    }, []);

    return (
        <Spin spinning={loading}>
            <Row gutter={[8, 8]}>
                {data.map((item, index) => (
                    <Col key={index}>
                        <Button href={item.finalLink} target="_blank" type="primary">10K - {item.symbol} - {dayjs(item.fillingDate).format("YYYY")}</Button>
                    </Col>
                ))}
            </Row>
        </Spin>
    );
};
export default TenKFinder;