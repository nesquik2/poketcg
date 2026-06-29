import { useNavigate } from 'react-router-dom';
import { packs } from './data/packs.js';
import "./styles/Achievement.css"

const achievementData = [
    {id: "10cards", name: "collector", description:"collect 10 cards! duplicates included"}, 
    {id: "50cards", name: "obsessed", description:"collect 50 cards! duplicates included"},
    {id: "100cards", name: "master clicker", description:"collect 100 cards! duplicates included"}, 
    {id: "all_legendaries", name: "mega lucky", description:"collect all legendary cards from all sets"}, 
    {id: "favorite_card", name: "special buddy", description:"collect vanessa's favorite card..."},
    {id: "completeset", name: "catch 'em all", description:"collect ALL cards from all sets"}, 
    {id: "complete1", name: "electified", description:"collect all cards from electric set"}, 
    {id: "complete2", name: "drowning in cuteness", description:"collect all cards from water set"}, 
    {id: "complete3", name:"social butterfly", description:"collect all cards from trainer set"}, 
    {id: "firstcustom", name: "gifted artist", description:"make your first custom card design"}, 
]

//return a list
export function checkAchievements(collection, numCards, achievements, customCards){
    const newAchievements = {...achievements};

    newAchievements["10cards"] = numCards >= 10;
    newAchievements["50cards"] = numCards >= 50;
    newAchievements["100cards"] = numCards >= 100;
    newAchievements[ "all_legendaries"] = (
            collection.set1_names["zekrom"] > 0
            && collection.set2_names["vaporeon"] > 0
            && collection.set3_names["n"] > 0
        );
    newAchievements["favorite_card"] = collection.set1_names["pachirisu"] > 0;
    newAchievements["complete1"] = isSetComplete(collection, 1, achievements["complete1"]);
    newAchievements["complete2"] = isSetComplete(collection, 2, achievements["complete2"]);
    newAchievements["complete3"] = isSetComplete(collection, 3, achievements["complete3"]);
    newAchievements["completeset"] = newAchievements["complete1"] && newAchievements["complete2"] && newAchievements["complete3"];
    newAchievements["firstcustom"] = customCards.length > 0;
    return newAchievements;
}

function isSetComplete(collection, setNumber, current) {
    if (current) return true;
    const setKey = `set${setNumber}_names`;
    return packs[setNumber].every(card => collection[setKey][card.name] > 0);
}

export default function Achievement ({achievements}) {
    const navigate = useNavigate();

    return (
        <div className="badge-page">
            <button onClick={() => navigate('/')}><img src="pics://home.png" alt="home" style={{ boxShadow: 'none', maxHeight: "40px"}}/></button>
            <h3 style={{fontSize: '20px', color:'#bf4068', margin: '5px'}}>badges ☆</h3>
            <div className="badge-grid">
                {achievementData.map((achievement) => (
                    <div className="badge" key={achievement.id}>
                        <img 
                            src={`pics://${achievement.id}.png`} 
                            alt={achievement.id} 
                            style={{ filter: achievements?.[achievement.id] ? 'none' : 'grayscale(100%)' }}
                        />
                        <h3>{achievements?.[achievement.id] ? achievement.name : '?????'}</h3>
                        <p>{achievement.description}</p>
                    </div>
                    ))}
            </div>
        </div>
    );

}
