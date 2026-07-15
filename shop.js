const productList = document.getElementById("product-list");

const searchEl = document.getElementById("search");

const categoryEl = document.getElementById("category");

const sortEl = document.getElementById("sort");


function renderProducts() {

    let filtered = [...products];

    const search = searchEl.value.toLowerCase();

    const category = categoryEl.value;

    const sort = sortEl.value;

    filtered = filtered.filter(product => {

        const matchName = product.name.toLowerCase().includes(search);

        const matchCategory = category === "All" || product.category === category;

        return matchName && matchCategory;

    });


    if (sort === "low") {
        filtered.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
        filtered.sort((a, b) => b.price - a.price);
    }

    if (sort === "az") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }


    productList.innerHTML = filtered.map(product => `

<div class="col-lg-4 col-md-6">

<div class="product-card">


<div class="product-img">

<img src="${product.image}" alt="${product.name}">


<div class="product-fav">
<i class="fa-regular fa-heart"></i>
</div>


</div>

<div class="product-body">

<h4>${product.name}</h4>

<div class="rating">
${"★".repeat(product.rating)}
</div>

<div class="price">
$${product.price}
</div>

<button class="add-btn" onclick="addToCart(${product.id})">
Add to Bag
</button>

</div>

</div>

</div>

`).join("");

}


searchEl.addEventListener("input", renderProducts);

categoryEl.addEventListener("change", renderProducts);

sortEl.addEventListener("change", renderProducts);


renderProducts();