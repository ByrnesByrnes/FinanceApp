import { Outlet } from "react-router-dom";

interface Props {
    ticker: string;
}

const dashboard = ({ ticker }: Props) => <Outlet context={ticker} />;

export default dashboard;