export const getNewSearchParams = (
    searchParams: URLSearchParams,
    value: any,
    paramKey: string
) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (value) {
        newSearchParams.set(paramKey, `${value}`);
    } else {
        newSearchParams.delete(paramKey);
    }

    return newSearchParams;
};
