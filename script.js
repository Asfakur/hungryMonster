//this function will search the food 
function searchFood() {

    const foodIngredientDiv = document.getElementById('food-details');
    foodIngredientDiv.innerHTML = ``;

    const searchTag = document.getElementById('input-field').value;
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTag}`;

    fetch(url)
        .then(res => res.json())
        // .then(data => console.log(data));
        .then(data => displayFoods(data));
}
//the resulting food will be displayed  by this function
function displayFoods(foods) {

    const foodContainer = document.getElementById('food-container');
    foodContainer.innerHTML = "";
    const divNoresult = document.getElementById('notFound');
    divNoresult.style.display = 'none';
    if (foods.meals === null) {
        divNoresult.style.display = 'block';
        return undefined;
    }
    else {
        const foodItems = foods.meals;
        for (let i = 0; i < foodItems.length; i++) {

            let foodItem = foodItems[i];
            const foodDiv = document.createElement('div');
            foodDiv.className = 'food';

            foodDiv.innerHTML = `
            <img width="350" src="${foodItem.strMealThumb}">
            <h3>${foodItem.strMeal}</h3>
        `;
            //add event to the selected div
            foodDiv.addEventListener('click', function (event) {
                const foodName = foodItem.strMeal;
                ingredentFinder(foodName);
            });
            foodContainer.appendChild(foodDiv);
        }
    }
}
//show food ingredents of the food
function ingredentFinder(foodName) {
    const foodUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;
    fetch(foodUrl)
        .then(res => res.json())
        .then(data => displayData(data));

    function displayData(food) {

        const foodItem = food.meals[0];
        const foodIngredientDiv = document.getElementById('food-details');

        foodIngredientDiv.innerHTML = `
        <img width="400" src="${foodItem.strMealThumb}">
        <h1>${foodItem.strMeal}</h1>
        <h3>Ingredients</h3>
    `;
        const ingredentLists = document.createElement('ul');
        foodIngredientDiv.appendChild(ingredentLists);

        const foodPropertys = Object.values(foodItem); //converting foodProperty object to an array of poperty
        let foodIngredient;
        for (let i = 9; i < 21; i++) {
            foodIngredient = foodPropertys[i];
            if (foodIngredient === "" || foodIngredient === null) {
                break;
            }
            const everyIngredent = document.createElement('li');
            everyIngredent.innerText = foodIngredient;
            ingredentLists.appendChild(everyIngredent);
        }
    }
}




