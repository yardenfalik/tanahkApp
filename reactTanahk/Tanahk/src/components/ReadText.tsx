import "./ReadText.css"
import { hebrewLetters } from "../utils/utils";

type ReadTextProp = {
    chapterText: string[]
}

export function ReadText({chapterText}: ReadTextProp) {
    return (
        <>
            <div id="chapter-text" className="chapterText">
                {[...chapterText].map((verse, i) => {
                    return(
                        <span className="verse"><span className="verse-number">{hebrewLetters[i]}</span><span dangerouslySetInnerHTML={{__html: verse }}></span></span>
                    );
                })}
            </div>
        </>
    );
}