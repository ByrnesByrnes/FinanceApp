const formatRatio = (ratio: number = 0) => {
    return (Math.round(ratio * 100) / 100).toFixed(2);
};

export default formatRatio;
