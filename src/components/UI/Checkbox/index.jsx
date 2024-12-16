import React, { useState } from 'react';
import './checkbox.scss';
import check from '../../../assets/images/check.svg';


const Checkbox = ({ checked, onChange, label, className }) => {
    const [isChecked, setIsChecked] = useState(checked || false);

    const handleClick = () => {
        const newChecked = !isChecked;
        setIsChecked(newChecked);
        if (onChange) {
            onChange(newChecked);
        }
    };

    return (
        <div
            className={`custom-checkbox ${isChecked ? 'checked' : ''} ${className || ''}`}
            onClick={handleClick}
        >
            <div className="checkbox-box">
                <img src={check} alt=""/>
            </div>
            {label && <span className="checkbox-label">{label}</span>}
        </div>
    );
};

export default Checkbox;