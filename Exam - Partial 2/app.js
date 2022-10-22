const { on } = require('events');
const express = require('express');
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(express.static("public"));

app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

const https = require("https");

var pokemon;
var poke_id;
var type_color= {"bug": "#4a7834",
                 "dark": "#453d35",
                 "dragon": "#835ac7",
                 "electric": "#d6cf00",
                 "fairy": "#ff8ce6",
                 "fighting": "#c4081e",
                 "fire": "#ff8605",
                 "flying": "#b5a8e0",
                 "ghost": "#4f19a6",
                 "grass": "#3af022",
                 "ground": "#ccb73f",
                 "ice": "#7de3de",
                 "normal": "#827e6c",
                 "poison": "#a15bb5",
                 "psychic": "#ff54cf",
                 "rock": "#756526",
                 "steel": "#8d9c9e",
                 "water": "#4faad1"}
var link;

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/poke", (req, res) => {
    pokemon = req.body.searchbar.toLowerCase(); 
    link = "https://pokeapi.co/api/v2/pokemon/" + pokemon;
    res.redirect(307, "/pokemon");
});

app.post("/next", (req, res) => {
    poke_id++;
    if(poke_id > 904){
        poke_id = 1;
    }
    link = "https://pokeapi.co/api/v2/pokemon/" + poke_id;
    res.redirect(307, "/pokemon");
});

app.post("/prev", (req, res) => {
    poke_id--;
    if(poke_id < 1){
        poke_id = 904;
    }
    link = "https://pokeapi.co/api/v2/pokemon/" + poke_id;
    res.redirect(307, "/pokemon");
});

app.post("/fire", (req, res) => {
    let f_starters= ["torchic","scorbunny","litten","cyndaquil","charmander","chimchar","fennekin","tepig"]
    let starter_id = Math.floor(Math.random()*8);
    link = "https://pokeapi.co/api/v2/pokemon/" + f_starters[starter_id];
    res.redirect(307, "/pokemon");
});

app.post("/water", (req, res) => {
    let w_starters= ["mudkip","froakie","piplup","squirtle","popplio","totodile","oshawott","sobble"]
    let starter_id = Math.floor(Math.random()*8);
    link = "https://pokeapi.co/api/v2/pokemon/" + w_starters[starter_id];
    res.redirect(307, "/pokemon");
});

app.post("/grass", (req, res) => {
    let g_starters= ["rowlet","bulbasaur","turtwig","grookey","chikorita","treecko","snivy","chespin"]
    let starter_id = Math.floor(Math.random()*8);
    link = "https://pokeapi.co/api/v2/pokemon/" + g_starters[starter_id];
    res.redirect(307, "/pokemon");
});

app.post("/pokemon", (req, res) =>{
    https.get(link, function(response){
        let result = '';
        response.on("data", (data) =>{
            result += data;
        }).on('end', () => {
            if(result != "Not Found"){
                const poke_info = JSON.parse(result);
                var types = [];
                var moves = [];
                var abilities = [];

                poke_info["types"].forEach(element => {
                    types.push(element["type"]["name"]);
                });

                poke_info["moves"].forEach(element => {
                    moves.push(element["move"]["name"]);
                });

                poke_info["abilities"].forEach(element => {
                    abilities.push(element["ability"]["name"]);
                });

                var xp_100 = poke_info["base_experience"]*100/635;

                res.render("poke.ejs", {img_url:poke_info["sprites"]["front_default"],
                                        name:poke_info["name"].toUpperCase(),
                                        base_xp:poke_info["base_experience"],
                                        xp_100: xp_100,
                                        types: types,
                                        type_color: type_color,
                                        moves: moves,
                                        abilities: abilities,
                                        weight:poke_info["weight"]/10,
                                        height:poke_info["height"]/10});
                poke_id = poke_info["id"];
                pokemon = poke_info["name"];
            }
            else{
                res.render("error.ejs");
            }
        });
    })
});

app.listen(3000, (err) =>{
    console.log("listening on  port 3000");
});
