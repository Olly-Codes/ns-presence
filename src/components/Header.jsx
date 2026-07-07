import { HiPaintBrush } from "react-icons/hi2"
import DigitalClock from "./DigitalClock";

const Header = () => {
    return (
        <header className="header-content">
            <div className="header-text">
                <h1>NS Presence</h1>
                <p>Discord Rich Presence</p>
            </div>
            <div className="header-extra">
                <span className="themes-icon">
                    <HiPaintBrush />
                </span>
                <DigitalClock />
            </div>
        </header>
    );
};

export default Header;