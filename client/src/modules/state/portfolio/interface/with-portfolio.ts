interface WithPortfolio {
    portfolio: string[];
    addPortfolio: (value: string) => void;
    removePortfolio: (index: number) => void;
}

export type { WithPortfolio };
