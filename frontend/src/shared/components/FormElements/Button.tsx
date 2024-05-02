import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { Size } from '../../../models/enums/sizeEnum';
import { ButtonType } from '../../../models/enums/buttonTypeEnum';

type ButtonProps = {
    children: ReactNode;
    className?: string;
    danger?: boolean;
    disabled?: boolean;
    href?: string;
    inverse?: boolean;
    size?: Size;
    to?: string;
    type?: ButtonType;
    onClick?: () => void;
    rest?: any;
};

const Button: FC<ButtonProps> = ({
    children,
    className,
    danger,
    disabled,
    href,
    inverse,
    size,
    to,
    type = ButtonType.button,
    onClick,
    ...rest
}) => {
    if (href) {
        return (
            <a
                className={`button button--${size || 'default'} ${
                    inverse && 'button--inverse'
                } ${danger && 'button--danger'} ${className}`}
                href={href}
                {...rest}
            >
                {children}
            </a>
        );
    }
    if (to) {
        return (
            <Link
                to={to}
                className={`button button--${size || 'default'} ${
                    inverse && 'button--inverse'
                } ${danger && 'button--danger'} ${className}`}
                {...rest}
            >
                {children}
            </Link>
        );
    }
    return (
        <button
            className={`button button--${size || 'default'} ${
                inverse && 'button--inverse'
            } ${danger && 'button--danger'} ${className}`}
            type={type}
            onClick={onClick}
            disabled={disabled}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
