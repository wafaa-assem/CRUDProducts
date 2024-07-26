// select inputs
var productNameInput = document.getElementById("name");
var productPriceInput = document.getElementById("price");
var productCategoryInput = document.getElementById("category");
var productDescriptionInput = document.getElementById("desc");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var allProducts = [];

if (JSON.parse(localStorage.getItem("products")) != null) {
  var allProducts = JSON.parse(localStorage.getItem("products"));
  displayProducts();
}

// get values
function addProducts() {
  if (
    validateName() == true &&
    validatePrice() == true &&
    validateCategory() == true
  ) {
    var product = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      description: productDescriptionInput.value,
    };
    allProducts.push(product);
    localStorage.setItem("products", JSON.stringify(allProducts));
    console.log(allProducts);
    clearInputs();
    displayProducts();
  }
}

// clear data from inputs
function clearInputs() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescriptionInput.value = "";
}

// display Products in table
function displayProducts() {
  var data = "";
  for (var i = 0; i < allProducts.length; i++) {
    data += ` <tr>
        <td>${i + 1}</td>
        <td>${allProducts[i].name}</td>
        <td>${allProducts[i].price}</td>
        <td>${allProducts[i].category}</td>
        <td>${allProducts[i].description}</td>
        <td><button onclick="deleteProducts(${i})" class="btn btn-danger">Delete</button></td>
        <td><button onclick="preUpdateProducts(${i})" class="btn btn-warning text-white">Update</button></td>
    </tr>`;
  }
  document.getElementById("body").innerHTML = data;
}

// delete products
function deleteProducts(index) {
  allProducts.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(allProducts));
  displayProducts();
  console.log(allProducts);
}

// preUpdate products
var mainIndex;
function preUpdateProducts(index) {
  addBtn.classList.replace("d-block", "d-none");
  updateBtn.classList.replace("d-none", "d-block");
  productNameInput.value = allProducts[index].name;
  productPriceInput.value = allProducts[index].price;
  productCategoryInput.value = allProducts[index].category;
  productDescriptionInput.value = allProducts[index].description;
  mainIndex = index;
}

// update Products
function updateProducts() {
    var product = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      description: productDescriptionInput.value,
    };
    allProducts.splice(mainIndex, 1, product);
    localStorage.setItem("products", JSON.stringify(allProducts));
    displayProducts();
    clearInputs();
    addBtn.classList.replace("d-none", "d-block");
    updateBtn.classList.replace("d-block", "d-none");
}

// search for products
function searchForProducts(term) {
  var cartoona = "";
  for (var i = 0; i < allProducts.length; i++) {
    if (allProducts[i].name.toLowerCase().includes(term.toLowerCase())) {
      cartoona += ` <tr>
        <td>${i + 1}</td>
        <td>${allProducts[i].name}</td>
        <td>${allProducts[i].price}</td>
        <td>${allProducts[i].category}</td>
        <td>${allProducts[i].description}</td>
        <td><button onclick="deleteProducts(${i})" class="btn btn-danger">Delete</button></td>
        <td><button onclick="(${i})" class="btn btn-warning text-white">Update</button></td>
    </tr>`;
    }
  }
  document.getElementById("body").innerHTML = cartoona;
}

//another solution by using addEventListner
// var btnn = document.getElementById("search");
// btnn.addEventListener("input",function(){
//   document.getElementById("body").innerHTML =""
//   for(var i = 0 ; i<allProducts.length ; i++){
//     if(allProducts[i].name.toLowerCase().includes(btnn.value.toLowerCase())){
//       document.getElementById("body").innerHTML += `
//        <tr>
//         <td>${i + 1}</td>
//         <td>${allProducts[i].name}</td>
//         <td>${allProducts[i].price}</td>
//         <td>${allProducts[i].category}</td>
//         <td>${allProducts[i].description}</td>
//         <td><button onclick="deleteProducts(${i})" class="btn btn-danger">Delete</button></td>
//     </tr>`
//     }
//   }
// })

// validate
function validateName() {
  var nameRegex = /^[A-Z][a-z]{3,10}$/;
  if (nameRegex.test(productNameInput.value) == true) {
    // must the function return !!!!!!!
    document.getElementById("alertName").classList.replace("d-block", "d-none");
    return true;
  }
  document.getElementById("alertName").classList.replace("d-none", "d-block");
  return false;
}

function validatePrice() {
  var priceRegex = /^[1-9][0-9]{3,5}$/;
  if (priceRegex.test(productPriceInput.value) == true) {
    document
      .getElementById("alertPrice")
      .classList.replace("d-block", "d-none");
    return true;
  }
  document.getElementById("alertPrice").classList.replace("d-none", "d-block");
  return false;
}

function validateCategory() {
  var categoryRegex = /^(TV|Mobiles|Machines)$/i;
  if (categoryRegex.test(productCategoryInput.value) == true) {
    document
      .getElementById("categoryAlert")
      .classList.replace("d-block", "d-none");
    return true;
  }
  document
    .getElementById("categoryAlert")
    .classList.replace("d-none", "d-block");
  return false;
}
