let tanakhIndex = {};

const booksListEl = document.getElementById("books-list");

const chapterTitleEl = document.getElementById("chapter-title");
const chapterTextEl = document.getElementById("chapter-text");
const prevBtn = document.getElementById("prev-chapter");
const nextBtn = document.getElementById("next-chapter");

const hebrewLetters = [
  "א","ב","ג","ד","ה","ו","ז","ח","ט","י",
  "יא","יב","יג","יד","טו","טז","יז","יח","יט","כ",
  "כא","כב","כג","כד","כה","כו","כז","כח","כט","ל",
  "לא","לב","לג","לד","לה","לו","לז","לח","לט","מ",
  "מא","מב","מג","מד","מה","מו","מז","מח","מט","נ",
  "נא","נב","נג","נד","נה","נו","נז","נח","נט","ס",
  "סא","סב","סג","סד","סה","סו","סז","סח","סט","ע",
  "עא","עב","עג","עד","עה","עו","עז","עח","עט","פ",
  "פא","פב","פג","פד","פה","פו","פז","פח","פט","צ",
  "צא","צב","צג","צד","צה","צו","צז","צח","צט","ק",
  "קא","קב","קג","קד","קה","קו","קז","קח","קט","קי",
  "קיא","קיב","קיג","קיד","קיו","קיז","קיח","קיט","קכ",
  "קכא","קכב","קכג","קכד","קכה","קכו","קכז","קכח","קכט","קל",
  "קלא","קלב","קלג","קלד","קלה","קלו","קלז","קלח","קלט","קמ",
  "קמא","קמב","קמג","קמד","קמה","קמו","קמז","קמח","קמט","קנ",
  "קנא","קנב","קנג","קנד","קנה","קנו","קנז","קנח","קנט","קס",
  "קסא","קסב","קסג","קסד","קסה","קסו","קסז","קסח","קסט","קע",
  "קעא","קעב","קעג","קעד","קעו","קעז","קעח","קעט","קפ","קפא",
  "קפב","קפג","קפד","קפה","קפו","קפז","קפח","קפט","קצ","קצא",
  "קצב","קצג","קצד","קצה","קצו","קצז","קצח","קצט","קע","קעא",
  "קעב","קעג","קעד","קעה","קעו","קעז","קעח","קעט"
];

async function initTanakhIndex() {
    const response = await fetch(`${baseUrl}/index`);
    tanakhIndex = await response.json();

    const tanakh = tanakhIndex.find(cat => cat.category === "Tanakh");

    tanakhIndex = tanakh.contents.filter(section =>
        ["Torah", "Prophets", "Writings"].includes(section.category)
    );
}

const getChapterCount = async (book) => {
    const response = await fetch(`${baseUrl}/shape/${book}`);
    const data = await response.json();

    return data[0].length;
}

const showBooksList = () => {
    booksContainer.classList.add("show");
    
    tanakhIndex.forEach(section => {
        const bookList = document.createElement("ul");
        bookList.className = "bookList";
        section.contents.forEach(book => {
            const bookItem = document.createElement("li");

            const details = document.createElement("details");
            const summary = document.createElement("summary");

            summary.textContent = book.heTitle;
            details.appendChild(summary);

            bookItem.onclick = () => {
                if (details.querySelector(".chapters")) return;

                getChapterCount(book.title).then(chapterCount => {
                    const chapters = document.createElement("div");
                    chapters.className = "chapters";

                   for (let i = 1; i <= chapterCount; i++) {
                        const chapterItem = document.createElement("div");
                        chapterItem.className = "chapterItem";

                        chapterItem.textContent = `${hebrewLetters[i - 1]}`;

                        chapterItem.onclick = (e) => {
                          selectedBook = book.title.replace(" ", "_");
                          chapterNumber = i;
                          updateStorage();
                          showChapter();
                        };

                        chapters.appendChild(chapterItem);
                        details.appendChild(chapters);
                    }
                });
            };
            
            bookItem.appendChild(details);

            bookList.appendChild(bookItem);
        });

        const h3 = document.createElement("h3");
        h3.textContent = section.heCategory;

        booksListEl.appendChild(h3);
        booksListEl.appendChild(bookList);

        booksListEl.classList.add("booksList");
    });
}

const updateChapterNumber = (newChapterNumber) => {
  chapterNumber = newChapterNumber;
  updateStorage();
};

async function showChapter(chapterUrl) {
  chapterContainer.style.display = "block";
  home.style.display = "none";

  if (!chapterUrl) {
    chapterUrl = `${selectedBook}.${chapterNumber}`;
  }

  const response = await fetch(`${baseUrl}/v3/texts/${chapterUrl}?lang=he`);
  const data = await response.json();

  const hebrewVersion = data.versions.find(v => v.actualLanguage === "he");

  if (!hebrewVersion) {
    chapterTitleEl.textContent = "לא נמצא טקסט בעברית.";
    chapterTextEl.innerHTML = "";
    return;
  }

  booksContainer.classList.remove("show");
  chapterContainer.style.display = "block";
  chapterTitleEl.textContent = data.heRef;
  chapterContainer.style.direction = hebrewVersion.direction;

  chapterTextEl.innerHTML = hebrewVersion.text
    .map((verse, i) => `<span class="verse"><span class="verse-number">${hebrewLetters[i]}</span> ${verse}</span>`)
    .join(" ");

    if (chapterNumber > 1) {
        prevBtn.style.display = "block";
    } else {
        prevBtn.style.display = "none";
    }
}

prevBtn.onclick = () => {
  if (chapterNumber > 1) {
    updateChapterNumber(chapterNumber - 1);
    showChapter();
  }
};

nextBtn.onclick = () => {
  updateChapterNumber(chapterNumber + 1);
  showChapter();
};

booksListCloseBtn.onclick = () => {
  booksContainer.classList.remove("show");
};

initTanakhIndex();