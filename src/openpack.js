import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const RevealCard = ({card}) => {
    const [flipped, setFlipped] = useState(false);

    return (
        <div className="cards" onClick={() => setFlipped(true)}>
            {flipped ? (
                <img src={`/pics/${card.name}.png`} key={`${card.name}`} alt={`${card.name} card`}/>
            ) : (
                 <img src={'pics/back.png'} key={`${card.name}`} alt={`${card.name} card`}/>
            )}
        </div>
    )
}     

export const packs ={
            1: [ //100% electric achievement
                {name:"pikachu", rarity:"common"}, 
                {name:"pichu", rarity:"common"}, 
                {name:"raichu", rarity:"uncommon"}, 
                {name:"togedemaru", rarity:"common"},
                {name:"lanturn", rarity:"common"},
                {name:"chinchou", rarity:"common"},
                {name:"mareep", rarity:"rare"},
                {name:"flaaffy", rarity:"ultra"},
                {name:"ampharos", rarity:"ultra"},                
                {name:"plusle", rarity:"common"}, //twin achievement
                {name:"minun", rarity:"ultra"}, 
                {name:"shinx", rarity:"rare"}, 
                {name:"luxio", rarity:"common"},
                {name:"luxray", rarity:"ultra"}, // evol achievement
                {name:"dedenne", rarity:"ultra"},  
                {name:"pachirisu", rarity:"rare"},  //fav pokemon achievement
                {name:"emolga", rarity:"rare"},
                {name:"zekrom", rarity:"legendary"} //achievement
            ],
            2: [
                {name:"squirtle", rarity:"common"}, 
                {name:"maril", rarity:"rare"},
                {name:"buizel", rarity:"common"},
                {name:"piplup", rarity:"common"},
                {name:"oshawott", rarity:"rare"}, 
                {name:"spheal", rarity:"uncommon"}, 
                {name:"vaporeon", rarity:"legendary"}, 
                {name:"wishiwashi", rarity:"ultra"},
                {name:"milotic", rarity:"ultra"}
            ],
            3: [
                {name:"elesa", rarity:"rare"}, 
                {name:"lillie", rarity:"ultra"}, 
                {name:"erika", rarity:"uncommon"}, 
                {name:"n", rarity:"legendary"}, //achievement
                {name:"bianca", rarity:"common"}, 
                {name:"pokecenter lady", rarity:"common"}, 
                {name:"hex maniac", rarity:"common"}, 
                {name:"shauna", rarity:"uncommon"}, 
                {name:"mallow & lana", rarity:"rare"}, //achievement
                {name:"acerola", rarity:"rare"}, 
                {name:"marnie", rarity:"uncommon"}, 
                {name:"irida", rarity:"uncommon"}, 
                {name:"iono", rarity:"ultra"}
            ]
};

export default function OpenPack({collection, updateCollection}) {
    const navigate = useNavigate();

    const rarityChances = [
        {type: "common", chance: 0.45},
        {type: "uncommon", chance: 0.3},
        {type: "rare", chance: 0.15},
        {type: "ultra", chance: 0.08},
        {type: "legendary", chance: 0.02}
    ]

    const images = {
        1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmkEl7rrrLrXcWdLB8oIqnQyzJIFHfIF5VO-e7672fr-4JcQW0VltWf68_maOieG3s8Jw&usqp=CAU",
        2: "https://i.pinimg.com/474x/ec/11/bc/ec11bc23bd980c7ca440a8bf06f1ff44.jpg",
        3: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRunqsLfgHdc5jnA4mwKRknH_TwdPE_Ng2h0A&s"
    };

    const [step, setStep] = useState("chooseSet");
    const [set, setSet] = useState(null);
    const [packCards, setPackCards] = useState([]);

    function handleSetClick(setNumber) {
        setStep("choosePack");
        setSet(setNumber);
    }

    //choose a rarity, pick a card from the set with that rarity
    function getCardWRarity(set){
        const rand = Math.random();
        let portion = 0;
        for (const rarityNames of rarityChances) {
            portion += rarityNames.chance;
            if (rand <= portion) {
                //filter out all the cards in the set that match the rarity
                const possibleCards = packs[set].filter(card => card.rarity === rarityNames.type);
                //pick a random one from the filtered list
                return possibleCards[Math.floor(Math.random() * possibleCards.length)];
            }
        }
    }
    
    function handlePackClick() {
        setStep("revealCards");
        
        const selected = [];
        //generate 5 random cards
        for (let i = 0; i < 5; i++){
            selected.push(getCardWRarity(set));
        }
        setPackCards(selected);
       
        const newCollection = {...collection};
        //add new cards
        const setKey = `set${set}_names`;
        selected.forEach(card => {
            newCollection[setKey] = {...newCollection[setKey]};
            newCollection[setKey][card.name] = (newCollection[setKey][card.name] || 0) + 1;
        });
        
        updateCollection(newCollection, 5);
    }
    
    return (
    <div className="page">
        {step === "chooseSet" && (
				<div>
					<h2>Choose a set</h2>
					<div className="packs" id="choosecards">
							<div id="set1" className="set" onClick={() => handleSetClick(1)}>
									electric set
									<img src={images[1]} alt="electric set"/>
							</div>
							<div id="set2" className="set" onClick={() => handleSetClick(2)}>
									water set
									<img src={images[2]} alt="water set"/>
							</div>
							<div id="set3" className="set" onClick={() => handleSetClick(3)}>
									trainer set
									<img src={images[3]} alt="trainer set"/>
							</div>
					</div>
				</div>
        )}

    {step === "choosePack" && (
			<div>
				<h2>[set {set}] pick a pack</h2>
				<div className='packs'>
					{[1,2,3,4,5].map(i => (
						<div className="set" key={i} onClick={() => handlePackClick()}>pack {i}
						<img src={images[set]} alt={`pack ${i}`}/>
					</div>
					))}
				</div>
			</div>
      )}
	
    {step === "revealCards" && (

        <div>
       <div className="lineup">
            {packCards.map(card => (
                <RevealCard key={card.name} card={card}/>
            ))}
        </div>
         <button onClick={() => navigate('/')}>Next</button>
         </div>
    )}
    
    </div>
    )
}