// ================= CART INIT =================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ================= SAVE CART =================
function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

// ================= ADD TO CART (FIXED) =================
function addToCart(product){

    // اگر product object ہے (recommended)
    if(typeof product === "object"){

        let existing = cart.find(item => item.id === product.id);

        if(existing){
            existing.qty += 1;
        } else {
            cart.push({...product, qty:1});
        }

    } 
    else {
        // fallback (اگر صرف name دیا جائے)
        cart.push({name: product, qty:1});
    }

    saveCart();
    alert("🛒 Added to cart!");
}

// ================= REMOVE ITEM =================
function removeItem(index){
    cart.splice(index, 1);
    saveCart();
    loadCart();
}

// ================= CART PAGE LOAD =================
function loadCart(){

    let box = document.getElementById("cartBox");
    if(!box) return;

    box.innerHTML = "";

    let total = 0;

    if(cart.length === 0){
        box.innerHTML = "<h3>Cart is empty 🛒</h3>";
        return;
    }

    cart.forEach((item, index) => {

        let price = item.price || 0;
        let qty = item.qty || 1;

        total += price * qty;

        box.innerHTML += `
            <div class="card">
                <h3>${item.name}</h3>
                <p>Price: Rs ${price}</p>

                <p>
                    Qty: 
                    <button onclick="changeQty(${index}, -1)">-</button>
                    ${qty}
                    <button onclick="changeQty(${index}, 1)">+</button>
                </p>

                <p>Total: Rs ${price * qty}</p>

                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    document.getElementById("totalBox").innerHTML = "Total: Rs " + total;
}

// ================= QTY CHANGE =================
function changeQty(index, value){

    cart[index].qty += value;

    if(cart[index].qty <= 0){
        cart.splice(index,1);
    }

    saveCart();
    loadCart();
}

// ================= VIEW CART =================
function viewCart(){
    window.location.href = "cart.html";
}