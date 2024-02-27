import { ChangeEvent, useCallback, useState } from 'react';
import { validate } from '../util/table/validateFields';

import { VALIDATOR_TYPES } from '../util/table/fieldValidators';

export const useTableValidation = (validators: {
    [key: string]: {
        validators: {
            type: VALIDATOR_TYPES;
        }[];
    };
}) => {
    const [validationErrors, setValidationErrors] = useState<
        Record<string, string | undefined>
    >({});

    const validateFieldChange = useCallback(
        (
            event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
            field: string
        ) => {
            const { value } = event.target;

            const { errors } = validate(
                value,
                validators[field as keyof typeof validators].validators
            );
            setValidationErrors({
                ...validationErrors,
                [field]: errors.join('\n'),
            });
        },
        [validators, validationErrors]
    );

    return { validationErrors, validateFieldChange };
};
