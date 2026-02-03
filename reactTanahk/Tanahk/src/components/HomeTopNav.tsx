import "./HomeTopNav.css"

export function HomeTopNav() {
    return (
        <>
            <div className="top-nav-bar">
                <h1 className="today-title">היום</h1>
                <div className="streak-container" id="streak-container">
                    <p id="streak-number" className="streak-number">0</p>
                    <span className="material-symbols-rounded">bolt</span>
                </div>
            </div>
        </>
    );
}