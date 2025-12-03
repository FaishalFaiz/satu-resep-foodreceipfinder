const ListRecipe = document.getElementById("recipe-list");
const InputSearch = document.getElementById("input-search");
const StatusText = document.getElementById("status-text");
let InputValue = "";
StatusText.innerText = "";


InputSearch.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        InputValue = InputSearch.value.trim();
        console.log("User mengetik:", InputValue);
        fetchData(InputValue);
    }
});

async function fetchData(input) {
    try {
        ListRecipe.innerHTML = "";
        StatusText.innerText = "Mencari resep ...";

        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`);

        if (!response.data.meals) {
            StatusText.innerText = `Maaf kami gak punya resep "${InputValue}" :(`;
            return;
        }

        const recipeData = response.data.meals.slice(0, 5);
        console.log("Recipe", recipeData);

        InputSearch.value = "";

        recipeData.forEach((recipe) => {
            // buat elemen html
            const card = document.createElement("div");
            const cardBody = document.createElement("div");
            const cardTitle = document.createElement("h5");
            const cardImage = document.createElement("img");

            // class bootsrap
            card.className = "card";
            cardImage.className = "card-img-top recipe-img";
            cardBody.className = "card-body";
            cardTitle.className = "card-title";

            // masukin value
            card.id = recipe.idMeal;
            cardTitle.innerText = recipe.strMeal;
            cardImage.src = recipe.strMealThumb;

            // append ke parent
            cardBody.append(cardTitle);
            card.append(cardImage, cardBody);

            card.addEventListener("click", () => {
                window.location.href = `detail.html?id=${recipe.idMeal}`;
            });

            ListRecipe.append(card);

            StatusText.innerText = `Menampilkan resep "${InputValue}"`;

        });
    } catch (error) {
        ListRecipe.innerHTML = "";
        StatusText.innerText = "Terjadi Kesalahan Server :( ";
        console.error("Error fetching data:", error);
    }
}


