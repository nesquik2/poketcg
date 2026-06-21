import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { ChoosePack } from './component/choosePack';
import CircularGallery from './component/CircularGallery.js'

import { packs, rarityChances, images, packNames } from './data/packs.js';
import "./styles/OpenPack.css"

// each individual card reveal animation
const RevealCard = ({card, onDismiss}) => {
    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setFlipped(true), 600);
        return () => clearTimeout(timer);
    }, []);


    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
        <motion.div
            initial={{ x: '100vw' }}
            animate={{ x: 0 }}
            exit={{ x: '-100vw' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{ perspective: 1000, cursor: flipped ? 'pointer' : 'default' }}
            onClick={() => flipped && onDismiss()}
        >
            <motion.div
                style={{ position: 'relative', width: '200px', height: '350px', transformStyle: 'preserve-3d' }}
                animate={{ rotateY: flipped ? -180 : 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.6 }}
            >
                {/* front */}
                <motion.div style={{
                    position: 'absolute', width: '100%', height: '100%',
                    backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden'
                }}>
                    <img src="/pics/back.png" alt="card back" style={{ width: '100%', height: '100%', borderRadius: '10px', maxWidth:'none'}}/>
                </motion.div>

                {/* back */}
                <motion.div style={{
                    position: 'absolute', width: '100%', height: '100%',
                    backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
                    rotateY: '180deg'
                }}>
                        <img src={card.image ? card.image : `/pics/${card.name}.png`} alt={card.name} style={{ width: '100%', height: '100%', borderRadius: '10px', maxWidth: 'none' }}/>
                </motion.div>
            </motion.div>
        </motion.div>
        </div>
    );
}


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



export default function OpenPack({collection, updateCollection, totalCards, customCards}) {
    const navigate = useNavigate();

    const [step, setStep] = useState("chooseSet");
    const [set, setSet] = useState(null);
    const [packCards, setPackCards] = useState([]);

   const activePacks = {
        ...packs, 
        ...(customCards.length > 0 ? {4: customCards } : {})
   };

   const allPackNames =[
        ...packNames,
        ...(customCards.length > 0 ? [{ id: 4, name: "custom", img: customCards[0].image }] : [])
   ]
   
    const [[activeIndex, direction], setActiveIndex] = useState([0, 0]);

    const indexInArrayScope =
        ((activeIndex % allPackNames.length) + allPackNames.length) % allPackNames.length;

    const visibleItems = [...allPackNames, ...allPackNames].slice(
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
                const possibleCards = activePacks[set].filter(card => card.rarity === rarityNames.type);
                if (possibleCards.length === 0) continue;
                //pick a random one from the filtered list
                return possibleCards[Math.floor(Math.random() * possibleCards.length)];
            }
        }
        
        const allCards = activePacks[set];
        return allCards[Math.floor(Math.random() * allCards.length)];
    }
    
    return (
    <div className="page">
        {step === "chooseSet" && (
				<div>
                   <h2>choose a set</h2>
                   <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        <div className="carousel">
                            <AnimatePresence mode="popLayout" initial={false}>
                            {visibleItems.map((item) => {
                                // the layout prop makes the elements change its position as soon as a new one is added
                                // the key tells framer-motion that the elements changed its position
                                return (
                                <motion.div className="set" key={item.id}
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
                    </motion.div>
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
            <div style={{overflow:'hidden', height:'430px'}}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px'}}>
                    <AnimatePresence mode="wait">
                    <RevealCard
                        key={currentCard}
                        card={packCards[currentCard]}
                        onDismiss={() => setCurrentCard(currentCard + 1)}
                    />
                    </AnimatePresence>
                </div>
            </div>
     ) : (
            
            <div style={{width:'100%', height:'400px'}}>
                    <CircularGallery
                    items={packCards.map(card => ({
                        image: card.image ? card.image : `/pics/${card.name}.png`,
                        text: card.name
                    }))}
                    bend={1}
                    textColor="#00bfff"
                    borderRadius={0.05}
                    scrollEase={0.05}
                    scrollSpeed={2}
                    font='700 20px Nunito Sans'
                    fontUrl="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap"
                    />
             <button onClick={() => navigate('/')}>next</button>
            </div>
    )
    )}
    </div>
    )}

