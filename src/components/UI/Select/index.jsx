import React, { useState, useRef, useEffect } from "react";
import "./select.scss";
import arrow from "../../../assets/images/select-arrow.svg";

const SelectBox = ({ options = [], placeholder = "", value = null, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(value);
    const selectRef = useRef(null);
    const [dropdownWidth, setDropdownWidth] = useState("auto");

    useEffect(() => {
        if (selectRef.current) {
            setDropdownWidth(selectRef.current.offsetWidth - 2 + "px");
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option.value);
        setIsOpen(false);
        if (onChange) onChange(option.value);
    };

    return (
        <div className="select-box" ref={selectRef}>
            <div className="select-header" onClick={toggleDropdown}>
                <span>
                    {selectedOption
                        ? options.find((opt) => opt.value === selectedOption)?.label
                        : placeholder}
                </span>
                <img
                    src={arrow}
                    alt="arrow"
                    className={`arrow-icon ${isOpen ? "open" : ""}`}
                />
            </div>
            {isOpen && (
                <ul className="select-dropdown" style={{ width: dropdownWidth }}>
                    {options.length > 0 ? (
                        options.map((option, index) => (
                            <li
                                key={index}
                                className={`select-option ${
                                    selectedOption === option.value ? "active" : ""
                                }`}
                                onClick={() => handleOptionClick(option)}
                            >
                                {option.label}
                            </li>
                        ))
                    ) : (
                        <li className="select-no-options">No options available</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default SelectBox;
