import { useNavigate} from 'react-router-dom';
import { packs } from './openpack.js';
import "./App.css"

const rarityOrder = {
    "common": 0,
    "uncommon": 1,
    "rare": 2,
    "ultra": 3,
    "legendary": 4
}

const Card = ({name, count, rarity}) => {
  return (
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img src={`/pics/${name}.png`} alt={name}/>
          </div>
          <div className="flip-card-back">
            <p>{count}X</p>
            <p>{rarity}</p>
          </div>
        </div>
      </div>
  );
}

function getRarity(set, cardName){
    const card = packs[set].find(c => c.name === cardName);
    return card ? card.rarity : null;
}

function sortByRarity(set, entries){
    return entries.sort((a, b) => {
        const rarityA = getRarity(set, a[0]);
        const rarityB = getRarity(set, b[0]);
        if (rarityOrder[rarityA] !== rarityOrder[rarityB]){
            return rarityOrder[rarityA] - rarityOrder[rarityB];
        }
        return a[0].localeCompare(b[0]);
    })
}

export default function Collection ({ collection }) {
    const navigate = useNavigate();
    
    return (
        <div className="page">
            <button onClick={() => navigate('/')}>O</button>
            <div className="row">
                <h3>electric set</h3>
                <div className="sets">
                  {sortByRarity(1, Object.entries(collection.set1_names)).map(([card,count]) => (
                  <Card key={card} name={card} count={count} rarity={getRarity(1, card)} />
                  ))}
                </div>
            </div>
            <div className="row">
                <h3>water set</h3>
                <div className="sets">
                    {sortByRarity(2, Object.entries(collection.set2_names)).map(([card,count]) => (
                    <Card key={card} name={card} count={count} rarity={getRarity(2, card)} />
                ))}
                </div>
            </div>
            <div className="row">
                <h3>trainer set</h3>
                <div className="sets">
                    {sortByRarity(3, Object.entries(collection.set3_names)).map(([card,count]) => (
                     <Card key={card} name={card} count={count} rarity={getRarity(3, card)} />
                ))}
            </div>
        </div>
    </div>
 );
}