import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import OpenPack from './openpack.js'
import Collection from './collection.js';
import CustomCard from "./custom.js";
import Achievement, {checkAchievements} from './achievement.js';


function App() {
  
  const [achievements, setAchievement] = useState(() => 
    JSON.parse(sessionStorage.getItem("achievements")) || {}
  );

  const [totalCards, setTotalCards] = useState(() =>
    JSON.parse(sessionStorage.getItem("totalCards")) || 0
  );

  const [collection, setCollection] = useState(() => 
    JSON.parse(sessionStorage.getItem("collection")) || {
          set1_names: {},
          set2_names: {},
          set3_names: {}, 
          set4_names: {}
      }
    );

  const [customCards, setCustomCards] = useState(() =>
    JSON.parse(sessionStorage.getItem('customCards')) || []
  );

  function updateCollection(newCollection, packSize) {
    setCollection(newCollection);
    sessionStorage.setItem('collection', JSON.stringify(newCollection));

    const newTotal = totalCards + packSize;
    setTotalCards(newTotal);
    sessionStorage.setItem('totalCards', JSON.stringify(newTotal));

    const newAchievements = checkAchievements(newCollection, newTotal, achievements, customCards);
    setAchievement(newAchievements);
    sessionStorage.setItem('achievements', JSON.stringify(newAchievements));
  }

  function onSaveCard(newCard) {
    const updated = [...customCards, newCard];
    setCustomCards(updated);
    sessionStorage.setItem('customCards', JSON.stringify(updated));
    
    const newAchievements = checkAchievements(collection, totalCards, achievements, updated);
    setAchievement(newAchievements);
    sessionStorage.setItem('achievements', JSON.stringify(newAchievements));
  }

  return (
    <Router>
       <Routes>
        <Route path="/" element={
          <div className="page">
            <img src="/pics/logo.png"  alt="logo" style={{ boxShadow: 'none', margin: "0 auto", maxHeight: "100px", padding: "5px"}}/>
            <div className="section">
                <Link to="/openpack">
                <img src="https://www.riffleshuffle.com/cdn/shop/products/as-min_0a9c5129-8b20-45af-9140-1d3416d94c87_960x.png?v=1638564098" alt="packimg"/>
                </Link>
            </div>
            <div className="navbar">
              <button> <Link to="/collection"> <img src="/pics/collection.png" alt="collection" style={{ boxShadow: 'none', maxHeight: "40px"}}/></Link> </button>
              <button> <Link to="/custom"><img src="/pics/custom.png" alt="custom" style={{ boxShadow: 'none', maxHeight: "40px"}}/></Link> </button>
              <button> <Link to="/achievement"><img src="/pics/achievement.png" alt="achievement" style={{ boxShadow: 'none', maxHeight: "40px"}}/></Link></button>
            </div>
          </div> 
          } 
        />
        <Route path="/openpack" element={<OpenPack collection={collection} updateCollection={updateCollection} totalCards={totalCards} customCards={customCards}/>}/>
        <Route path="/collection" element={<Collection collection={collection} customCards={customCards}/>}/>
        <Route path="/custom" element={<CustomCard onSaveCard={onSaveCard}/>} />
        <Route path="/achievement" element={<Achievement achievements={achievements} customCards={customCards}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
