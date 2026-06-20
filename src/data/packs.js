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
        ],
        4: []
};

export const rarityChances = [
        {type: "common", chance: 0.45},
        {type: "uncommon", chance: 0.3},
        {type: "rare", chance: 0.15},
        {type: "ultra", chance: 0.08},
        {type: "legendary", chance: 0.02}
]

export const images = {
        1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmkEl7rrrLrXcWdLB8oIqnQyzJIFHfIF5VO-e7672fr-4JcQW0VltWf68_maOieG3s8Jw&usqp=CAU",
        2: "https://i.pinimg.com/474x/ec/11/bc/ec11bc23bd980c7ca440a8bf06f1ff44.jpg",
        3: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRunqsLfgHdc5jnA4mwKRknH_TwdPE_Ng2h0A&s"
};

export const packNames = [
    { id: 1, name: "electric", img: images[1] },
    { id: 2, name: "water", img: images[2] },
    { id: 3, name: "trainer", img: images[3] },
];