const main = document.querySelector('.main');
const addtxt = document.querySelector(".addtxt");
const add = document.querySelector(".add");
const list = document.querySelector(".list")
const filter = document.querySelector('.filter')
const allFilter = document.querySelector('.allFilter')
const todoFilter = document.querySelector('.todoFilter')
const doneFilter = document.querySelector('.doneFilter')
const deleteAll = document.querySelector('.deleteAll')
let pageNumber = 0;
let data = [];



function init(){
    if (data.length == 0){
        main.style.display = "none";
    }
    else {
        main.style.display = "block";
        allFilter.classList.remove("active")
        todoFilter.classList.remove("active")
        doneFilter.classList.remove("active")
        if (pageNumber === 0){
            allFilter.classList.add("active")
            renderAllList()
        } else if (pageNumber === 1){
            todoFilter.classList.add("active")
            renderTodoList()
        } else if (pageNumber === 2){
            doneFilter.classList.add("active")
            renderDoneList()
        }
        count();
        addtxt.value = "";
    }
}

function renderAllList(){
    let str='';
    data.forEach(function(item,index){
        let content = ``;
        if (item.status =="未完成"){
            content = `<li><input type="checkbox"  data-num="${index}"><p>${item.todo}</p><input type="button" value="x" data-num="${index}"></li>`
        }
        else if(item.status == "done"){
            content = `<li><input type="checkbox"  data-num="${index}" checked><p>${item.todo}</p><input type="button" value="x" data-num="${index}"></li>`
        }
    str += content;
    })
    list.innerHTML = str; 
    addtxt.value = "";
}

function renderTodoList(){
    let str=``;
    data.forEach(function(item,index){
        if (item.status =="未完成"){
            str+= `<li><input type="checkbox"  data-num="${index}"><p>${item.todo}</p><input type="button" value="x" data-num="${index}"></li>`
        }
    })
    list.innerHTML = str; 
}

function renderDoneList(){
    let str=``;
    data.forEach(function(item,index){
        if(item.status == "done"){
            str+= `<li><input type="checkbox"  data-num="${index}" checked><p>${item.todo}</p><input type="button" value="x" data-num="${index}"></li>`
        }
    })
    list.innerHTML = str; 
}

//計算未完成數
function count(){
    let todoTotle = 0;
    let totle = data.length;
    data.forEach(function(item){
        if (item.status == "未完成"){
            todoTotle+= 1;
        }
    })
    const todoNum = document.querySelector(".todoNum");
    todoNum.textContent =`共有${totle}筆項目，${todoTotle}筆待完成`;
}

// 新增todo
add.addEventListener('click',function(e){
    if (addtxt.value == ""){
        alert("你確定你真的沒有事情要列入待辦嗎?")
        return
    }
    let obj ={};
    obj.todo = addtxt.value;
    obj.status =  "未完成"
    data.push(obj);
    pageNumber = 0;
    init();
})

// 刪除todo
list.addEventListener('click',function(e){
    if (e.target.getAttribute('value') == "x" ){
        let num = e.target.getAttribute('data-num');
        data.splice(num,1);
        init();
    }
})

//checkbox 更改 status
list.addEventListener('click',function(e){
    let num = e.target.getAttribute('data-num');
    if (e.target.getAttribute('type') == "checkbox" && data[num].status == "未完成"){
        data[num].status = "done";
        
    }
    else if (e.target.getAttribute('type') == "checkbox" && data[num].status == "done"){
        data[num].status = "未完成";
    }
    
    init();
})

// filter篩選器
filter.addEventListener('click',function(e){
    if (e.target.value == "全部"){
        pageNumber = 0;
    }
    else if (e.target.value == "待完成"){
        pageNumber = 1;
    }
    else if (e.target.value == "已完成"){
        pageNumber = 2;
    }
    init();
})


deleteAll.addEventListener("click",function(e){ // 監聽"刪除已完成"是否被點擊
    let newData = []; // 建立一個新的陣列
    data.forEach(function(item){ // 循環舊的陣列
      if(item.status == "未完成"){ // 判斷是否"未完成"
        newData.push(item) // 未完成的項目就塞到新的陣列裡面
    }
    })
    // 循環結束了
    data = newData; // 把舊的陣列改成新的（剩下未完成數據的）陣列
    pageNumber = 0;
    init(); // 渲染畫面
})

//run!!!!!
init()
