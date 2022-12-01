
var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("producPrice");
var producCateoryInput = document.getElementById("producCateory");
var producrDescriptionInput = document.getElementById("producrDescription");

var allProducts = [];
var myIndex;

// allProducts = JSON.parse(localStorage.getItem("allProducts"));
// displayProducts();



if(localStorage.getItem("allProducts") != null){
    allProducts = JSON.parse(localStorage.getItem("allProducts"));
    displayProducts()
}

// ADD Products
function addProduct(){

    if(productNameValidation() == true){
        if(document.getElementById("addBtn").innerHTML == "ADD"){
            var product ={
                name : productNameInput.value,
                price: Number(productPriceInput.value),
                category: producCateoryInput.value,
                description: producrDescriptionInput.value,
            };
        
            allProducts.push(product);
        
        
        
            localStorage.setItem("allProducts", JSON.stringify(allProducts));
        
            clearInputs()
            displayProducts()
        }
        else {
              allProducts[myIndex].name = productNameInput.value ;
              allProducts[myIndex].price = Number(productPriceInput.value);
              allProducts[myIndex].category = producCateoryInput.value;
              allProducts[myIndex].description = producrDescriptionInput.value;
    
            document.getElementById("addBtn").innerHTML = "ADD";
            displayProducts()
            clearInputs()
            localStorage.setItem("allProducts", JSON.stringify(allProducts));
            // console.log("update")
        }
    }
    else{
        alert("Product Name must start with capital character and at leat 3 small character")
    }


    
}


// Clear Inputs

function clearInputs(){
    productNameInput.value = "";
    productPriceInput.value = "";
    producCateoryInput.value = "";
    producrDescriptionInput.value = "";

}


// display Products
function displayProducts(){
    var display ="";

    for (var i=0; i<allProducts.length; i++){
        display +=`
        <tr>
    <td>${i}</td>
    <td>${allProducts[i].name}</td>
    <td>${allProducts[i].price}</td>
    <td>${allProducts[i].category}</td>
    <td>${allProducts[i].description}</td>
    <td>
        <button onclick="updateProduct(${i})" id="updateBtn" class="btn btn-success">Update</button>
    </td>
    <td>
        <button onclick="deleteProduct(${i})" class="btn btn-warning">Delete</button>
    </td>
    </tr>`
    }
    
// console.log(display);
document.getElementById("tbody").innerHTML = display;
}

// Delete Product

function deleteProduct(index){
    allProducts.splice(index,1)
    localStorage.setItem("allProducts", JSON.stringify(allProducts));
    displayProducts()
}

// Update Product

function updateProduct(index){
    myIndex =index;

    productNameInput.value = allProducts[index].name;
    productPriceInput.value = allProducts[index].price;
    producCateoryInput.value = allProducts[index].category;
    producrDescriptionInput.value = allProducts[index].description;
    
    document.getElementById("addBtn").innerHTML = "Update Product";
}

// Search on Product
function search(seachProduct){
    // var seachProduct = document.getElementById("search").value;

    var display ="";
    for(var i=0; i<allProducts.length; i++){
        if(allProducts[i].name.toLowerCase().includes(seachProduct.toLowerCase())){
            display +=`<tr>
            <td>${i}</td>
            <td>${allProducts[i].name}</td>
            <td>${allProducts[i].price}</td>
            <td>${allProducts[i].category}</td>
            <td>${allProducts[i].description}</td>
            <td>
                <button onclick="updateProduct(${i})" id="updateBtn" class="btn btn-success">Update</button>
            </td>
            <td>
                <button onclick="deleteProduct(${i})" class="btn btn-warning">Delete</button>
            </td>
            </tr>`
        }
        document.getElementById("tbody").innerHTML = display;
    }

}

// Validation/////

function productNameValidation(){
    var regex= /^[A-Z][a-z]{3,12}$/;

    return regex.test(productNameInput.value);
}