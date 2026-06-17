import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { ChoosePack } from './component/choosePack';

// each individual card reveal animation
const RevealCard = ({card, onDismiss}) => {
    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setFlipped(true), 600);
        return () => clearTimeout(timer);
    }, []);


    return (
        <motion.div
            initial={{ x: '100vw' }}
            animate={{ x: 0 }}
            exit={{ x: '-100vw' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{ perspective: 1000, cursor: flipped ? 'pointer' : 'default' }}
            onClick={() => flipped && onDismiss()}
        >
            <motion.div
                style={{ position: 'relative', width: '150px', height: '210px', transformStyle: 'preserve-3d' }}
                animate={{ rotateY: flipped ? -180 : 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.6 }}
            >
                {/* front */}
                <motion.div style={{
                    position: 'absolute', width: '100%', height: '100%',
                    backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden'
                }}>
                    <img src="/pics/back.png" alt="card back" style={{ width: '100%', height: '100%', borderRadius: '10px' }}/>
                </motion.div>

                {/* back */}
                <motion.div style={{
                    position: 'absolute', width: '100%', height: '100%',
                    backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
                    rotateY: '180deg'
                }}>
                        <img src={`/pics/${card.name}.png`} alt={card.name} style={{ width: '100%', height: '100%', borderRadius: '10px' }}/>
                </motion.div>
            </motion.div>
        </motion.div>
    );
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

const packNames = [
    { id: 1, name: "electric", img: images[1] },
    { id: 2, name: "water", img: images[2] },
    { id: 3, name: "trainer", img: images[3] },
];

// for the 'carousel'
const zIndex = {
  left: 1,
  center: 2,
  right: 1,
};

const variants = {
  enter: ({ direction }) => {
    return { scale: 0.2, x: direction < 1 ? 50 : -50, opacity: 0 };
  },
  center: ({ position }) => {
    return {
      scale: position() === 'center' ? 1 : 0.7,
      x: 0,
      zIndex: zIndex[position()],
      opacity: 1,
    };
  },
  exit: ({ direction }) => {
    return { scale: 0.2, x: direction < 1 ? -50 : 50, opacity: 0 };
  },
};



export default function OpenPack({collection, updateCollection}) {
    const navigate = useNavigate();

    const [step, setStep] = useState("chooseSet");
    const [set, setSet] = useState(null);
    const [packCards, setPackCards] = useState([]);

    const [[activeIndex, direction], setActiveIndex] = useState([0, 0]);

    const indexInArrayScope =
        ((activeIndex % packNames.length) + packNames.length) % packNames.length;

    const visibleItems = [...packNames, ...packNames].slice(
        indexInArrayScope,
        indexInArrayScope + 3
    );
    const handleClick = newDirection => {
        setActiveIndex(prevIndex => [prevIndex[0] + newDirection, newDirection]);
    };

    const [currentCard, setCurrentCard] = useState(0);

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
    
    return (
    <div className="page">
        {step === "chooseSet" && (
				<div>
                    <h2>Choose a set</h2>
                    <div className="carousel">
                        <AnimatePresence mode="popLayout" initial={false}>
                        {visibleItems.map((item) => {
                            // the layout prop makes the elements change its position as soon as a new one is added
                            // the key tells framer-motion that the elements changed its position
                            return (
                            <motion.div className="set" key={item}
                                layout
                                custom={{ direction, position: () => {
                                    if (item === visibleItems[0]) {
                                    return 'left';
                                    } else if (item === visibleItems[1]) {
                                    return 'center';
                                    } else {
                                    return 'right';
                                    }
                                },
                                }}  
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 1 }}
                                onClick={item === visibleItems[1] ? () => handleSetClick(item.id) : null}      
                            >    
                                <img src={item.img} alt={item.name}/>
                                {item.name}
                            </motion.div>
                            );
                        })}
                        </AnimatePresence>
                    </div>
                    <div className="setbuttons">
                        <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => handleClick(-1)}
                        >
                        ◀︎
                        </motion.button>
                        <motion.button whileTap={{ scale: 0.8 }} onClick={() => handleClick(1)}>
                        ▶︎
                        </motion.button>
                    </div>
                </div>
        )}

    {step === "choosePack" && (
			<div>
				<div className='packs'>
					{step === "choosePack" && (
                        <ChoosePack 
                            set={set} 
                            images={images} 
                            onOpen={() => {
                                setStep("revealCards");
                                const selected = [];
                                for (let i = 0; i < 5; i++){
                                    selected.push(getCardWRarity(set));
                                }
                                setPackCards(selected);
                                const newCollection = {...collection};
                                const setKey = `set${set}_names`;
                                selected.forEach(card => {
                                    newCollection[setKey] = {...newCollection[setKey]};
                                    newCollection[setKey][card.name] = (newCollection[setKey][card.name] || 0) + 1;
                                });
                                updateCollection(newCollection, 5);
                                setCurrentCard(0);
                            }}
                        />
                    )}
				</div>
			</div>
      )}
	
    {step === "revealCards" && (
        currentCard < packCards.length ? (
            <div>
                <AnimatePresence mode="wait">
                <RevealCard
                    key={currentCard}
                    card={packCards[currentCard]}
                    onDismiss={() => setCurrentCard(currentCard + 1)}
                />
                </AnimatePresence>
            </div>
     ) : (
        <div>
            <div className="lineup">
                {packCards.map(card => (
                    <div className="cards" key={card.name}>
                        <img src={`/pics/${card.name}.png`} alt={card.name}/>
                    </div>
                ))}
            </div>
            <button onClick={() => navigate('/')}>Next</button>
        </div>
    )
    )}
    </div>
    )}

