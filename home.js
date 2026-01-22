const hebrewDateContainer = document.getElementById("hebrewDateContainer");
const greeting = document.getElementById("greeting");
const streakNumber = document.getElementById("streak-number");

const initHome = async () => {
    const sefariaCalendar = await getCalendarSefaria();
    
    greeting.innerText = greetByTime();
    streakNumber.innerText = streak;

    const parashatHashavuaContainer = document.getElementById("parashat-hashavua-container");
    const parashatHashavua = document.getElementById("parashat-hashavua");
    const parashatHashavuaTitle = document.getElementById("parashat-hashavua-title");

    parashatHashavuaTitle.innerText = sefariaCalendar.calendar_items[0].title.he + " - " + sefariaCalendar.calendar_items[0].displayValue.he;
    parashatHashavua.innerHTML = `${sefariaCalendar.calendar_items[0].description.he} <a href='#'>לקריאה...</a>`;

    parashatHashavuaContainer.onclick = () => {
      showChapter(sefariaCalendar.calendar_items[0].url);
    };

    const hadafHayomiContainer = document.getElementById("hadaf-hayomi-container");
    const hadafHayomi = document.getElementById("hadaf-hayomi");
    const hadafHayomiTitle = document.getElementById("hadaf-hayomi-title");

    hadafHayomiTitle.innerText = sefariaCalendar.calendar_items[2].title.he + " - " + sefariaCalendar.calendar_items[2].displayValue.he;
    hadafHayomi.innerHTML = `סדר לימוד לתלמוד הבבלי הכולל לימוד של דף אחד בכל יום. הלומדים בדרך זו מסיימים את קריאת התלמוד כולו בתוך כשבע שנים וחצי. <a href='#'>לקריאה...</a>`;

    hadafHayomiContainer.onclick = () => {
      showChapter(sefariaCalendar.calendar_items[2].url);
    };

    const haftaraContainer = document.getElementById("haftara-container");
    const haftara = document.getElementById("haftara");
    const haftaraTitle = document.getElementById("haftara-title");

    haftaraTitle.innerText = sefariaCalendar.calendar_items[1].title.he + " - " + sefariaCalendar.calendar_items[1].displayValue.he;
    haftara.innerHTML = `קטע קבוע לכל פרשה מספרי הנביאים הנקרא בכל שבת ומועד, ויש לו קשר רעיוני לפרשת השבוע. <a href='#'>לקריאה...</a>`;

    haftaraContainer.onclick = () => {
      showChapter(sefariaCalendar.calendar_items[1].url);
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