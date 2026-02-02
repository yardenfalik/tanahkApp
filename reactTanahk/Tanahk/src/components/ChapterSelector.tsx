import "./ChapterSelector.css";
import { baseUrl, hebrewLetters } from "../utils/utils";
import { useState } from "react";

export type Book = {
  title: string;
  heTitle: string;
};

export type Section = {
  category: string;
  heCategory: string;
  contents: Book[];
};

type ChapterSelectorProps = {
  tanakhIndex: Section[];
  isOpen: boolean;
  onClose: () => void;
  onSelectChapter: (book: string, chapter: number) => void;
};

export const ChapterSelector: React.FC<ChapterSelectorProps> = ({
  tanakhIndex,
  isOpen,
  onClose,
  onSelectChapter,
}) => {
  const [openBooks, setOpenBooks] = useState<Record<string, number>>({});

  const handleBookClick = async (book: { title: string }) => {
    if (book.title in openBooks) return;

    const chapterCount = await fetch(`${baseUrl}/shape/${book.title}`)
      .then(res => res.json())
      .then(data => data[0].length);

    setOpenBooks(prev => ({ ...prev, [book.title]: chapterCount }));
  };

  return (
    <div
      id="books-container"
      className={`booksContainer ${isOpen ? "open" : ""}`}
    >
      <a
        id="booksListCloseBtn"
        className="settingsCloseBtn"
        onClick={onClose}
      >
        Cancel
      </a>

      <ul id="books-list" className="booksList">
        {tanakhIndex.map(section => (
          <div key={section.heCategory}>
            <h3>{section.heCategory}</h3>
            <ul className="bookList">
              {section.contents.map(book => (
                <li key={book.title}>
                  <details>
                    <summary onClick={() => handleBookClick(book)}>
                      {book.heTitle}
                    </summary>

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
                                onSelectChapter(book.title, i + 1);
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
  );
};