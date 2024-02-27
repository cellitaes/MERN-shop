export type ValidatorFn = (value: any, ...options: any[]) => boolean;

export enum VALIDATOR_TYPES {
    REQUIRE = 'REQUIRE',
    MINLENGTH = 'MINLENGTH',
    MAXLENGTH = 'MAXLENGTH',
    MIN = 'MIN',
    MAX = 'MAX',
    EMAIL = 'EMAIL',
    OPTIONAL = 'OPTIONAL',
    DATE = 'DATE',
    IS_NUMBER = 'IS NUMBER',
}

export const getErrorMessage = (
    type: VALIDATOR_TYPES,
    options?: any
): string => {
    switch (type) {
        case VALIDATOR_TYPES.REQUIRE:
            return 'This field is required.';
        case VALIDATOR_TYPES.IS_NUMBER:
            return `The value must be a number.`;
        case VALIDATOR_TYPES.MINLENGTH:
            return `The value must be at least ${options.minLength} characters long.`;
        case VALIDATOR_TYPES.MAXLENGTH:
            return `The value must not exceed ${options.maxLength} characters.`;
        case VALIDATOR_TYPES.MIN:
            return `The value must be greater than or equal to ${options.min}.`;
        case VALIDATOR_TYPES.MAX:
            return `The value must be less than or equal to ${options.max}.`;
        case VALIDATOR_TYPES.EMAIL:
            return 'Please enter a valid email address.';
        case VALIDATOR_TYPES.DATE:
            return `The date must be earlier than ${options.maxDate}.`;
        default:
            return 'Invalid value.';
    }
};

export const validators: Record<VALIDATOR_TYPES, ValidatorFn> = {
    [VALIDATOR_TYPES.OPTIONAL]: () => true,
    [VALIDATOR_TYPES.REQUIRE]: ({ value }: { value: any }) =>
        value.trim().length > 0,
    [VALIDATOR_TYPES.MINLENGTH]: ({
        value,
        minLength,
    }: {
        value: any;
        minLength: number;
    }) => value.trim().length >= minLength,
    [VALIDATOR_TYPES.MAXLENGTH]: ({
        value,
        maxLength,
    }: {
        value: any;
        maxLength: number;
    }) => value.trim().length <= maxLength,
    [VALIDATOR_TYPES.MIN]: ({ value, min }: { value: any; min: number }) =>
        +value >= min,
    [VALIDATOR_TYPES.MAX]: ({ value, max }: { value: any; max: number }) =>
        +value <= max,
    [VALIDATOR_TYPES.EMAIL]: ({ value }: { value: any }) => {
        return value
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    },
    [VALIDATOR_TYPES.DATE]: ({
        value,
        maxDate,
    }: {
        value: any;
        maxDate: string;
    }) => {
        const chosenDate = new Date(value).getTime();
        const maxDateTime = new Date(maxDate).getTime();
        return chosenDate - maxDateTime < 0;
    },
    [VALIDATOR_TYPES.IS_NUMBER]: ({ value }: { value: any }) =>
        typeof value === 'number' || !isNaN(+value),
};
