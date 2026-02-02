import "./BottomNav.css"

type BottomNavProp = {
    onClick?: () => void;
};


export function BottomNav() {
    return (
        <>
            <div className="navBar" id="navBar">
                <div className="navItem">
                    <span className="material-symbols-rounded">home</span>
                    <span className="navTitle">בית</span>
                </div>
                <div className="navItem">
                    <span className="material-symbols-rounded">book</span>
                    <span className="navTitle">תנ"ך</span>
                </div>
            </div>
        </>
    );
}