import { PortfolioContext } from "./portfolio-context";

/**
 * A public higher-order component to access the imperative API
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withPortfolio = (Component: any) => {
    const displayName = `withProfile(${Component || Component.name})`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const C = (props: any) => {
        const { wrappedComponentRef, ...remainingProps } = props;

        return (
            <PortfolioContext.Consumer>
                {context => {
                    return (
                        <Component
                            {...remainingProps}
                            {...context}                            
                            ref={wrappedComponentRef}
                        />
                    );
                }}
            </PortfolioContext.Consumer>
        );
    };

    C.displayName = displayName;
    C.WrappedComponent = Component;

    return C;
};

export { withPortfolio };