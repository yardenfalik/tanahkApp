import "./ChapterSelector.css"
import { baseUrl, hebrewLetters } from "../utils/utils";
import { useState } from "react";

type Book = {
  title: string;
  heTitle: string;
};

type Section = {
  heCategory: string;
  contents: Book[];
};

export type ChapterSelectorProps = {
  tanakhIndex: Section[];
};

const getChapterCount = async (book: string) => {
    const response = await fetch(`${baseUrl}/shape/${book}`);
    const data = await response.json();

    return data[0].length;
}

export const ChapterSelector: React.FC<ChapterSelectorProps> = ({ tanakhIndex }) => {
    
    //let tanakhIndex = await initTanakhIndex();
    //console.log(tanakhIndex);

    const [openBooks, setOpenBooks] = useState<Record<string, number>>({});
    const [selectedBook, setSelectedBook] = useState<string | null>(null);
    const [chapterNumber, setChapterNumber] = useState<number | null>(null);

    function handleBookClick(book: Book): void {
        if (openBooks[book.title]) return;

        const chapterCount = await getChapterCount(book.title);
        setOpenBooks(prev => ({
        ...prev,
        [book.title]: chapterCount,
        }));
    };

    const handleChapterClick = (book: Book, chapter: number) => {
        setSelectedBook(book.title.replace(" ", "_"));
        setChapterNumber(chapter);
        //updateStorage();
        //showChapter();
    };

    }

    return (
        <>
            <div id="books-container" className="booksContainer">
                <a id="booksListCloseBtn" className="settingsCloseBtn">Cancel</a>
                <ul id="books-list">
                    {
                        [...tanakhIndex].map(section => (
                        <div key={section.heCategory}>
                            <h3>{section.heCategory}</h3>
                            <ul className="bookList booksList">
                            {section.contents.map((book: Book) => (
                                <li key={book.title}>
                                    <details onClick={() => handleBookClick(book)}>
                                    <summary>{book.heTitle}</summary>

                                    {openBooks[book.title] && (
                                        <div className="chapters">
                                        {Array.from(
                                            { length: openBooks[book.title] },
                                            (_, i) => (
                                            <div
                                                key={i}
                                                className="chapterItem"
                                                onClick={e => {
                                                e.stopPropagation();
                                                handleChapterClick(book, i + 1);
                                                }}
                                            >
                                                {hebrewLetters[i]}
                                            </div>
                                            )
                                        )}
                                        </div>
                                    )}
                                    </details>
                                </li>
                                ))}
                            </ul>
                            </div>
                        ))}
                </ul>
            </div>
        </>
    );
}