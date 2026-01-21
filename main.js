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
  setItem("streak", streak);
  setItem("lastLoginDate", lastLoginDate);
};

const streakHandler = (lastDateStr, savedStreak) => {
  const today = new Date();
  const yesterday = new Date(today);

  yesterday.setDate(today.getDate() - 1);

  lastDate = new Date(lastDateStr)

  if(lastDate.toDateString() === yesterday.toDateString()) {
    streak = savedStreak + 1;
  } else if (lastDate.toDateString() !== today.toDateString()) {
    streak = 1;
  } else {
    streak = savedStreak;
  }

  lastLoginDate = today;

  setItem("streak", streak);
  setItem("lastLoginDate", lastLoginDate);
}

const loadFromStorage = () => {
  const storedBook = getItem("selectedBook");
  const storedChapter = getItem("chapterNumber");
  const savedStreak = getItem("streak");
  lastLoginDate = getItem("lastLoginDate");
  
  streak = 1;

  if (savedStreak) {
    streakHandler(lastLoginDate, savedStreak); 
  }

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