import "./ChapterHeader.css"

type ChapterHeaderProp = {
    chapterTitle: string;
    onClick?: () => void;
};


export function ChapterHeader({chapterTitle, onClick}: ChapterHeaderProp) {
    return (
        <>
            <div className="chapterHeader" onClick={onClick}>
                <p id="chapter-title" className="chapterTitle">{ chapterTitle }</p>
            </div>
        </>
    );
}