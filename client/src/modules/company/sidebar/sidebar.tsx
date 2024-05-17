
import { Layout, Menu, theme } from "antd";
import { IoHome } from "react-icons/io5";
import Icon from "@ant-design/icons";
import { Link } from "react-router-dom";
import { IoDocumentTextOutline } from "react-icons/io5";
import * as ROUTES from "modules/route/constants";

const { Sider } = Layout;

const Sidebar = () => {

    const { token: { colorBgElevated } } = theme.useToken();

    return (
        <Sider style={{ background: colorBgElevated }}>
            <Menu
                style={{ height: "100%", borderRight: 0 }}
                items={[
                    {
                        key: "company",
                        icon: <Icon component={IoHome} />,
                        label: <Link to={ROUTES.COMPANY_PROFILE}>Company Profile</Link>,
                    },
                    {
                        key: "statement",
                        icon: <Icon component={IoDocumentTextOutline} />,
                        label: <Link to={ROUTES.COMPANY_STATEMENT}>Income Statement</Link>,
                    },
                    {
                        key: "balance-sheet",
                        icon: <Icon component={IoDocumentTextOutline} />,
                        label: <Link to={ROUTES.BALANCE_SHEET}>Balance Sheet</Link>,
                    },
                    {
                        key: "cash-flow-statement",
                        icon: <Icon component={IoDocumentTextOutline} />,
                        label: <Link to={ROUTES.CASH_FLOW_STATEMENT}>Cash Flow Statement</Link>,
                    }
                ]}
            />
        </Sider>
    );
};

export default Sidebar;