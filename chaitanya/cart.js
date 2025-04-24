  let cart = [];
  const cartModal = document.getElementById("cartModal");
  const cartItemsContainer = document.getElementById("cartItems");
  const cartCountElement = document.getElementById("cartCount");
  const cartTotalElement = document.getElementById("cartTotal");

  // Search functionality
  const searchInput = document.getElementById("searchInput");
  const medicineList = document.getElementById("medicineList");
  const productList = document.getElementById("productList");

  searchInput.addEventListener("input", function () {
    const filter = searchInput.value.toLowerCase();
    const medicinecards = medicineList.getElementsByClassName("medicine-card");
    const productcards = productList.getElementsByClassName("product-card");
    

    let visibleCount = 0;

    Array.from(cards).forEach(card => {
      const name = card.querySelector("h3").innerText.toLowerCase();
      const isVisible = name.includes(filter);
      card.style.display = isVisible ? "block" : "none";
      if (isVisible) visibleCount++;
    });

    document.getElementById("no-results").style.display = visibleCount === 0 ? "block" : "none";
  });

  // Cart functions
  function addToCart(name, price, image) {
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        name: name,
        price: price,
        image: image,
        quantity: 1
      });
    }
    
    updateCart();
    showAddedToCartMessage(name);
  }

  function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
  }

  function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
    
    // Update cart items display
    cartItemsContainer.innerHTML = "";
    
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
      cartTotalElement.textContent = "0";
      return;
    }
    
    let total = 0;
    
    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      
      const cartItemElement = document.createElement("div");
      cartItemElement.className = "cart-item";
      cartItemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div>₹${item.price} x ${item.quantity} = ₹${itemTotal}</div>
        </div>
        <div class="remove-item" onclick="removeFromCart(${index})">✕</div>
      `;
      
      cartItemsContainer.appendChild(cartItemElement);
    });
    
    cartTotalElement.textContent = total;
  }

  function toggleCart() {
    cartModal.style.display = cartModal.style.display === "block" ? "none" : "block";
  }


  // document.addEventListener('DOMContentLoaded', function() {
  //   document.querySelector('.cart-icon').addEventListener('click', function(e) {
  //     e.preventDefault();
  //     toggleCart();
  //   });
  // });

  function checkout() {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartSummary = {
      items: cart,
      total: total
    };
    
    // Store in localStorage as a string
    localStorage.setItem('cartSummary', JSON.stringify(cartSummary));

    window.location.href="payment.html";
  }

  function showAddedToCartMessage(name) {
    const message = document.createElement("div");
    message.textContent = `${name} added to cart!`;
    message.style.position = "fixed";
    message.style.bottom = "20px";
    message.style.left = "50%";
    message.style.transform = "translateX(-50%)";
    message.style.backgroundColor = "#4CAF50";
    message.style.color = "white";
    message.style.padding = "10px 20px";
    message.style.borderRadius = "5px";
    message.style.zIndex = "1000";
    message.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
    document.body.appendChild(message);
    
    setTimeout(() => {
      message.style.opacity = "0";
      message.style.transition = "opacity 0.5s";
      setTimeout(() => document.body.removeChild(message), 500);
    }, 2000);
  }

  // Close cart when clicking outside
  window.addEventListener("click", function(event) {
    if (event.target === cartModal) {
      cartModal.style.display = "none";
    }
  });
