let selectedProducts = [];


function addProduct(productName) {

    selectedProducts.push(productName);

    displaySelectedProducts();

}


function displaySelectedProducts() {

    const container = document.getElementById("selectedProducts");

    if (selectedProducts.length === 0) {

        container.innerHTML = "No products selected yet.";

        return;
    }


    container.innerHTML = "";

    selectedProducts.forEach(function(product) {

        const item = document.createElement("p");

        item.textContent = "✓ " + product;

        container.appendChild(item);

    });

}


function buildOutfit() {

    if (selectedProducts.length === 0) {

        alert("Please select at least one product.");

        return;
    }


    alert(
        "Your outfit includes:\n\n" +
        selectedProducts.join("\n")
    );

}