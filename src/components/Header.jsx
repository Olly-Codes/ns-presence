import { HiPaintBrush } from "react-icons/hi2"
import DigitalClock from "./DigitalClock";

const Header = () => {
    return (
        <header className="header-content">
            <div className="header-text">
                <h2>NS Presence</h2>
                <p>Discord Rich Presence</p>
            </div>
            <div className="header-extra">
                <DigitalClock />
                <span className="themes-icon">
                    <HiPaintBrush />
                </span>
            </div>
        </header>
    );
};

export default Header;