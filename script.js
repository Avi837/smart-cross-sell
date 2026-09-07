// ================================
// Smart Cross-Sell Product System
// ================================

// Product database
const products = {

    SHIRT001: {
        name: "Navy Formal Shirt",
        price: 1999,
        category: "Fashion"
    },

    SHIRT002: {
        name: "White Casual Shirt",
        price: 1799,
        category: "Fashion"
    },

    SHIRT003: {
        name: "Black Premium Shirt",
        price: 2299,
        category: "Fashion"
    }

};


// ================================
// Read Product ID from QR URL
// ================================

function loadProduct() {

    const params = new URLSearchParams(window.location.search);

    const productId = params.get("product");

    // If no Product ID exists
    if (!productId) {
        showProduct("SHIRT001");
        return;
    }

    // If Product ID exists
    if (products[productId]) {

        showProduct(productId);

    } else {

        showProduct("SHIRT001");

    }

}


// ================================
// Show Product
// ================================

function showProduct(productId) {

    const product = products[productId];

    document.getElementById("productName").textContent =
        product.name;

    document.getElementById("productPrice").textContent =
        "₹" + product.price.toLocaleString("en-IN");

    document.getElementById("productCategory").textContent =
        product.category.toUpperCase();

    document.getElementById("productIdDisplay").textContent =
        "Product ID: " + productId;

}


// ================================
// Outfit Builder
// ================================

let selectedProducts = [];


function addProduct(name, price) {

    selectedProducts.push({
        name: name,
        price: price
    });

    displaySelectedProducts();

}


function displaySelectedProducts() {

    const container =
        document.getElementById("selectedProducts");

    if (selectedProducts.length === 0) {

        container.innerHTML =
            "No products selected yet.";

        return;
    }


    let html = "";

    let total = 0;


    selectedProducts.forEach(function(product) {

        html += `
            <div>
                ${product.name}
                — ₹${product.price.toLocaleString("en-IN")}
            </div>
        `;

        total += product.price;

    });


    html += `
        <hr>
        <strong>
            Total: ₹${total.toLocaleString("en-IN")}
        </strong>
    `;


    container.innerHTML = html;

}


// ================================
// Build Outfit
// ================================

function buildOutfit() {

    if (selectedProducts.length === 0) {

        alert("Please add at least one product.");

        return;

    }


    alert(
        "Your outfit has been created! 🎉"
    );

}


// ================================
// Start System
// ================================

loadProduct();