//주문상품 리스트 펼침/닫힘
const btn = document.querySelector('.basket-btn');

function listToggle(){
    btn.classList.toggle('active');

    const basket = document.querySelector(".basket");
    const item = document.querySelectorAll('.basket .row');
    const firstItemName = item[0].querySelector('.item .text .p_name span:first-child').innerText;
    basket.classList.toggle('invisible');

    const orderName = document.querySelector('.order-name');
    if(orderName.innerHTML == ""){
        orderName.innerHTML = `<span>${firstItemName}</span> 외 <b>${item.length}건</b>`;
    }else{
        orderName.innerHTML = "";
    }
}
listToggle();
btn.addEventListener('click', listToggle);

//배송지 선택
const addressType = document.querySelectorAll('.address-type button');

for(let i = 0; i < addressType.length; i++){
    addressType[i].addEventListener('click', ()=>{
        let j = 0;
        while(j < addressType.length){
            addressType[j++].classList.remove('active');
        }
        addressType[i].classList.add('active');
    });
}


//배송방법 선택에 따른 배송문구 변경
const deliveryRadio = document.querySelectorAll('.delivery input[type="radio"]');
const deliverySpan = document.querySelector('.delivery td span');
for(let i = 0; i < deliveryRadio.length; i++){
    deliveryRadio[i].addEventListener("change",()=>{
        if(i === 0){
            deliverySpan.innerHTML = `※ 금일 오전 10시전 주문시 당일발송, 오후 수령`;
        }else if(i === 1){
            deliverySpan.innerHTML = `※ 금일 오후 5시까지 주문시 당일발송`;
        }
    })
}


//마일리지, 예치금 사용
function inputNumMileage(obj){
    obj.value = comma(uncomma(obj.value));
    const mileageAll = document.querySelector('.mileage .spendAll b').innerText;
    const objNum = obj.value;
    if(parseInt(objNum.replace(",","")) > parseInt(mileageAll.replace(",",""))){
        alert('사용가능한 마일리지 금액을 초과하였습니다.')
        obj.value = "";
    }
}
function inputNumDeposit(obj){
    obj.value = comma(uncomma(obj.value));
    const depositAll = document.querySelector('.deposit .spendAll b').innerText;
    const objNum = obj.value;
    if(parseInt(objNum.replace(",","")) > parseInt(depositAll.replace(",",""))){
        alert('사용가능한 예치금 금액을 초과하였습니다.')
        obj.value = "";
    }
}
function comma(str){
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}
function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}

// 모두사용 버튼
const spendAllTd = document.querySelectorAll('.spend-all-possible');
for(let i = 0; i < spendAllTd.length; i++){
    const spendAllBtn = spendAllTd[i].querySelector('.useall-btn');
    const spendAllNum = spendAllTd[i].querySelector('.spendAll b').innerText;
    const spendInput = spendAllTd[i].querySelector('input');
    
    spendAllBtn.addEventListener('click', ()=>{
        spendInput.value = spendAllNum;
    }); 
}

//결제수단 선택에 따른 결제수단 문구 변경
const paymentType = document.querySelectorAll('.payment-type label'), //1
      basic = document.querySelector('.payment-cont-basic'),
      escrow = document.querySelector('.payment-cont-escrow'),
      basicCont1 = document.querySelectorAll('.cont-basic-1 label'), //2
      basicCont2 = document.querySelector('.cont-basic-2'), //3
      paymentTab = basicCont2.querySelector('div'), //3
      escrowCont = document.querySelector('.cont-escrow'); //2

