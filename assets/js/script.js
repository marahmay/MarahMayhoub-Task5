const container = document.querySelector(".container");
const products = document.querySelector(".products");
const slide = document.querySelector(".slider");
const searchInput = document.querySelector('.search');
const searchBtn = document.querySelector('.btn');
const searchside = document.querySelector('.search-input');

function appendNewCard(brand, category, title, description, price, mimg, imgid) {

    const img = document.createElement('img');
    img.className = "theImg";
    img.src = mimg;
    const imgbtn = document.createElement('button');
    imgbtn.className = "imgbtn";
    imgbtn.appendChild(img);
    imgbtn.addEventListener('click', function () {
        const id = imgid;
        localStorage.setItem('id', id);
        window.location.href = 'next.html';
    })

    const h1 = document.createElement('h1');
    h1.innerText = brand;
    const span = document.createElement('span');
    span.innerText = category;
    const brandDiv = document.createElement('div');
    brandDiv.className = "brand";
    brandDiv.appendChild(h1);
    brandDiv.appendChild(span);

    const h3 = document.createElement('h3');
    h3.className = "title";
    const p = document.createElement('p');
    p.className = "description";
    h3.innerText = title;
    p.innerText = description;
    const details = document.createElement('div');
    details.className = "details";
    details.appendChild(h3);
    details.appendChild(p);

    const leftPrice = document.createElement('p');
    const rightPrice = document.createElement('span');
    leftPrice.innerText = "Price :";
    leftPrice.className = "leftPrice";
    rightPrice.innerText = price + " $";
    leftPrice.appendChild(rightPrice);
    const priceDiv = document.createElement('div');
    priceDiv.className = "price";
    priceDiv.appendChild(leftPrice);

    const div = document.createElement('div');
    div.className = "divBottom";
    div.appendChild(details);
    div.appendChild(priceDiv);

    const productCard = document.createElement('div');
    productCard.className = "product-card";

    productCard.appendChild(imgbtn);
    productCard.appendChild(brandDiv);
    productCard.appendChild(div);
    products.appendChild(productCard);
    container.appendChild(products);
    container.appendChild(slide);
}

let counter = 0;
let countEnd = counter + 10;
let data = [];

async function fetchProducts() {
    await fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .then((res) => {
            data = res.products;
            for (let i = counter; i < countEnd; i++) {
                const item = data[i];
                appendNewCard(item.brand, item.category, item.title, item.description, item.price, item.images[0], item.id);
            }
            productSlider(data);
            let slideSpan = document.querySelectorAll(".slider span");
            slideSpan.forEach((element) => {
                element.addEventListener("click", function () {
                    products.innerHTML = null;
                    counter = (this.innerHTML - 1) * 10;
                    console.log(counter);
                    for (let i = counter; i < counter + 10; i++) {
                        const item = data[i];
                        appendNewCard(item.brand, item.category, item.title, item.description, item.price, item.images[0], item.id);
                        element.classList.remove('active');
                    }
                });
                element.classList.add('active');
                console.log(element.classList);
            });
        });
}

fetchProducts();

function productSlider(cardsNumber) {

    if (cardsNumber.length > 10) {
        let sliderNum = (cardsNumber.length) / 10;
        for (let i = 0; i < sliderNum; i++) {
            if (i === 0) {
                slide.innerHTML += `<span  id="${i}" class="active">${i + 1
                    }</span>`;
            } else {
                slide.innerHTML += `<span id="${i}">${i + 1}</span>`;
            }
        }
    }

}

searchBtn.addEventListener('click', function () {
    const searchInputFilter = searchInput.value.toLowerCase();
    products.innerHTML = "";
    for (let index = 0; index < data.length; index++) {
        const dataItem = data[index];
        const category = dataItem.category.toLowerCase();
        const title = dataItem.title.toLowerCase();
        const description = dataItem.description.toLowerCase();
        if (title.includes(searchInputFilter) || description.includes(searchInputFilter) || category.includes(searchInputFilter)) {
            appendNewCard(dataItem.brand, dataItem.category, dataItem.title, dataItem.description, dataItem.price, dataItem.images[0]);
        }
    }
    if (products.innerHTML == "") {
        products.innerHTML = `<p>No Results</p>`;
        searchInput.value = "";
        slide.innerHTML = "";
        showAllProducts();
    } else {
        showAllProducts();
    }
});

function showAllProducts() {
    slide.innerHTML = "";
    searchInput.value = "";
    const rebtn = document.createElement('button');
    rebtn.className = "rebtn";
    rebtn.innerText = "Show All Products";
    products.appendChild(rebtn);
    rebtn.addEventListener('click', function () {
        products.innerHTML = "";
        fetchProducts();
    });
}
