import {useState, useRef, useEffect} from "react";
import "./Tooltip.scss";

const Tooltip = ({ children, position, content }) => {
    const [tooltipPosition, setTooltipPosition] = useState(position);
    const tooltipRef = useRef(null);

    useEffect(() => {
        if (tooltipRef.current) {
            const tooltipRect = tooltipRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            if (tooltipRect.right > viewportWidth) {
                setTooltipPosition("left");
            } else if (tooltipRect.left < 0) {
                setTooltipPosition("right");
            } else if (tooltipRect.top < 0) {
                setTooltipPosition("bottom");
            } else if (tooltipRect.bottom > viewportHeight) {
                setTooltipPosition("top");
            }
        }
    }, [position]);

    return (
        <div className={`tooltip tooltip-${tooltipPosition}`} ref={tooltipRef}>
            {content}
            <div className="tooltip-arrow" />
        </div>
    );
};

export default Tooltip;
