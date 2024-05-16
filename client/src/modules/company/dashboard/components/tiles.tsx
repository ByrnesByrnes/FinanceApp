import { Card, Flex, Typography } from "antd";

const { Text } = Typography;

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
                <Text type="secondary">{dollar && "$"} {subTitle}</Text>
            </Flex>
        </Card>
    );
};

export default Tiles;