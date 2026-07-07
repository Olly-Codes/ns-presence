import { useState, useEffect } from "react";

const DigitalClock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        }
    }, []);

    const handleFormatTime = () => {
        let hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        const meridiem = hours >= 12 ? "PM" : "AM";

        hours = hours % 12 || 12;

        return `${handlePadZero(hours)}:${handlePadZero(minutes)} ${meridiem}`;
    }

    const handlePadZero = (number) => {
        return (number < 10 ? "0" : "") + number;
    }

    return (
        <span className="time">
            {handleFormatTime()}
        </span>
    )
}

export default DigitalClock;