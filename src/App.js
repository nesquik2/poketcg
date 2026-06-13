import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Collection from './collection.js';
import OpenPack from "./openpack.js";
import { checkAchievements } from './achievement.js';


function App() {
  
  const [achievements, setAchievement] = useState(() => 
    JSON.parse(sessionStorage.getItem("achievements"))
  );

  const [totalCards, setTotalCards] = useState(() =>
    JSON.parse(sessionStorage.getItem("totalCards")) || 0
  );

  const [collection, setCollection] = useState(() => 
    JSON.parse(sessionStorage.getItem("collection")) || {
          set1_names: {},
          set2_names: {},
          set3_names: {}
      }
    );
  
  function updateCollection(newCollection, packSize) {
    setCollection(newCollection);
    sessionStorage.setItem('collection', JSON.stringify(newCollection));

    const newTotal = totalCards + packSize;
    setTotalCards(newTotal);
    sessionStorage.setItem('totalCards', JSON.stringify(newTotal));

    const newAchievements = checkAchievements(newCollection, newTotal, achievements);
    setAchievement(newAchievements);
    sessionStorage.setItem('achievements', JSON.stringify(newAchievements));
  }

  return (
    <Router>
       <Routes>
        <Route path="/" element={
          <div className="page">
            <h2>poketcg</h2>
            <div className="section">
                <Link to="/openpack">
                open a pack
                <img src="https://www.riffleshuffle.com/cdn/shop/products/as-min_0a9c5129-8b20-45af-9140-1d3416d94c87_960x.png?v=1638564098" alt="packimg"/>
                </Link>
            </div>
            <div className="navbar">
              <button> <Link to="/collection"> C</Link> </button>
              <button> <Link to="/collection"> F</Link> </button>
              <button> <Link to="/achievement">A</Link></button>
            </div>
          </div> 
          } 
        />
        <Route path="/collection" element={<Collection collection={collection}/>}/>
        <Route path="/openpack" element={<OpenPack collection={collection} updateCollection={updateCollection} totalCards={totalCards}/>} />
      </Routes>
    </Router>
  );
}

export default App;
