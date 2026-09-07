// ================================
// Smart Cross-Sell Product System
// ================================

// Product database
const products = {

    SHIRT001: {
        name: "Navy Formal Shirt",
        price: 1999,
        category: "Fashion",

        recommendations: [
            {
                name: "Beige Formal Trouser",
                price: 2499,
                icon: "👖"
            },
            {
                name: "Brown Formal Shoes",
                price: 2999,
                icon: "👞"
            },
            {
                name: "Leather Belt",
                price: 899,
                icon: "👔"
            },
            {
                name: "Classic Silver Watch",
                price: 2499,
                icon: "⌚"
            }
        ]
    },

    SHIRT002: {
        name: "White Casual Shirt",
        price: 1799,
        category: "Fashion",

        recommendations: [
            {
                name: "Blue Denim Jeans",
                price: 2299,
                icon: "👖"
            },
            {
                name: "White Sneakers",
                price: 2999,
                icon: "👟"
            },
            {
                name: "Casual Belt",
                price: 799,
                icon: "👔"
            }
        ]
    },

    SHIRT003: {
        name: "Black Premium Shirt",
        price: 2299,
        category: "Fashion",

        recommendations: [
            {
                name: "Black Formal Trouser",
                price: 2699,
                icon: "👖"
            },
            {
                name: "Black Leather Shoes",
                price: 3499,
                icon: "👞"
            },
            {
                name: "Premium Black Watch",
                price: 3999,
                icon: "⌚"
            }
        ]
    }

};


// ================================
// Read Product ID from QR URL
// ================================

async function loadProduct() {

    const params =
        new URLSearchParams(window.location.search);

    const productId =
        params.get("product");


    // If no Product ID exists
    if (!productId) {

        showProduct("SHIRT001");

        return;
    }


    // Get product from Supabase
    const { data, error } =
        await supabaseClient
            .from("products")
            .select("*")
            .eq("product_id", productId)
            .single();


    // If database error
    if (error) {

        console.error("Supabase Error:", error);

        // Fallback to existing product system
        if (products[productId]) {

            showProduct(productId);

        } else {

            showProduct("SHIRT001");

        }

        return;
    }


    // Product found in Supabase
    if (data) {

        // Keep existing recommendations
        // from our recommendation system
        const existingProduct =
            products[productId];

        products[productId] = {

            name: data.name,

            price: Number(data.price),

            category: data.category,

            recommendations:
                existingProduct
                    ? existingProduct.recommendations
                    : []

        };


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


    const recommendationContainer =
        document.querySelector(".recommendations");

    recommendationContainer.innerHTML = "";


    product.recommendations.forEach(function(item) {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <div class="product-icon">${item.icon}</div>

            <h3>${item.name}</h3>

            <p>₹${item.price.toLocaleString("en-IN")}</p>

            <button>Add</button>
        `;

        card.querySelector("button").addEventListener(
            "click",
            function() {
                addProduct(item.name, item.price);
            }
        );

        recommendationContainer.appendChild(card);

    });

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
