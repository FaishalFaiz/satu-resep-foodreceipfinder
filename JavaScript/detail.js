// document elements
const MenuImage = document.getElementById('menu-image');
const MenuTitle = document.getElementById('menu-title');
const MenuCategory = document.getElementById('menu-category');
const MenuList = document.getElementById('menu-ingredient-list');
const MenuInstructions = document.getElementById('menu-instruction');
const MenuVideo = document.getElementById('menu-yt');
const MenuSource = document.getElementById('menu-source');

// params
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function fetchData() {
    try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);

        if (!response.data.meals) {
            console.error("No meal data found for ID:", id);
            return;
        }

        const menu = response.data.meals[0];
        console.log("Fetching data for ID:", id);
        console.log("Response data:", menu);

        // Atur DOM easy
        MenuImage.src = menu.strMealThumb || "../Assets/webicon.svg";
        MenuTitle.innerText = menu.strMeal || "No title available.";
        MenuCategory.innerText = menu.strCategory || "Uncategorized";
        MenuInstructions.innerText = menu.strInstructions || "No instructions available.";
        MenuSource.innerText = menu.strSource || "No source available.";
        MenuSource.href = menu.strSource || "#";

        // Video
        const EmbedVideo = menu.strYoutube.replace("watch?v=", "embed/");
        MenuVideo.src = EmbedVideo || "";

        // Ingredients List
        for (let i = 1; i <= 20; i++) {
            const ingredient = menu[`strIngredient${i}`];
            const measure = menu[`strMeasure${i}`];

            if (ingredient && ingredient.trim() !== "") {
                const li = document.createElement("li");
                li.classList.add("list-group-item");
                li.textContent = `${ingredient} - ${measure}`;
                MenuList.appendChild(li);
            }
        }

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchData();