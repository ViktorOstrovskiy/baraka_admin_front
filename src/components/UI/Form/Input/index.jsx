import React, { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import './Input.scss';
import OutsideClick from '../OutsideClick';
import {ArrowDropSvg} from "../../Icons/ArrowDropSvg.jsx";

const Input = ({
    value = '',
    onChange,
    placeholder,
    icon,
    options,
    styleBlock,
    onClickIcon,
    error,
    mergeValueOption,
    disabled,
    positionDrop,
    onBlur,
    placeholderInput,
    isLogin = false,
    firstItemOpacity = false,
    maxLength,
    classNameWrapper = '',
    ...props
}) => {
    const [isInput, setIsInput] = useState(false);
    const [isDrop, setIsDrop] = useState(false);
    const [valueSearch, setValueSearch] = useState({
        value: '',
        isActive: false,
    });
    const [errorMessage, setErrorMessage] = useState(null);

    const refInput = useRef(null);

    useEffect(() => {
        const hasValue = String(value).length > 0;

        if (props.type === 'number') {
            if (hasValue) {
                setIsInput(true);
            }
        } else {
            setIsInput(hasValue);
        }
    }, [value, props.type]);

    const filterValueOption = useMemo(() => {
        if (!valueSearch.isActive) return options || [];
        return (options || []).filter((item) => item.label.toLowerCase().includes(valueSearch.value.toLowerCase()));
    }, [options, valueSearch]);

    const valueOptions = useMemo(() => {
        const res = (options || []).find((item) => item.value === value);
        return res ? res.label : '';
    }, [options, value]);

    const middlewareOnChange = (e, selectionStart) => {
        const newValue = e.target.value;

        if (maxLength && newValue.length > maxLength) {
            setErrorMessage(`Maximum number of characters: ${maxLength}`);
            return;
        } else {
            setErrorMessage(null);
        }

        setValueSearch({
            value: newValue,
            isActive: true,
        });

        if (!isDrop) {
            onChange?.(newValue, selectionStart);
        }
    };

    // Визначення класів для input-block
    const blockClasses = classNames('input-block', {
        'error': !!errorMessage || error === 'error',
        'disabled': disabled,
        'is-login': isLogin,
    });

    // Визначення класів для input
    const inputClasses = classNames('input-block__input', {
        'is-input': isInput,
        'is-login': isLogin,
    });

    // Визначення класів для placeholder
    const placeholderClasses = classNames('input-block__placeholder', {
        'is-input': isInput,
    });

    // Визначення класів для icon
    const iconClasses = classNames('input-block__icon', {
        active: isDrop,
    });

    // Визначення класів для drop
    const dropClasses = classNames('input-drop', {
        bottom: positionDrop === 'bottom',
        top: positionDrop !== 'bottom',
    });

    return (
        <div className={`input-wrapper ${classNameWrapper}`} style={styleBlock}>
            <div
                className={blockClasses}
                onClick={() => {
                    if (!disabled) {
                        setIsInput(true);
                        if (refInput.current) {
                            refInput.current.focus();
                        }
                        if (options) {
                            setIsDrop(true);
                        }
                    }
                }}
            >
                <OutsideClick
                    onClickOutside={() => {
                        setValueSearch({
                            value: '',
                            isActive: false,
                        });
                        setIsDrop(false);
                    }}
                >
                    <div className="input-block__content">
                        <div className={placeholderClasses}>{placeholder}</div>

                        <input
                            {...props}
                            className={inputClasses}
                            placeholder={placeholderInput}
                            ref={refInput}
                            value={
                                isDrop && valueSearch.isActive
                                    ? valueSearch.value
                                    : options && options.length > 0
                                      ? valueOptions
                                      : value
                            }
                            onInput={(e) => middlewareOnChange(e, e.target.selectionStart)}
                            onBlur={(e) => {
                                setIsInput(String(value).length > 0);

                                if (!options) {
                                    onBlur?.(e.target.value, e);
                                    middlewareOnChange(e);
                                }
                            }}
                        />
                    </div>

                    {options ? (
                        <div
                            className={iconClasses}
                            onClick={(e) => {
                                // e.stopPropagation();
                                onClickIcon && onClickIcon(e);
                            }}
                        >
                            <ArrowDropSvg className={isDrop ? 'active' : ''} />
                        </div>
                    ) : (
                        icon && (
                            <div
                                className="input-block__icon"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClickIcon && onClickIcon(e);
                                }}
                            >
                                {icon}
                            </div>
                        )
                    )}

                    {options && isDrop && (
                        <div className={dropClasses}>
                            {filterValueOption.length > 0 ? (
                                filterValueOption.map((item, index) => {
                                    let textReplace = valueSearch.value;

                                    if (valueSearch) {
                                        const text = item.label.toLowerCase();
                                        const searchString = valueSearch.value.toLowerCase();
                                        const regex = new RegExp(searchString, 'g');
                                        const matches = text.match(regex);

                                        let startIndex = 0;
                                        let endIndex = 0;

                                        if (matches) {
                                            for (const match of matches) {
                                                startIndex = text.indexOf(match);
                                                endIndex = startIndex + match.length;
                                            }
                                        }

                                        textReplace = item.label.slice(startIndex, endIndex);
                                    }

                                    return (
                                        <div
                                            className={classNames('input-drop__item', {
                                                'is-active': item.value === value,
                                                'first-item-opacity': index === 0 && firstItemOpacity,
                                            })}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onChange?.(item.value);
                                                setIsDrop(false);
                                            }}
                                            key={`${item.value}${index}input`}
                                            style={index === 0 && firstItemOpacity ? { color: '#676c74' } : {}}
                                        >
                                            {mergeValueOption && (
                                                <b
                                                    style={{
                                                        opacity: 0.5,
                                                        width: 30,
                                                        display: 'inline-flex',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    {item.value}
                                                </b>
                                            )}
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: item.label.replace(textReplace, `<b>${textReplace}</b>`),
                                                }}
                                            />
                                        </div>
                                    );
                                })
                            ) : (
                                <div>No data available</div>
                            )}
                        </div>
                    )}
                </OutsideClick>
            </div>

            {errorMessage && <div className="input-info-text">{errorMessage}</div>}
        </div>
    );
};

export default React.memo(Input);
