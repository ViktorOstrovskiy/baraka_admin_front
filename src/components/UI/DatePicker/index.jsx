import React, { useState, useRef, useEffect } from "react";
import "./datePicker.scss";
import calendarIcon from "../../../assets/images/calendar.svg";
import DatePickerLibrary from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePicker = ({ placeholder = "Choose a date", selectedDate, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState(selectedDate);
    const dateRef = useRef(null);

    const handleDateChange = (selected) => {
        setDate(selected);
        setIsOpen(false);
        if (onChange) onChange(selected);
    };

    const toggleDatePicker = () => {
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dateRef.current && !dateRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="date-picker" ref={dateRef}>
            <div className="date-picker-header" onClick={toggleDatePicker}>
                <span>{date ? date.toLocaleDateString() : placeholder}</span>
                <img src={calendarIcon} alt="calendar" />
            </div>
            {isOpen && (
                <div className="date-picker-dropdown">
                    <DatePickerLibrary
                        selected={date}
                        onChange={handleDateChange}
                        inline
                        calendarClassName="custom-calendar"
                    />
                </div>
            )}
        </div>
    );
};

export default DatePicker;
