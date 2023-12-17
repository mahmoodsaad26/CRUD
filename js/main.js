let productNameInput = document.getElementById("name");
let productPriceInput=document.getElementById("price");
let productCategoryInput = document.getElementById("category");
let productDescriptionInput=document.getElementById("desc");
let addBtn=document.getElementById('addBtn');
let updateBtn=document.getElementById('updateBtn')
let productsList=[];
let flag;

if(localStorage.getItem('products')!=null){
    productsList=JSON.parse(localStorage.getItem('products'))
    display(productsList);
}


function addProduct(){
   if(validateName(productNameInput.value)==true&&validatePrice(productPriceInput.value)==true&&validateCategory(productCategoryInput.value)==true){
    let uniqueId = (new Date()).getTime();
    let product={
        name:productNameInput.value,
        price:productPriceInput.value,
        category:productCategoryInput.value,
        desc:productDescriptionInput.value,
        id : uniqueId
    }
    productsList.push(product)
    localStorage.setItem('products',JSON.stringify(productsList))
    display(productsList)
    clearForm()
   }
}
 
function display(productArr){
    let cartona=''
    for(var i=0;i<productArr.length;i++){
        cartona+=`<tr>
        <td>${i+1}</td>
        <td>${productArr[i].name}</td>
        <td>${productArr[i].price}</td>
        <td>${productArr[i].category}</td>
        <td>${productArr[i].desc}</td>
        <td><button class="btn btn-warning btn-sm" onclick="getUpdateValues(${productArr[i].id})">Update</button></td>
        <td><button class="btn btn-danger btn-sm" onclick="deleteProduct(${productArr[i].id})">Delete</button></td>
        </tr>`
    }
    document.getElementById("tableRow").innerHTML=cartona;
}  

function deleteProduct(productId){
    for(var i=0;i<productsList.length;i++){
        if(productsList[i].id==productId){
            productsList.splice(i,1)
            localStorage.setItem('products',JSON.stringify(productsList))
        }
    }
    
    display(productsList);
     
}

function searchByName(term){
    let searchList=[];
    for(let i=0;i<productsList.length;i++){
        if(productsList[i].name.toLowerCase().includes(term.toLowerCase())==true){
            searchList.push(productsList[i])
        }
    }

    display(searchList);
}

function clearForm(){
    productNameInput.value=""
    productPriceInput.value=""
    productCategoryInput.value=""
    productDescriptionInput.value=""
}

function getUpdateValues(productId){
    for(let i=0;i<productsList.length;i++){
        if(productsList[i].id==productId){
            productNameInput.value=productsList[i].name
            productPriceInput.value=productsList[i].price
            productCategoryInput.value=productsList[i].category
            productDescriptionInput.value=productsList[i].desc
            flag=productsList[i].id
            addBtn.classList.add('d-none');
            updateBtn.classList.remove('d-none')
        }
    }

}


function updateProduct(){
    for(let i=0;i<productsList.length;i++){
        if(productsList[i].id==flag){
            productsList[i].name=productNameInput.value;
            productsList[i].price=productPriceInput.value;
            productsList[i].category=productCategoryInput.value;
            productsList[i].desc=productDescriptionInput.value;
            addBtn.classList.remove('d-none');
            updateBtn.classList.add('d-none')
            display(productsList);
            localStorage.setItem('products',JSON.stringify(productsList))
            clearForm()
        }
    }

}
/******Validation*****/
function validateName(term){
    let regex=/^[A-Za-z][A-Za-z0-9]{2,8}$/
let x=regex.test(term)
if(x==true){
document.getElementById('nameWarning').classList.add('d-none')
return true;
}else if(x==false||term==null){
document.getElementById('nameWarning').classList.remove('d-none')
return false
}

}

function validatePrice(term){
    let regex=/^[0-9]+$/
let x=regex.test(term)
if((x==true&&term>0)){
document.getElementById('priceWarning').classList.add('d-none')
return true;
}else if(x==false||term==null||term<0){
document.getElementById('priceWarning').classList.remove('d-none')
return false
}

}

function validateCategory(term){
    let regex=/^[a-z]+[0-9]*$/i
let x=regex.test(term)
if(x==true){
document.getElementById('categoryWarning').classList.add('d-none')
return true;
}else if(x==false||term==null){
document.getElementById('categoryWarning').classList.remove('d-none')
return false
}

}
