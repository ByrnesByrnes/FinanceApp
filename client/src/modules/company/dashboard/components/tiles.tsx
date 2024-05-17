import { Card, Flex, Typography } from "antd";

const { Text, Title } = Typography;

type Props = {
    title: string;
    subTitle?: string | number;
    dollar?: boolean;
};

const Tiles = ({ title, subTitle, dollar }: Props) => {
    return (
        <Card bordered={false}>
            <Flex vertical>
                <Text strong>{title}</Text>
                <Title style={{ margin: 0 }} level={5}>{dollar && "$"}{subTitle}</Title>
            </Flex>
        </Card>
    );
};

export default Tiles;