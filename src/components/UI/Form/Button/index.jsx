// Button.jsx
import React from 'react';
import classNames from 'classnames';
import './Button.scss';
import { Link } from 'react-router-dom';

const Button = ({
    children,
    buttonType = 'default',
    size,
    arrowLeft,
    arrowRight,
    href,
    disabled,
    className = '',
    onClick,
    isLoading,
    style,
    type = 'button',
    ...props
}) => {
    const baseClass = 'button';

    // Визначення класів модифікаторів
    const buttonClass = classNames(baseClass, {
        [`${baseClass}--${buttonType}`]: buttonType && buttonType !== 'default',
        [`${baseClass}--${size}`]: size,
        [`${baseClass}--disabled`]: disabled,
        [`${baseClass}--big`]: size === 'big',
    });

    const content = (
        <div className="button_content">
            {arrowLeft && <span className={`${baseClass}__arrow-left`}>{arrowLeft}</span>}
            <span style={isLoading ? { opacity: '0' } : {}}>{children}</span>
            {arrowRight && <span className={`${baseClass}__arrow-right`}>{arrowRight}</span>}
        </div>
    );

    if (href) {
        return (
            <Link href={href} passHref>
                <a
                    className={buttonClass}
                    onClick={(e) => {
                        if (!disabled && onClick) {
                            onClick(e);
                        }
                    }}
                    style={style}
                    {...props}
                >
                    {content}
                </a>
            </Link>
        );
    }

    return (
        <button
            className={`${buttonClass} ${className}`}
            onClick={(e) => {
                if (!disabled && onClick) {
                    onClick(e);
                }
            }}
            style={style}
            type={type}
            disabled={disabled}
            {...props}
        >
            {content}
        </button>
    );
};

export default React.memo(Button);
