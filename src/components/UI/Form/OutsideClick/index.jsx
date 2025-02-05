import React, { useEffect, useRef } from 'react';

const OutsideClick = ({ children, onClickOutside }) => {
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const refCurrent = ref.current;
            const target = event.target;

            if (refCurrent && !refCurrent.contains(target) && !target.closest("[data-outside='true']")) {
                onClickOutside(event);
            }
        };

        document.addEventListener('click', handleClickOutside, false);
        return () => {
            document.removeEventListener('click', handleClickOutside, false);
        };
    }, [onClickOutside]);

    return (
        <div
            ref={ref}
            style={{
                display: 'contents',
            }}
        >
            {children}
        </div>
    );
};

export default React.memo(OutsideClick);