const tbody = document.querySelector('.payment tbody');
const cashHtml = `<div class="cash-receipts-result">
<div>
    <div><input type="radio" name="receiptsType" checked id="income">
    <label for="income">소득공제용</label></div>
    <div><input type="radio" name="receiptsType" id="expenditure">
    <label for="expenditure">지출증빙용</label></div>
</div>
<div>
    <label for="number">휴대폰번호</label>
    <input id="number" type="number" placeholder="숫자를 입력해 주세요.">
</div>
</div>`;
const taxHtml = `<div class="tax-bills-result">
<p>세금계산서 발급 및 신청은 결제일로부터 익월 10일까지 가능합니다.</p>
<ul>
    <li>
        <label for="businessNum">사업자번호</label>
        <input type="number" required id="businessNum">
    </li>
    <li>
        <label for="companyName">회사명</label>
        <input type="text" required id="companyName">
    </li>
    <li>
        <label for="CeoName">대표자명</label>
        <input type="text" required id="CeoName">
    </li>
    <li>
        <label for="statusName">업태</label>
        <input type="text" required id="statusName">
    </li>
    <li>
        <label for="typeName">종목</label>
        <input type="text" required id="typeName">
    </li>
    <li>
        <label for="companyAddress">사업장주소</label>
        <input type="number" required id="companyAddress" placeholder="우편번호">
        <button type="button">우편번호검색</button>
        <input type="text" required id="companyAddress" placeholder="주소를 입력해주세요">
        <input type="text" required id="companyAddress" placeholder="상세주소를 입력해주세요">
    </li>
</ul>
</div>`;


for(let i = 0; i < paymentType.length; i++){
    const type = paymentType[i].querySelector('input[type="radio"]');
    type.addEventListener('change', ()=>{
        if(i === 0){
            basic.style.display = "block";
            escrow.style.display = "none";
            cont2();
        }else if(i === 1){
            basic.style.display = "none";
            escrow.style.display = "block";
        }
    })
}

const easyPayinner = basicCont2.innerHTML;

function cont2(){
    for(let i = 0; i < basicCont1.length; i++){
        const type = basicCont1[i].querySelector('input[type="radio"]');
        type.addEventListener('change', ()=>{
            if (i == 0){
                basicCont2.style.display = "block";
                basicCont2.innerHTML = easyPayinner;
            }else if (i == 1) {
                basicCont2.style.display = "block";
                basicCont2.innerHTML = `
                    <h5 class="info-title">무통장입금</h5>
                    <table>
                        <tr><th>계좌정보</th><td><select><option>선택하세요.</option><option>농협 367-07-048922 (주)세이지그린</option><option>우리 850-149301-13-101 (주)세이지그린</option><option>국민 816901-04-139520 (주)세이지그린</option><option>하나 777-910013-89904 (주)세이지그린</option><option>신한 140-008-288663 (주)세이지그린</option></select></td></tr>
                        <tr><th>입금자명</th><td><input type="text"/></td></tr>
                    </table>
                `;
            }else {
                basicCont2.style.display = "none";
            }
        })
    }
}
cont2();

//최종결제금액 탭
const totalDetails = document.querySelector('.price-details');
const totalBtn = document.querySelector('.total-price > p i');
totalBtn.addEventListener('click', ()=>{
    totalBtn.classList.toggle('click');
    totalDetails.classList.toggle('visible');
})

//최종결제금액 계산 = 상품 총 합 - 마일리지 - 쿠폰 + 배송비
let totalPrice = 0;
const totalP = document.querySelector(".total-price p strong");
function totalCalc(){
    const value = document.querySelectorAll(".basket .sum_price");
    for(let i = 0; i < value.length; i++){
        const sum = parseInt(value[i].getAttribute('value'));
        totalPrice += sum;
    }
    const itemTotal = document.querySelector('.item-all-price span b');
    itemTotal.innerText = Number(totalPrice).toLocaleString();//상품합계
    const point = parseInt(document.querySelector('.point_p').getAttribute('value'));
    const coupon = parseInt(document.querySelector('.coupon_p').getAttribute('value'));
    const delivery = parseInt(document.querySelector('.delivery_p').getAttribute('value'));
    totalPrice -= point; // - 마일리지,예치금
    totalPrice -= coupon; // - 쿠폰
    totalPrice += delivery; // + 배송비
    totalP.innerText = Number(totalPrice).toLocaleString();
}
totalCalc();
