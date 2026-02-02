import "./ReadPage.css";
import { useEffect, useState } from "react";
import { baseUrl } from "../utils/utils";
import { ReadText } from "./ReadText";
import { ChapterHeader } from "./ChapterHeader";

import downArrow from "../assets/icons/downArrow.png";
import { ChapterSelector, type Section } from "./ChapterSelector";

type ReadPageProp = {
    chapterUrl?: string
}

export function ReadPage({ chapterUrl }: ReadPageProp) {
    const [tanakhIndex, setTanakhIndex] = useState<Section[]>([]);
    const [selectedBook, setSelectedBook] = useState("Genesis");
    const [chapterNumber, setChapterNumber] = useState(1);
    const [chapterTitle, setChapterTitle] = useState("");
    const [chapterText, setChapterText] = useState<string[]>([]);
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);

    useEffect(() => {
        initTanakhIndex();
    }, []);

    useEffect(() => {
        showChapter();
    }, [selectedBook, chapterNumber]);

    const initTanakhIndex = async () => {
        const response = await fetch(`${baseUrl}/index`);
        const data = await response.json();

        const tanakh = data.find((cat: any) => cat.category === "Tanakh");
        if (!tanakh) return;

        setTanakhIndex(
        tanakh.contents.filter((section: Section) =>
            ["Torah", "Prophets", "Writings"].includes(section.category)
        )
        );
    };

    const showChapter = async () => {
        const url = chapterUrl ?? `${selectedBook}.${chapterNumber}`;
        const response = await fetch(`${baseUrl}/v3/texts/${url}?lang=he`);
        const data = await response.json();

        const hebrewVersion = data.versions.find(
        (v: any) => v.actualLanguage === "he"
        );

        setChapterTitle(data.heRef);
        setChapterText(hebrewVersion.text);
    };
    
    return (
        <>
            <ChapterSelector
            tanakhIndex={tanakhIndex}
            isOpen={isSelectorOpen}
            onClose={() => setIsSelectorOpen(false)}
            onSelectChapter={(book, chapter) => {
                setSelectedBook(book);
                setChapterNumber(chapter);
                setIsSelectorOpen(false);
            }}
            />

        <div className={`chapterContainer ${isSelectorOpen ? "inactive" : ""}`}>
            <ChapterHeader chapterTitle={chapterTitle} onClick={() => setIsSelectorOpen(true)} />
            <ReadText chapterText={chapterText} />

            {chapterNumber > 1 && (
            <button onClick={() => setChapterNumber(n => n - 1)} className="prevChapter">
                <img src={downArrow} alt="previous chapter" />
            </button>
            )}

            <button onClick={() => setChapterNumber(n => n + 1)} className="nextChapter">
            <img src={downArrow} alt="next chapter" />
            </button>
        </div>
        </>
    );
}