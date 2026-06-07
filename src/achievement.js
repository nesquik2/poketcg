import { Link } from 'react-router-dom';
import "./App.css"
import { packs } from "./openpack";

const achievements = {
    "50cards": false,  // 1
    "100cards": false, // 2
    "250cards": false, // 3
    "all_legendaries": false, // 4
    "favorite_card": false, // 5
    "completeset": false,  // 6
    "complete1": false,  // 7
    "complete2": false,  // 8
    "complete3": false,  // 9
}

//return a list
export function checkAchievements(collection, numCards, achievements){
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
    newAchievements["complete1"] = isSetComplete(collection, 1);
    newAchievements["complete2"] = isSetComplete(collection, 2);
    newAchievements["complete3"] = isSetComplete(collection, 3);
        
    return newAchievements;
}

function isSetComplete(collection, setNumber, current) {
    if (current) return true;
    const setKey = `set${setNumber}_names`;
    return packs[setNumber].every(card => collection[setKey][card.name] > 0);
}
