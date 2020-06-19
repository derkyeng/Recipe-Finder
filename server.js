const express = require('express');
const fetch = require('node-fetch');
const app = express();
require('dotenv').config();

app.listen('8888', () => console.log('Server Running'))
app.use(express.static('public'));
app.use(express.json());

//Routes
app.post('/post', (req, res) =>{
    const searchQuery = req.body.userInput;
    console.log(searchQuery);
    findRecipes(searchQuery).then((data) => {
        res.json({
            recipes: data.results
        });
    });
});


async function findRecipes(searchQuery){
    const recipes = await fetch(`https://api.spoonacular.com/recipes/search?query=${searchQuery}&number=100&apiKey=${process.env.API_KEY}`)
    .then(res => res.json().then(data => {return data}));
    return recipes;
}

