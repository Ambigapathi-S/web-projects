const formEl = document.querySelector("form");
const inputEl = document.getElementById("imageInput");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = '';
let page = 1;

async function searchImages() {
    inputData = inputEl.value;
    const url = "./data.json";

    const response = await fetch(url)
    const data = await response.json()
    const results = data;

    if (page === 1) {
        searchResults.innerHTML = ""
    }

    results.map(result => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result")
        const image = document.createElement('img')
        image.src = result.image;
        image.alt = result.car_name;
        const imageLink = document.createElement('a')
        imageLink.href = result.image;
        imageLink.target = "_blank";
        imageLink.textContent = result.car_name;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        imageWrapper.appendChild(imageWrapper);
    })

}