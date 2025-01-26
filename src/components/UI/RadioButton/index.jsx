import React from 'react';
import './radio.scss';

const RadioButton = ({ selected = false, onChange, label, className }) => {

    const handleClick = () => {
        if(!selected) {
            if (onChange) {
                onChange(!selected);
            }
        }
    };

    return (
        <div
            className={`custom-radio ${selected ? 'selected' : ''} ${className || ''}`}
            onClick={handleClick}
        >
            <div className="radio-circle">
                {selected && <div className="radio-inner-circle"></div>}
            </div>
            {label && <span className="radio-label">{label}</span>}
        </div>
    );
};

export default RadioButton;