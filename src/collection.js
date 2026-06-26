import { useNavigate} from 'react-router-dom';
import { useState } from 'react';
import TiltedCard from './component/TiltedCard';

import { packs } from './data/packs.js';
import "./styles/Collection.css"

const rarityOrder = {
    "common": 0,
    "uncommon": 1,
    "rare": 2,
    "ultra": 3,
    "legendary": 4
}

const Card = ({name, count, rarity, image, onClick}) => {
  return (
      <div className="flip-card" onClick={onClick}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img src={image ? image : `/pics/${name}.png`} alt={name}/>
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

export default function Collection ({ collection, customCards }) {
    const navigate = useNavigate();
    const [selectedCard, setSelectedCard] = useState(null);
    
    //close-up view page for a specific card
    if (selectedCard) {
        return (
            <div className="zoom-in-page">
                <button onClick={() => setSelectedCard(null)}><img src="/pics/collection.png" alt="collection" style={{ boxShadow: 'none', maxHeight: "40px"}}/></button>
                <TiltedCard
                imageSrc={selectedCard.image ? selectedCard.image : `/pics/${selectedCard.name}.png`}
                containerHeight="300px"
                containerWidth="300px"
                imageHeight="300px"
                imageWidth="300px"
                rotateAmplitude={12}
                scaleOnHover={1.05}
                showMobileWarning={false}
                showTooltip
                displayOverlayContent
                overlayContent={<img src={`/pics/${selectedCard.rarity}.png`} alt={selectedCard.rarity} style={{ boxShadow: 'none', borderRadius: '0', maxHeight: '150px' }}/>}
                />
            </div>
        )
    }
        
    return (
        <div className="collection-page">
            <button onClick={() => navigate('/')}><img src="/pics/home.png" alt="home" style={{ boxShadow: 'none', maxHeight: "40px"}}/></button>
            <div className="row">
                <h3 style={{ color: '#e6de50' , margin: '5px'}}>electric set</h3>
                <div className="sets">
                  {sortByRarity(1, Object.entries(collection.set1_names)).map(([card,count]) => (
                  <Card key={card} name={card} count={count} rarity={getRarity(1, card)}
                    onClick={()=> setSelectedCard({ name: card, count, rarity: getRarity(1,card)})} />
                  ))}
                </div>
            </div>
            <div className="row">
                <h3 style={{ color: '#6099df' }}>water set</h3>
                <div className="sets">
                    {sortByRarity(2, Object.entries(collection.set2_names)).map(([card,count]) => (
                    <Card key={card} name={card} count={count} rarity={getRarity(2, card)}                     
                    onClick={()=> setSelectedCard({ name: card, count, rarity: getRarity(2,card)})} />

                ))}
                </div>
            </div>
            <div className="row">
                <h3 style={{ color: '#ea9ab2' }}>trainer set</h3>
                <div className="sets">
                    {sortByRarity(3, Object.entries(collection.set3_names)).map(([card,count]) => (
                     <Card key={card} name={card} count={count} rarity={getRarity(3, card)} 
                    onClick={()=> setSelectedCard({ name: card, count, rarity: getRarity(3,card)})} />

                ))}
            </div>
            <div className="row">
                <h3 style={{ color: '#71b63d' }}>custom set</h3>
                <div className="sets">
                   {Object.entries(collection.set4_names).map(([card, count]) => {
                        const customCard = customCards.find(c => c.name === card);
                        return (
                            <Card key={card} name={card} count={count} 
                                rarity={customCard?.rarity}
                                image={customCard?.image}
                                onClick={() => setSelectedCard({ name: card, count, rarity: customCard?.rarity, image: customCard?.image })}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    </div>
 );
}