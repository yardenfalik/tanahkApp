const baseUrl = "https://www.sefaria.org/api";

const home = document.getElementById("home");
const navBar = document.getElementById("navBar");
const booksContainer = document.getElementById("books-container");
const chapterContainer = document.getElementById("chapter-container");

const showHome = () => {
  booksContainer.classList.remove("show");
  chapterContainer.style.display = "none";

  home.style.display = "flex";
};

if(window.navigator.standalone == true)
{
  document.getElementById('pwa-alert').style.display = 'none';
}

function handleInstallClick()
{
  document.getElementById('pwa-alert').style.display = 'none';
}

const updateStorage = () => {
  setItem("selectedBook", selectedBook);
  setItem("chapterNumber", chapterNumber);
};

const loadFromStorage = () => {
  const storedBook = getItem("selectedBook");
  const storedChapter = getItem("chapterNumber");

  if (storedBook) {
    selectedBook = storedBook;
  } else {
    selectedBook = "Genesis";
  }

  if (storedChapter) {
    chapterNumber = storedChapter;
  } else {
    chapterNumber = 1;
  }
};

loadFromStorage();
showHome();