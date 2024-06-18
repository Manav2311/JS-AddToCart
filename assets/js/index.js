// Array of product objects
const products = [
    {
      id: 1,
      name: "BONUS Navy Men's Sports Shoes",
      price: "10",
      image: ".\\assets\\img\\AIR-CAPSUL SHOSE-1.png"
    },
    {
      id: 2,
      name: "CRUISER Navy Men's Running Shoes",
      price: "20",
      image: ".\\assets\\img\\AIR-CAPSUL SHOSE-2.png"
    },
    {
      id: 3,
      name: "BONUS Navy Men's Sports Shoes",
      price: "30",
      image: ".\\assets\\img\\AIR-CAPSUL SHOSE-3.png"
    },
    {
      id: 4,
      name: "BRACE Black Men's Sports Shoes",
      price: "40",
      image: ".\\assets\\img\\AIR-CAPSUL SHOSE-4.png"
    },
     {
      id: 5,
      name: "CAMP WAY Grey Men's Walking Shoes",
      price: "10",
      image: ".\\assets\\img\\CAMPU-SHOSE-1.png"
    },
    {
      id: 6,
      name: "CAMP-SPUNKY Black Men's Running Shoes",
      price: "20",
      image: ".\\assets\\img\\CAMPU-SHOSE-2.png"
    },
    {
      id: 7,
      name: "CYBER Navy Men's Walking Shoes",
      price: "30",
      image: ".\\assets\\img\\CAMPU-SHOSE-3.png"
    },
    {
      id: 8,
      name: "PEDRO Grey Men's Running Shoes",
      price: "40",
      image: ".\\assets\\img\\CAMPU-SHOSE-4.png"
    } 
  ];
  
let cart = JSON.parse(localStorage.getItem('cart')) || []
  console.log(cart);
  
  // Render products on the index page
if (document.getElementById("products")) {
    const productContainer = document.getElementById("products")
    products.forEach(product => {
        const productElement = document.createElement("div")
        productElement.className = 'col-md-3 mb-4';
        productElement.innerHTML = `
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">$${product.price}</p>
                    <button class="btn btn-secondary" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;
        productContainer.appendChild(productElement)
    })
}
  
  // Render cart on cart page
    if (document.getElementById("my-cart")) {
        updateCart()
    }

    function addToCart(productId) {
        const product = products.find(p => p.id == productId)
        const cartItem = cart.find(item => item.id == productId)

        if (cartItem) {
            cartItem.quantity += 1
        } else {
            cart.push({...product, quantity: 1})
        }

        localStorage.setItem('cart', JSON.stringify(cart))
        updateCartCount()
    }
  
function updateCart() {
    const cartItemsContainer = document.getElementById("my-cart")
    const totalContainer = document.getElementById("total")

    if (cartItemsContainer && totalContainer) {
        cartItemsContainer.innerHTML = ""
        let total = 0
        cart.forEach((product, index) => {
            const cartItem = document.createElement("div")
            cartItem.className = "col-12 mb-3"
            cartItem.innerHTML = `
                <div class="card">
                    <div class="card-body d-flex justify-content-between align-items-center p-2">
                        <img src="${product.image}" class="img-thumbnail mr-3" style="width: 100px;" alt="${product.name}">
                        <div>
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">$${product.price} </p>
                        </div>
                        <div class="fw-bold fs-5">
                        x ${product.quantity}
                        </div>
                        <div>
          <button class="btn btn-secondary mr-2" onclick="decreaseQuantity(${index})">-</button>
          <button class="btn btn-secondary mr-2" onclick="increaseQuantity(${index})">+</button>
        </div>
                        <div>
                            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${product.id})">Remove</button>
                        </div>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem)

            total += product.price * product.quantity;
        })
        totalContainer.innerText = `Total: $${total.toFixed(2)}`;
    }
}
  
  function updateCartCount() {
        const cartCountElement = document.getElementById("cart-count")
        if (cartCountElement) {
            let totalCount = 0;
            cart.forEach(item => {
                totalCount += item.quantity;
            });
            cartCountElement.innerHTML = totalCount;
        }
  }

  
 function removeFromCart(productId) {
    const cartItem = cart.find(item => item.id == productId)

    if (cartItem.quantity > 1) {
        cartItem.quantity -= 1
    } else {
        cart = cart.filter(product => product.id !== productId)
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    updateCart()
    updateCartCount()
  }
  function increaseQuantity(index) {
  cart[index].quantity += 1;
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
  updateCartCount();
}

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
  updateCartCount();
}
  // Initial load
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount()
    if (document.getElementById('my-cart')) {
        updateCart()
    }
})
    
