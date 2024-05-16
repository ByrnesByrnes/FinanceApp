import { Layout, theme } from "antd";
import * as ROUTES from "modules/route/constants";
import { Link } from "react-router-dom";

const { Header } = Layout;

const TopNavigation = () => {

    const { token: { colorBgLayout } } = theme.useToken();

    return (
        <Header style={{ background: colorBgLayout }}>
            <Link to={ROUTES.HOME}>
                TopNavigation
            </Link>
            <Link to={ROUTES.SEARCH}>
                Search
            </Link>
        </Header>
    );
};

export default TopNavigation;