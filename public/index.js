const search = document.querySelector('.userSearch');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.grid-container')


searchBtn.addEventListener('click', () =>{
    getData(search.value).then((data) =>{
        console.log(data.recipes);
        createElement(data);
    });
})

async function getData(input){
    const data = {'userInput': input};
    options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('/post', options);
    const json = await response.json();
    return json;
}

function createElement(recipeList){
    while (recipeContainer.firstChild) {
        recipeContainer.removeChild(recipeContainer.lastChild);
    }
    for (i = 0; recipeList.recipes.length; i++){
        const grid = document.createElement('div');
        grid.className = 'grid-item';
        const gridImg = document.createElement('div');
        grid.className = 'grid-img';
        const image = document.createElement('img');
        image.src = `https://spoonacular.com/recipeImages/${recipeList.recipes[i].id}-556x370.jpg`;
        const gridText = document.createElement('h3');
        const gridUrl = document.createElement('a');
        const gridTime = document.createElement('p');

        gridText.textContent = recipeList.recipes[i].title;
        gridUrl.textContent = recipeList.recipes[i].sourceUrl;
        gridUrl.href = recipeList.recipes[i].sourceUrl;
        gridTime.textContent = "Ready in " + recipeList.recipes[i].readyInMinutes + ' Min';
        
        gridImg.appendChild(image);
        grid.appendChild(gridImg);
        grid.appendChild(gridText);
        grid.appendChild(gridUrl);
        grid.appendChild(gridTime);
        recipeContainer.appendChild(grid);
    }
}