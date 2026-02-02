import "./ReadPage.css";
import { useState } from "react";
import { baseUrl } from "../utils/utils";
import { ReadText } from "./ReadText";
import { ChapterHeader } from "./ChapterHeader";

import downArrow from "../assets/icons/downArrow.png";
import { ChapterSelector, type ChapterSelectorProps } from "./ChapterSelector";

type ReadPageProp = {
    chapterUrl?: string
}

const selectedBook = "Genesis";
const chapterNumber = 1;

export function ReadPage({chapterUrl}: ReadPageProp) {
    const [chapterTitle, setChapterTitle] = useState("");
    const [chapterText, setChapterText] = useState([""]);

    showChapter();

    async function showChapter(chapterUrl?: string) {
        if (!chapterUrl) {
            chapterUrl = `${selectedBook}.${chapterNumber}`;
        }

        const response = await fetch(`${baseUrl}/v3/texts/${chapterUrl}?lang=he`);
        const data = await response.json();

        const hebrewVersion = data.versions.find((v: { actualLanguage: string; }) => v.actualLanguage === "he");

        setChapterTitle(data.heRef);
        setChapterText(hebrewVersion.text);
    }

    if (chapterNumber > 1) {
        //prevBtn.style.display = "block";
    } else {
        //prevBtn.style.display = "none";
    }

    async function initTanakhIndex(): ChapterSelectorProps {
        const response = await fetch(`${baseUrl}/index`);
        let tanakhIndex = await response.json();

        const tanakh = tanakhIndex.find((cat: { category: string; }) => cat.category === "Tanakh");

        tanakhIndex = tanakh.contents.filter((section: { category: string; }) =>
            ["Torah", "Prophets", "Writings"].includes(section.category)
        );
        
        return Promise.resolve(tanakhIndex);
    }


    return (
        <>
            <ChapterSelector tanakhIndex={initTanakhIndex()}></ChapterSelector>
            <div className="readPage" id="readPage">
                <div id="chapter-container" className="chapterContainer">
                    <ChapterHeader chapterTitle={chapterTitle}></ChapterHeader>
                    <ReadText chapterText={chapterText}></ReadText>
                    <button id="prev-chapter" className="prevChapter"><img src={downArrow}></img></button>
                    <button id="next-chapter" className="nextChapter"><img src={downArrow}></img></button>
                </div>
            </div>
        </>
    );
}