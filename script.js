//sum of prices
//create product
//save local storage
// read
//clear inputs
//delete
// count
//update
// search
// clean

//sum of prices
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.querySelector(".submit");
let mood = "create";
let temp; // i will put i in here

//
function getTotal() {
  if (price.value != "" && price.value != 0) {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "green";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#a00d02";
  }
}

// create
//
//
//
//عشان احافظ علي البيانات القديمه لما اعمل ريلود
//هتعمل شرط بيقول لو اللوكال ستوراج مش فاضيه هات البيانات اللي فيها حطها في المتغير
// لو اللوكال ستوراج فاضيه خلاص اعمل مصفوفه فاضيه بقا

// JSON.parse() takes a JSON string and transforms it into a JavaScript object.
// هو كده كده شايف اللوكال ستوراج من اي حته
let proData;
if (localStorage.product != null) {
  proData = JSON.parse(localStorage.product); //put the value of product key (old array of obj) in prodata
} else {
  proData = [];
}
//  يعني لو في بيانات قديمه حطها في المتغير لو مفيش اعمل أرراي فاضيه واملاها
//
//
//
//
//هعمل اوبجكت عشان احفط فيه خصائص المنتج الواحد كلها
//كل ما اعمل كرييت هينشا نفس الاوبجكت بنفس الخصائص بنفس القيم مكان الاوبجكت القديم
// هعمل مصفوفه من الاوبجكتات عشان كل ما اضغط علي كرييت يضيف المنتج في المصفوفه
function create() {
  let obj = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  // count
  if (title.value != "" && price.value != "" && count.value < 10000) {
    if (mood === "create") {
      if (obj.count > 1) {
        for (let i = 1; i <= obj.count; i++) {
          proData.push(obj);
        }
      } else {
        proData.push(obj);
      }
      clearData();
    } else {
      // update
      proData[temp].title = title.value;
      proData[temp].price = price.value;
      proData[temp].taxes = taxes.value;
      proData[temp].ads = ads.value;
      proData[temp].discount = discount.value;
      proData[temp].category = category.value;
      mood = "create";
      submit.innerHTML = "create";
      count.style.display = "inline-block";
    }
  }

  // proData.push(obj);
  // save to local storage
  localStorage.setItem("product", JSON.stringify(proData));

  readData();
}
// JSON.stringify() takes a JavaScript object  and transforms it into a JSON string

// var arr;
// var arr2 = [1, 2];
// arr = arr2;
// console.log(arr);
//

//clear inputs
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// read
//
//
function readData() {
  getTotal();
  let table = "";
  for (var i = 0; i < proData.length; i++) {
    table += ` 
      <tr>
      <td>${i + 1}</td>
      <td>${proData[i].title}</td>
      <td>${proData[i].price}</td>
      <td>${proData[i].taxes}</td>
      <td>${proData[i].ads}</td>
      <td>${proData[i].discount}</td>
      <td>${proData[i].category}</td>
      <td>${proData[i].total}</td>
      <td><button id="update" onclick="updateData(${i})">update</button></td>
      <td><button id="delete" onclick="deleteItem(${i})">delete</button></td>
    </tr> `;
  }
  document.querySelector(".aa").innerHTML = table;

  if (proData[0] != null) {
    document.getElementById(
      "deleteAll"
    ).innerHTML = `Delete All (${proData.length})`;

    document.getElementById("deleteAll").style.display = "inline-block";
  } else {
    document.getElementById("deleteAll").style.display = "none";
  }
}
readData(); // عشان تظهر البيانات علي طول

//
//
// delete item '
function deleteItem(i) {
  proData.splice(i, 1); // delete that product(obj) from the array
  localStorage.product = JSON.stringify(proData);
  // if u delete element from array it still be there in local storage so u need to update the locla storage (put the new array in it)
  readData();
}

//
//
// delete all

function delAll() {
  proData = [];
  localStorage.product = JSON.stringify(proData);
  readData();
}

// updata
function updateData(i) {
  title.value = proData[i].title;
  price.value = proData[i].price;
  ads.value = proData[i].ads;
  taxes.value = proData[i].taxes;
  discount.value = proData[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = proData[i].category;
  submit.innerHTML = "update";
  mood = "update";
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// search
//
let searchMode = "title";
let btnSearch = document.getElementById("search");
function getSearchMode(id) {
  if (id == "searchTitle") {
    searchMode = "title";
  } else {
    searchMode = "category";
  }
  btnSearch.placeholder = "Search By " + searchMode;
  btnSearch.focus();
  btnSearch.value = "";
  readData();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < proData.length; i++) {
    if (searchMode == "title") {
      if (proData[i].title.includes(value.toLowerCase())) {
        table += ` 
        <tr>
        <td>${i + 1}</td>
        <td>${proData[i].title}</td>
        <td>${proData[i].price}</td>
        <td>${proData[i].taxes}</td>
        <td>${proData[i].ads}</td>
        <td>${proData[i].discount}</td>
        <td>${proData[i].category}</td>
        <td>${proData[i].total}</td>
        <td><button id="update" onclick="updateData(${i})">update</button></td>
        <td><button id="delete" onclick="deleteItem(${i})">delete</button></td>
      </tr> `;
      }
    } else {
      if (proData[i].category.includes(value.toLowerCase())) {
        table += ` 
        <tr>
        <td>${i + 1}</td>
        <td>${proData[i].title}</td>
        <td>${proData[i].price}</td>
        <td>${proData[i].taxes}</td>
        <td>${proData[i].ads}</td>
        <td>${proData[i].discount}</td>
        <td>${proData[i].category}</td>
        <td>${proData[i].total}</td>
        <td><button id="update" onclick="updateData(${i})">update</button></td>
        <td><button id="delete" onclick="deleteItem(${i})">delete</button></td>
      </tr> `;
      }
    }
  }
  document.querySelector(".aa").innerHTML = table;
}
var icon = document.getElementById("night");
icon.onclick = function () {
  document.body.classList.toggle("dark-theme");
};
