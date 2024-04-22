import { ReactNode, createContext, useState } from "react";
import { WithPortfolio } from "./interface/with-portfolio";

const defaults = {
    portfolio: [],
    addPortfolio: () => { },
    removePortfolio: () => { }
};

const PortfolioContext = createContext<WithPortfolio>(defaults);

interface Props {
    children: ReactNode;
}

const PortfolioProvider = ({ children }: Props) => {
    const [portfolio, setPortfolio] = useState<string[]>([]);

    const addPortfolio = (value: string) => {

        const update = [...portfolio, value];

        setPortfolio(update);
    };

    const removePortfolio = (index: number) => {

        const update = portfolio.filter((item, i) => i !== index);

        setPortfolio(update);
    };

    return (
        <PortfolioContext.Provider value={{ portfolio, addPortfolio, removePortfolio }}>
            {children}
        </PortfolioContext.Provider>
    );
};

export { PortfolioProvider, PortfolioContext };