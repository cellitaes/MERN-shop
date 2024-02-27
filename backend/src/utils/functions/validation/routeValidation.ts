export const isValidDecimal = (value: string) => {
    const decimalPattern = /^-?\d*\.?\d+$/;
    return decimalPattern.test(value);
};
