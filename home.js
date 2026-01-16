const hebrewDateContainer = document.getElementById("hebrewDateContainer");
const greeting = document.getElementById("greeting");

const initHome = async () => {
    const sefariaCalendar = await getCalendarSefaria();
    
    greeting.innerText = greetByTime();

    const parashatHashavuaContainer = document.getElementById("parashat-hashavua-container");
    const parashatHashavua = document.getElementById("parashat-hashavua");
    const parashatHashavuaTitle = document.getElementById("parashat-hashavua-title");

    parashatHashavuaTitle.innerText = sefariaCalendar.calendar_items[0].title.he + " - " + sefariaCalendar.calendar_items[0].displayValue.he;
    parashatHashavua.innerText = sefariaCalendar.calendar_items[0].description.he;

    parashatHashavuaContainer.onclick = () => {
      showChapter(sefariaCalendar.calendar_items[0].url);
    };

    getCalendarDate().then(data => {
        hebrewDateContainer.innerText = data.hebrew;
    });
};

async function getCalendarDate() {
    const response = await fetch(`https://www.hebcal.com/converter?cfg=json&gy=${new Date().getFullYear()}&gm=${new Date().getMonth() + 1}&gd=${new Date().getDate()}&g2h=1`);
    const data = await response.json();
    return data;
}

async function getCalendarSefaria() {
    const response = await fetch(`${baseUrl}/calendars`);
    const data = await response.json();
    return data;
}

const greetByTime = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "בוקר טוב";
  } else if (hour >= 12 && hour < 18) {
    return "צהריים טובים";
  } else {
    return "ערב טוב";
  }
}

initHome();