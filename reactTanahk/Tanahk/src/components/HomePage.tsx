import "./HomePage.css"
import parashatHashavua from "../assets/img/parashatHashavua.jpg"
import { useEffect, useState } from "react";
import { baseUrl } from "../utils/utils";
import { HomeTopNav } from "./HomeTopNav";
import { BasicHomeCard } from "./BasicHomeCard";

async function getCalendarDate() {
  const now = new Date();
  const response = await fetch(
    `https://www.hebcal.com/converter?cfg=json&gy=${now.getFullYear()}&gm=${
      now.getMonth() + 1
    }&gd=${now.getDate()}&g2h=1`
  );
  return response.json();
}

async function getCalendarSefaria() {
  const response = await fetch(`${baseUrl}/calendars`);
  return response.json();
}

const greetByTime = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) return "בוקר טוב";
  if (hour >= 12 && hour < 18) return "צהריים טובים";
  return "ערב טוב";
};

export function HomePage() {
    const [hebrewDate, setHebrewDate] = useState("");
    const [greeting, setGreeting] = useState("");
    const [sefariaCalendar, setSefariaCalendar] = useState(null);

    useEffect(() => {
        const initHome = async () => {
        const calendar = await getCalendarSefaria();
        setSefariaCalendar(calendar);
        setGreeting(greetByTime());

        const dateData = await getCalendarDate();
        setHebrewDate(dateData.hebrew);
        };

        initHome();
    }, []);

    if (!sefariaCalendar) return null;

    const parasha = sefariaCalendar.calendar_items[0];
    const haftara = sefariaCalendar.calendar_items[1];
    const dafYomi = sefariaCalendar.calendar_items[3];
    
    return (
        <>
            <div className="home" id="home">
                <HomeTopNav />
                <div className="greeting-container">
                    <h3 id="greeting" className="greeting">{greeting}</h3>
                    <h3 id="hebrewDateContainer" className="hebrew-date-container">{hebrewDate}</h3>
                </div>
                <BasicHomeCard imgUrl={parashatHashavua} title={parasha.title.he +  " - " + parasha.displayValue.he} text={parasha.description.he} />
                <BasicHomeCard title={haftara.title.he +  " - " + haftara.displayValue.he} text={"קטע קבוע לכל פרשה מספרי הנביאים הנקרא בכל שבת ומועד, ויש לו קשר רעיוני לפרשת השבוע. "} />
                <BasicHomeCard title={dafYomi.title.he +  " - " + dafYomi.displayValue.he} text={"סדר לימוד לתלמוד הבבלי הכולל לימוד של דף אחד בכל יום. הלומדים בדרך זו מסיימים את קריאת התלמוד כולו בתוך כשבע שנים וחצי."} />

                <p className="credits">Using an API from <a href="https://www.sefaria.org" target="_blank">Sefaria</a></p>
            </div>
        </>
    );
}