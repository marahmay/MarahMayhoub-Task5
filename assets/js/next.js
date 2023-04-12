



const id = localStorage.getItem('id');

// console.log(id);

const show = document.querySelector('.show');


function appendNewCard(mimg) {
  const img = document.createElement('img');
  img.className = "theImg";
  img.src = mimg;

  show.appendChild(img);
}

async function fetchProductsImages() {
  let data = [];
  await fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((res) => (data = res.products));
    data.forEach((item) => {

      // console.log(id);

      if(id == item.id){

        for (let i = 0; i < 5; i++) {
      appendNewCard(item.images[i]);
    }
      }
    });

    // data[id]

    
}



fetchProductsImages();

