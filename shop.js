const products = [
  { id: 1, name: " Bag", price: 1200, image: "./images/bag.jpg" },
  { id: 2, name: "Heels ", price: 150, image: "./images/heels.webp" },
  { id: 3, name: " Lip Balm", price: 800, image: "./images/lipbalm.webp" },
  { id: 4, name: " Lip Stick", price: 95, image: "./images/lipstick.webp" },
  { id: 5, name: "Perfume ", price: 35, image: "./images/perfume.webp" },
  { id: 6, name: "watch ", price: 35, image: "./images/watch.jpg" },
];

let cart = JSON.parse(localStorage.getItem('cart_v2')) || [];

const productList = document.getElementById('product-list');
const cartItemsEl = document.getElementById('cart-items');
const totalEl = document.getElementById('total');
const successEl = document.getElementById('success');
const searchEl = document.getElementById('search');

function renderProducts(filter = ''){
  productList.innerHTML = products
    .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    .map(p => `
      <div class="product" data-id="${p.id}">
        <img src="${p.image}" alt="${p.name}" />
        <div class="meta">
          <div class="title">${p.name}</div>
          <div class="price">$${p.price}</div>
        </div>
        <button class="btn-add" onclick="addToCart(${p.id})">Add to cart </button>
      </div>
    `).join('');
}

function renderCart(){
  if(cart.length === 0){
    cartItemsEl.innerHTML = '<div style="color:var(--muted);text-align:center;padding:18px">The shopping cart is empty </div>';
    totalEl.textContent = '$0';
    return;
  }

  cartItemsEl.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img src="${item.image}" alt="${item.name}" />
      <div class="info">
        <div class="name">${item.name}</div>
        <div class="sub">Price: $${item.price}</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:8px">
        <div class="qty-controls">
          <button onclick="changeQty(${item.id}, -1)">−</button>
          <span style="min-width:26px;text-align:center;font-weight:700">${item.quantity}</span>
          <button onclick="changeQty(${item.id}, 1)">+</button>
        </div>
        <button class="remove-btn" onclick="removeItem(${item.id})">Delete</button>
      </div>
    </div>
  `).join('');

  updateTotal();
}

function addToCart(id){
  const p = products.find(x=>x.id===id);
  const exist = cart.find(c=>c.id===id);
  if(exist){ exist.quantity += 1; } else { cart.push({...p, quantity:1}); }
  saveCart();
  renderCart();
  showSuccess();
}

function changeQty(id, diff){
  const it = cart.find(c=>c.id===id);
  if(!it) return;
  it.quantity += diff;
  if(it.quantity <= 0){ cart = cart.filter(x=>x.id!==id); }
  saveCart();renderCart();
}
function removeItem(id){ cart = cart.filter(x=>x.id!==id); saveCart(); renderCart(); }

function updateTotal(){
  const total = cart.reduce((s,i)=> s + (i.price * i.quantity), 0);
  totalEl.textContent = '$' + total;
}

function saveCart(){ localStorage.setItem('cart_v2', JSON.stringify(cart)); }

function showSuccess(){
  successEl.classList.add('show');
  setTimeout(()=> successEl.classList.remove('show'), 1400);
}

searchEl.addEventListener('input', e=> renderProducts(e.target.value));

renderProducts();
renderCart();

window.addToCart = addToCart;
window.changeQty = changeQty;
window.removeItem = removeItem;