
//input json
function loadItems() {
    return fetch('data/data.json')
        .then(somethings => somethings.json())
        .then(json => json.items);
}

//list view
function setDisplay(items) {
    const container = document.querySelector('.list');
    container.innerHTML =
        items.map(item => createHTML(item)).join('');

}

//create HTML from the given data
function createHTML(item) {
    return '<li class="item" >\n' +
        '            <img src="'+item.image+'" alt="image" class="itemPoint" data-key="image" data-value="'+item.image+'">' +
        '            <span class="itemDetail">'
                        +item.gender+' / '+item.size+' / '+item.color+
                    '</span>\n' +
        '   </li>';
}

//click button
function setEvent(items) {
    const logo = document.querySelector('.logo');
    logo.addEventListener('click',() => setDisplay(items));
    const buttons = document.querySelector('.middle');
    buttons.addEventListener('click',event => onButtonClick(event,items));
    const selected = document.querySelector('.list');
    selected.addEventListener('click',event1 => selectItem(event1,items));
}

//show list
function onButtonClick(event,items) {
    const dataset = event.target.dataset;
    //console.log(dataset);
    const key = dataset.key;
    //console.log(key);
    const value = dataset.value;
    //console.log(value);
    if((key == null) || (value == null)){
        return;
    }
    setDisplay(items.filter(item => item[key] === value));
}

//item select
function selectItem(event1,items) {
    //console.log(items);
    const data = event1.target.dataset;
    //console.log(data);
    const key = data.key;
    //console.log(key);
    const value = data.value;
    //console.log(value);
    if((key == null) || (value == null)){
        return;
    }
    onBoardList(items.filter(item => item[key] === value));
}

//create HTML from the given data
function onBoardList(item) {
    const container = document.querySelector('.myList');

    if(added.length > 5){
        document.querySelector('.myList').style.overflowY= "scroll";
    }

    container.innerHTML =
        item.map(item => createList(item));
}

//show myList
let added =[];
function createList(item) {
    const add = '<li class="myItem">\n' +
        '       <img src="'+item.image+'" alt="item" class="myItemPoint">\n' +
        '       <span class="myItemDetail">'
                +item.gender+' / '+item.color+' / '+item.size+
        '</span>\n' +
        '    </li>'
    added.push(add);
    return added.join('');
}

//save the items
let saveItem=[];
function saveTheItems() {
    if(added.length == 0){
        alert('항목을 선택해주세요');
    }else{
        alert('저장완료 되었습니다.');
    }
    saveItem.push(added);
    itemCancel();
}

//items cancel
function itemCancel() {
    added=[];
    const container = document.querySelector('.myList');
    container.innerHTML = '';

    document.querySelector('.list').style.marginLeft ="370px";
    document.querySelector('.myList').style.display ="none";
    document.querySelector('.save').style.display ="none";
    document.querySelector('.cancel').style.display ="none";
    document.querySelector('.arrow').style.display ="none";
    document.querySelector('.myList').style.overflowY= "hidden";
}

//wishList
function setWish() {
    document.querySelector('.wrap').style.display = "none";
    document.querySelector('.addButton').style.display = "none";
    document.querySelector('.wishBtn').style.display = "flex";
    document.querySelector('.wish').style.display = "flex";

    const container = document.querySelector('.wishList');

    if(saveItem.length > 0){
        document.querySelector('.wishList').style.overflowY = "scroll";
    }

    container.innerHTML = saveItem.join('').replaceAll(',',"");
}

//itemsListShow
function itemsShow() {
    document.querySelector('.wrap').style.display = "flex";
    document.querySelector('.addButton').style.display = "flex";
    document.querySelector('.wishBtn').style.display = "none";
    document.querySelector('.wish').style.display = "none";
}

function clearWishList() {
    saveItem=[];
    document.querySelector('.wishList').style.overflowY = "hidden";
    const container = document.querySelector('.wishList');
    container.innerHTML = '';
}

function showMyList() {
    const list = document.querySelector('.list');
    list.addEventListener('click',()=> moveList());
}
function moveList() {
    document.querySelector('.list').style.marginLeft ="0px";
    document.querySelector('.myList').style.display ="inline-block";
    document.querySelector('.save').style.display ="flex";
    document.querySelector('.cancel').style.display ="flex";
    document.querySelector('.arrow').style.display ="inline-block";
}

loadItems()
    .then(items => {
       setDisplay(items);
       setEvent(items);
       showMyList();
    })
    .catch(console.log);
