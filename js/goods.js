/* item filter - s */
//필터 탭
const filterTab = document.querySelectorAll('.filter-type button');
const filterCont = document.querySelectorAll('.filter-cont .cont');
for(let i = 0; i < filterTab.length; i++){
    filterTab[i].addEventListener('click', ()=>{
        if(filterTab[i].classList.contains('active')){
            filterTab[i].classList.remove('active');
            filterCont[i].classList.remove('active');
        }else {
            let j = 0,
            k = 0;
            while(j < filterTab.length){
                filterTab[j++].classList.remove('active');
                filterCont[k++].classList.remove('active');
            }
            filterTab[i].classList.add('active');
            filterCont[i].classList.add('active');
        }
    })
}

//아이템필터
const filterItem = document.querySelectorAll('#filter .cont');

const addFilter = document.querySelector('#checked');
const addFilterItem = document.querySelector('#checked .cont');

for(let i = 0; i < filterItem.length; i++) {
    const filterBtn = filterItem[i].querySelectorAll('button');

    for(let j = 0; j < filterBtn.length; j++){
        const addItemName = filterBtn[j].innerText;

        filterBtn[j].addEventListener("click", ()=>{
            if(filterBtn[j].classList.contains('checked') === false){
                filterBtn[j].classList.add('checked');
                const divItem = document.createElement("div");
                divItem.innerHTML = `${addItemName}<button type="button" onclick="deleteItem(event)"><i class="fas fa-times"></i></button>`;
                addFilterItem.appendChild(divItem);
            }
            const addFilterBtnItem = addFilterItem.querySelectorAll('div');
            if(addFilterBtnItem.length >= 1){
                addFilter.classList.add('on');
            }
        });
    }
}

function deleteItem(event){
    const addFilterItemCur = event.currentTarget.parentNode; //divItem
    const addFilterBtnItem = addFilterItem.querySelectorAll('div');

    const checkedBtn = document.querySelectorAll('#filter .checked');
    for(let i = 0; i < checkedBtn.length; i++){
        if(checkedBtn[i].innerText === addFilterItemCur.innerText){
            checkedBtn[i].classList.remove('checked');
        }
    }
    addFilterItemCur.remove();
    if(addFilterBtnItem.length <= 1){
        addFilter.classList.remove('on');
    }
}

function deleteAll(){
    addFilterItem.innerHTML = "";

    const checkedBtn = document.querySelectorAll('#filter .checked');
    for(let i = 0; i < checkedBtn.length; i++){
        if(checkedBtn[i].classList.contains('checked')){
            checkedBtn[i].classList.remove('checked');
        }
    }
    addFilter.classList.remove('on');
}
/* item filter - e */

/* event banner slide */
function eventSlide(){
    let curPos = 0,
        position = 0;
    const slide = document.querySelector('.event-slide .slide'),
        list = slide.querySelector('ul'),
        item = slide.querySelectorAll('li'),
        itemWidth = 100 / item.length;
        
    const pagination = document.querySelector('.event-slide .pagination');
    const dot = pagination.querySelectorAll('.dot');

    function prev(){
        if(curPos < 1){
            curPos = item.length - 1;
        }else {
            curPos -= 1;
        }
        position = curPos * itemWidth;
        list.style.transform = `translateX(-${position}%)`;

        //pagination
        let j = 0;
        while(j < dot.length){
            dot[j++].classList.remove('active');
        }
        dot[curPos].classList.add('active');
    }
    function next(){
        if(curPos < item.length - 1){
            curPos += 1;
        } else {
            curPos = 0;
        }
        position = curPos * itemWidth;
        list.style.transform = `translateX(-${position}%)`;

        //pagination
        let j = 0;
        while(j < dot.length){
            dot[j++].classList.remove('active');
        }
        dot[curPos].classList.add('active');
    }

    //touch
    let start_x, end_x;

    function touchStart(event){
        start_x = event.touches[0].pageX;
    }
    function touchEnd(event){
        end_x = event.changedTouches[0].pageX;
        if(start_x > end_x){
            next();
        }else {
            prev();
        }
    }
    slide.addEventListener('touchstart', touchStart);
    slide.addEventListener('touchend', touchEnd);

    function play(){
        setInterval(next, 3500);
    }
    play();
}
eventSlide();

/* cart button */
const goodsItem = document.querySelectorAll('.list-item');
for(let i = 0; i < goodsItem.length; i++){
    const cartBtn = goodsItem[i].querySelector('.goods-cart');
    cartBtn.addEventListener("click", ()=>{
        if(cartBtn.classList.contains('on') === false){
            alert("장바구니에 상품이 추가되었습니다.");
            cartBtn.classList.add('on');
            cartBtn.style.color = "#e4130c";
        }else{
            if(confirm("이미 같은 상품이 장바구니에 추가되어 있습니다. 장바구니로 이동하시겠습니까?")){
                location.href="../cart.html";
            };
        }
    })
}

// view item - gallery or list type change

const viewType = document.querySelectorAll('.view-item-num button');
const list = document.querySelector('.goods__list .list-box');

for(let i = 0; i < viewType.length; i++){
    viewType[i].addEventListener('click', ()=>{
        let j = 0;
        while(j < viewType.length){
            viewType[j++].classList.remove('active');
        }
        if(i == 0){
            //list-type
            list.className = 'list-box row';
        }else if (i == 1){
            //gallery-type
            list.className = 'list-box column';
        }
        viewType[i].classList.add('active');
    })
}