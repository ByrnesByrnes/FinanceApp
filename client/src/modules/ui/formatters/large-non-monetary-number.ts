import largeMonetaryNumber from "./large-monetary-number";

const largeNonMonetaryNumber = (number: number): string => {
    if (number < 0) {
        return "-" + largeMonetaryNumber(-1 * number);
    }
    if (number < 1000) {
        return number.toString();
    } else if (number >= 1000 && number < 1_000_000) {
        return (number / 1000).toFixed(1) + "K";
    } else if (number >= 1_000_000 && number < 1_000_000_000) {
        return (number / 1_000_000).toFixed(1) + "M";
    } else if (number >= 1_000_000_000 && number < 1_000_000_000_000) {
        return (number / 1_000_000_000).toFixed(1) + "B";
    } else if (number >= 1_000_000_000_000 && number < 1_000_000_000_000_000) {
        return (number / 1_000_000_000_000).toFixed(1) + "T";
    }

    return "-.--";
};

export default largeNonMonetaryNumber;
