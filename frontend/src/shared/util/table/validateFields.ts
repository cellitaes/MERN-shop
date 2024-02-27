import {
    VALIDATOR_TYPES,
    ValidatorFn,
    getErrorMessage,
    validators,
} from './fieldValidators';

const createValidator = (type: VALIDATOR_TYPES, options: any): ValidatorFn => {
    const validatorFn = validators[type];

    if (!validatorFn) {
        throw new Error(`Validator for type ${type} does not exist`);
    }
    return (value: any) => validatorFn({ value, ...options });
};

export const validate = (
    value: any,
    validators: { type: VALIDATOR_TYPES; [key: string]: any }[]
): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    const isValid = validators.every(({ type, ...rest }) => {
        const validationResult = createValidator(type, rest)(value);
        if (!validationResult) {
            errors.push(getErrorMessage(type, rest));
        }
        return validationResult;
    });

    return { isValid, errors };
};
