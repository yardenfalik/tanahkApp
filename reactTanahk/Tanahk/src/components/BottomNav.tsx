import "./BottomNav.css"
import type { ViewMode } from "../App";

type BottomNavProp = {
    onClick: (viewMode: ViewMode) => void;
};


export function BottomNav({onClick}: BottomNavProp) {
    return (
        <>
            <div className="navBar" id="navBar">
                <div className="navItem" onClick={() => onClick("home")}>
                    <span className="material-symbols-rounded">home</span>
                    <span className="navTitle">בית</span>
                </div>
                <div className="navItem" onClick={() => onClick("read")}>
                    <span className="material-symbols-rounded">book</span>
                    <span className="navTitle">תנ"ך</span>
                </div>
            </div>
        </>
    );
}