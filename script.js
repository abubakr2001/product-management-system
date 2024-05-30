let title= document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads'); 
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let data = 'create';
let conc; 
// calculate total
function calctotal(){
    if(price.value != ""){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value 
        total.innerHTML= result
        total.style.background='green'
    }else{
        total.innerHTML =''
        total.style.background = 'red'
    }

}


// create the product
let dataproduct;
if(localStorage.product != null){
    dataproduct = JSON.parse(localStorage.product)
}else{
    dataproduct=[]
}
submit.onclick= function(){
    let newpro = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value
    }
    if(title.value!= '' && category.value!=''&& newpro.count < 200){
        if(data === 'create'){
            if(newpro.count > 1){
                for(let i=0;i<newpro.count;i++){
                    dataproduct.push(newpro)
                } 
            }else{
                dataproduct.push(newpro)
            } 
        }else{
            dataproduct[conc]=newpro
            data = 'create'
            submit.innerHTML = 'Create'
            count.style.display='block'
        }
        cleardata()
    }
    
    
    // save localstorage 
    localStorage.setItem('product',JSON.stringify(dataproduct))
    
    cleardata()
    readData()
}

// clear inputs
function cleardata(){
    title.value='',
    price.value='',
    taxes.value='',
    ads.value='',
    discount.value='',
    total.innerHTML='',
    count.value='',
    category.value=''
}
// read

function readData(){
    let table = '';
    for(let i =0 ; i < dataproduct.length ; i++){
        table += `
        <tr>
            <td>${i++}</td>
            <td>${dataproduct[i].title}</td>
            <td>${dataproduct[i].price}</td>
            <td>${dataproduct[i].taxes}</td>
            <td>${dataproduct[i].ads}</td>
            <td>${dataproduct[i].discount}</td>
            <td>${dataproduct[i].total}</td>
            <td>${dataproduct[i].category}</td>
            <td><button onclick = "updateData(${i})" id="update">Update</button></td>
            <td><button onclick = "deletData(${i})" id="delete">Delete</button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML =  table;
     let deldata = document.getElementById("deleteAll")
     if(dataproduct.length > 0){
        deldata.innerHTML=`
        <button onclick = "deleteAll()">DeleteAll(${dataproduct.length})</button>
        `
     }else{
        deldata.innerHTML=''
     }
}
readData()


// delete
function deleteData(i){
    dataproduct.splice(i,1)
    localStorage.product= JSON.stringify(dataproduct)
    readData()
}

function deleteAll(){
    localStorage.clear()
    dataproduct.splice(0)
    readData()
}





// count
// update

function updateData(i){
    title.value = dataproduct[i].title
    price.value = dataproduct[i].price
    taxes.value = dataproduct[i].taxes
    ads.value = dataproduct[i].ads
    discount.value = dataproduct[i].discount
    calctotal()
    count.style.display = 'none'
    category.value = dataproduct[i].category
    submit.innerHTML = 'Update'
    data= 'Update';
    conc = i
    scroll({
        top:0,
        behavior:'smooth'
    })
    
}
// search
let SearchBY = 'title'
let search = document.getElementById('search') 
function getsearch(id){
    if(id=='searchTitle'){
        SearchBY = 'title'
    }else{
        SearchBY = 'category'
    }
    search.placeholder = 'Search By '+SearchBY
search.focus()
search.value = ''
readData()
}

function searchdata(value){
    let table = ''
    for(let x = 0;x<dataproduct.length;x++){
        if(SearchBY=='title'){
            
                if(dataproduct[i].title.includes(value)){
                            `
                    <tr>
                        <td>${i}</td>
                        <td>${dataproduct[i].title}</td>
                        <td>${dataproduct[i].price}</td>
                        <td>${dataproduct[i].taxes}</td>
                        <td>${dataproduct[i].ads}</td>
                        <td>${dataproduct[i].discount}</td>
                        <td>${dataproduct[i].total}</td>
                        <td>${dataproduct[i].category}</td>
                        <td><button onclick = "updateData(${i})" id="update">Update</button></td>
                        <td><button onclick = "deletData(${i})" id="delete">Delete</button></td>
                    </tr>
                    `

                }
            
        }else{
            
                if(dataproduct[i].category.includes(value.toLowercase())){
                            `
                    <tr>
                        <td>${i}</td>
                        <td>${dataproduct[i].title}</td>
                        <td>${dataproduct[i].price}</td>
                        <td>${dataproduct[i].taxes}</td>
                        <td>${dataproduct[i].ads}</td>
                        <td>${dataproduct[i].discount}</td>
                        <td>${dataproduct[i].total}</td>
                        <td>${dataproduct[i].category}</td>
                        <td><button onclick = "updateData(${i})" id="update">Update</button></td>
                        <td><button onclick = "deletData(${i})" id="delete">Delete</button></td>
                    </tr>
                    `

                }
        
        }
    }
    document.getElementById('tbody').innerHTML = table
}
// clean data 