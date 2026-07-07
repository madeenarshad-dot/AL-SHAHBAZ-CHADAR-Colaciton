function loadShop(){

  let box = document.getElementById("shopBox");
  if(!box) return;

  // ================= SAFE PRODUCTS LOAD =================
  let products = JSON.parse(localStorage.getItem("products")) || [];

  // fallback demo products (agar empty ho)
  if(products.length === 0){
    products = [
      {id:1, name:"Wool Chadar", price:1200, category:"wool", image:"https://images.unsplash.com/photo-1602810318383-1a7d2b2f8c0c"},
      {id:2, name:"Pashmina Shawl", price:5000, category:"pashmina", image:"https://images.unsplash.com/photo-1521334884684-d80222895322"},
      {id:3, name:"Cotton Shawl", price:800, category:"cotton", image:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246"}
    ];
  }

  // ================= GET CATEGORY =================
  let urlParams = new URLSearchParams(window.location.search);
  let category = urlParams.get("category");

  let filtered = products;

  // ================= FILTER =================
  if(category && category !== "all"){
    filtered = products.filter(p =>
      (p.category || "").toLowerCase() === category.toLowerCase()
    );
  }

  box.innerHTML = "";

  // ================= EMPTY STATE =================
  if(filtered.length === 0){
    box.innerHTML = `
      <h3 style="text-align:center;margin-top:20px;">
        😕 No Products Found
      </h3>
    `;
    return;
  }

  // ================= RENDER =================
  filtered.forEach(p => {

    box.innerHTML += `
      <div class="card">

        <img src="${p.image}" alt="${p.name}">

        <h3>${p.name}</h3>

        <p>💰 Rs ${p.price}</p>

        <button onclick="addToCart(${p.id})">
          🛒 Add to Cart
        </button>

      </div>
    `;
  });
}