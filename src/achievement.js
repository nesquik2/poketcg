import { useNavigate } from 'react-router-dom';
import { packs } from './data/packs.js';
import "./styles/Achievement.css"

const achievementData = [
    {id: "50cards", name: "collector", description:"collect 50 cards! duplicates included"},  // 1
    {id: "100cards", name: "obsessed", description:"collect 100 cards! duplicates included"}, // 2
    {id: "250cards", name: "master clicker", description:"collect 250 cards! duplicates included"}, // 3
    {id: "all_legendaries", name: "mega lucky", description:"collect all legendary cards from all sets"}, // 4
    {id: "favorite_card", name: "special buddy", description:"collect vanessa's favorite card..."}, // 5
    {id: "completeset", name: "catch 'em all", description:"collect ALL cards from all sets"},  // 6
    {id: "complete1", name: "electified", description:"collect all cards from electric set"},  // 7
    {id: "complete2", name: "drowning in cuteness", description:"collect all cards from water set"},  // 8
    {id: "complete3", name:"social butterfly", description:"collect all cards from trainer set"},  // 9
    {id: "firstcustom", name: "gifted artist", description:"make your first custom card design"}, // 10
]

//return a list
export function checkAchievements(collection, numCards, achievements, customCards){
    const newAchievements = {...achievements};

    newAchievements["50cards"] = numCards >= 50;
    newAchievements["100cards"] = numCards >= 100;
    newAchievements["250cards"] = numCards >= 250;
    newAchievements[ "all_legendaries"] = (
            collection.set1_names["zekrom"] > 0
            && collection.set2_names["vaporeon"] > 0
            && collection.set3_names["n"] > 0
        );
    newAchievements["favorite_card"] = collection.set1_names["pachirisu"] > 0;
    newAchievements["complete1"] = isSetComplete(collection, 1, achievements["complete1"]);
    newAchievements["complete2"] = isSetComplete(collection, 2, achievements["complete2"]);
    newAchievements["complete3"] = isSetComplete(collection, 3, achievements["complete3"]);
    newAchievements["first_custom"] = customCards.length > 0;
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
            <button onClick={() => navigate('/')}><img src="/pics/home.png" alt="home" style={{ boxShadow: 'none', maxHeight: "30px"}}/></button>
            <h3>badges</h3>
            <div className="badge-grid">
                {achievementData.map((achievement) => (
                    <div className="badge" key={achievement.id}>
                        <img 
                            src={`/pics/${achievement.id}.png`} 
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
