import "./BasicHomeCard.css"

type BasicHomeCardProp = {
    title: string,
    text: string,
    imgUrl?: string
};

export function BasicHomeCard({title, text, imgUrl}: BasicHomeCardProp) {
    return (
        <>
            <div className="home-container">
                {imgUrl && <img src={imgUrl}/>}
                    <h2 className="title">{title}</h2>
                    <p className="text">
                        {text}
                        <a href="#">לקריאה...</a>
                    </p>
            </div>
        </>
    );
}