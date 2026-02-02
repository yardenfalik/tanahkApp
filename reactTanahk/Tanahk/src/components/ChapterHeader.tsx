import "./ChapterHeader.css"

type ChapterHeaderProp = {
    chapterTitle: string
}

export function ChapterHeader({chapterTitle}: ChapterHeaderProp) {
    return (
        <>
            <div className="chapterHeader">
                <p id="chapter-title" className="chapterTitle">{ chapterTitle }</p>
            </div>
        </>
    );
}