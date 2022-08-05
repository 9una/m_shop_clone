/* 이미지 탭 */
function imgView(){
    const imgTab = document.querySelector('.item-img');
    const images = imgTab.querySelectorAll('.img-main img');
    const pagination = imgTab.querySelector('.pagination');
    const dot = pagination.querySelectorAll('.dot');
    let curPos = 0;

    function prev(){
        if(curPos < 1){
            curPos = images.length - 1;
        }else {
            curPos -= 1;
        }

        //pagination
        let j = 0,
            k = 0;
        while(j < dot.length){
            dot[j++].classList.remove('active');
            images[k++].classList.remove('active');
        }
        dot[curPos].classList.add('active');
        images[curPos].classList.add('active');
    }
    function next(){
        if(curPos < images.length - 1){
            curPos += 1;
        }else {
            curPos = 0;
        }

        //pagination
        let j = 0,
            k = 0;
        while(j < dot.length){
            dot[j++].classList.remove('active');
            images[k++].classList.remove('active');
        }
        dot[curPos].classList.add('active');
        images[curPos].classList.add('active');
    }

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

    imgTab.addEventListener('touchstart', touchStart);
    imgTab.addEventListener('touchend', touchEnd);
};
imgView();


// 추천상품 더보기
const recomList = document.querySelector('.recommend-list');
function moreItem(event){
    recomList.classList.toggle('show3');
    const btn = event.currentTarget;
    if(btn.style.transform !== "rotate(180deg)"){
        btn.style.transform = "rotate(180deg)";
    }else {
        btn.style.transform = "rotate(360deg)";
    }
}

// 상세페이지 펼쳐보기
const detailsBtn = document.querySelector('.details-more-btn');
const detailsImg = document.querySelector('.details-img');
detailsBtn.addEventListener('click', ()=>{
    detailsImg.style.maxHeight = "100%";
    detailsBtn.remove();
});

// 상품필수 정보 펼쳐보기
const infoBtn = document.querySelector('.details-info-btn');
const infoCont = document.querySelector('.details-info-table');
    
infoBtn.addEventListener('click',()=>{
    infoBtn.classList.toggle('active');
    infoCont.classList.toggle('active');
});

// 수량,가격 창 오픈
const orderCont = document.querySelector('.order-cont');
const orderTab = document.querySelector('.order-tab');
const orderTabInner = orderTab.innerHTML;

function openCalc(){
    orderCont.classList.add('visible');
    orderTab.innerHTML = `<button class="cart-btn" onclick="goCart()">장바구니 담기</button>
    <button class="order-btn" onclick="location.href='order.html'">구매</button>`;
}

// 장바구니,구매 -> 장바구니
function goCart(){
    if(confirm('상품을 장바구니에 담았습니다. 장바구니로 이동하시겠습니까?')){
        location.href="cart.html";
    }
}
// 장바구니,구매 -> 구매
function closeCalc(){
    orderCont.classList.remove('visible');
    orderTab.innerHTML = orderTabInner;
}

/* 총 합계금액 - s */

const totalItemList = document.querySelector('.total-item');

let calc = {
    totalPrice : 0,
    /* 개별 수량 변경 */
    changePNum: function () {
        const item = document.querySelector('input[name=item_num]');
        const item_num = parseInt(item.getAttribute('value'));  //1
        const newval = event.target.classList.contains('up') ? item_num+1 : event.target.classList.contains('down') ? item_num-1 : event.target.value;
        
        if (parseInt(newval) < 1 || parseInt(newval) > 99) { return false; }

        item.setAttribute('value', newval);
        item.value = newval;

        const price = document.querySelector('.info-table .p_price').getAttribute('value');
        item.parentElement.nextElementSibling.lastElementChild.innerHTML = `<b>${(newval * price).formatNumber()}</b>원`;

        //전송 처리 결과가 성공이면    
        this.reCalc();
        this.updateUI();
    },
    /* 추가상품 목록 아이템 추가 */
    addItem : function(){
        const addItemSelect = document.getElementById('add-select');
        const selectText = addItemSelect.options[addItemSelect.selectedIndex].text;
        const addItem = document.createElement("div");

        addItem.className = "selected-item item-additem";
        addItem.innerHTML = `
            <span class="name">${selectText}</span>
            <span class="price">
                <input type="hidden" class="item_p" value="2600">
                <b>2,600</b>원
            </span>
            <button type="button" class="remove-btn" onclick="javascript:calc.deleteItem(event)"><i class="fas fa-times"></i></button>
        `;
        totalItemList.appendChild(addItem);
        
        this.reCalc();
        this.updateUI();
    },
    /* 추가상품 아이템 삭제 */
    deleteItem : function(event){
        const item = event.currentTarget.parentElement;
        item.remove();
        
        this.reCalc();
        this.updateUI();
    },
    reCalc: function(){
        this.totalPrice = 0;
        document.querySelectorAll(".item_num").forEach(function (item) {
            const count = parseInt(item.getAttribute('value'));
            const price = parseInt(document.querySelector('.info-table .p_price').getAttribute('value'));
            if(document.querySelector('.item-additem')){
                const addItem = document.querySelectorAll('.item-additem');
                for(let i = 0; i < addItem.length; i++){
                    const addPrice = parseInt(addItem[i].querySelector('.item_p').getAttribute('value'));
                    this.totalPrice += addPrice;
                }
                this.totalPrice += count * price;
            }else {
                this.totalPrice += count * price;
            }
        }, this); // forEach 2번째 파라메터로 객체를 넘겨서 this 가 객체리터럴을 가리키도록 함. - thisArg
    },
    //화면 업데이트
    updateUI: function () {
        document.querySelector('#total-price').innerHTML = `총 합계금액
        <span><b>${this.totalPrice.formatNumber()}</b>원</span>`;
    }
}
// 숫자 3자리 콤마찍기
Number.prototype.formatNumber = function(){
    if(this==0) return 0;
    let regex = /(^[+-]?\d+)(\d{3})/;
    let nstr = (this + '');
    while (regex.test(nstr)) nstr = nstr.replace(regex, '$1' + ',' + '$2');
    return nstr;
};

/* 총 합계금액 - e */