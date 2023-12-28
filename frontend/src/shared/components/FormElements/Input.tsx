import { FC } from 'react';

export type FieldProps = {
    name: string;
    value: string;
    onChange: () => void;
    onBlur: () => void;
};

export type FormField = {
    name: string;
    label: string;
    type: string;
};

const Input: FC<{
    formField: FormField;
    touched: { [field: string]: boolean };
    errors: { [field: string]: string };
    field: FieldProps;
    className?: string;
}> = ({ formField, touched, errors, field, className }) => {
    return (
        <div className="form-field--center">
            <label className={className}>{formField.label}</label>
            <input
                {...field}
                className={`${field.name} ${
                    touched[field.name] && errors[field.name] && 'error'
                }`}
                autoComplete="on"
                type={formField.type}
                data-testid={formField.name}
            />
            {touched[field.name] && errors[field.name] && (
                <div className="error">{errors[field.name]}</div>
            )}
        </div>
    );
};

export default Input;
