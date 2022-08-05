let basket = {
    totalCount: 0, 
    totalPrice: 0,
    //체크한 상품 지우기
    delCheckedItem: function(){
        document.querySelectorAll("input[name=buy]:checked").forEach(function (item) {
            item.parentElement.parentElement.parentElement.remove();
        });

        this.itemCheck();
        this.reCalc();
        this.updateUI();
        this.reTotal();
        this.updateTotal();
    },
    //재계산
    reCalc: function(){
        this.totalCount = 0;
        this.totalPrice = 0;
        document.querySelectorAll(".p_num").forEach(function (item) {
            if(item.parentElement.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling.firstElementChild.checked == true){
                const count = parseInt(item.innerText);
                const price = item.parentElement.parentElement.previousElementSibling.firstElementChild.getAttribute('value');
                this.totalPrice += count * price;
            }
        }, this); // forEach 2번째 파라메터로 객체를 넘겨서 this 가 객체리터럴을 가리키도록 함. - thisArg
    },
    //합계금액
    reTotal: function(){
        if(document.querySelector('.coupon_p')){
            //쿠폰할인이 있는경우 사용
            const coupon = parseInt(document.querySelector('.coupon_p').getAttribute('value'));
            this.totalPrice -= coupon;
        }
        
        const delivery = parseInt(document.querySelector('.delivery_p').getAttribute('value'));
        this.totalPrice += delivery;
    },
    //상품 - 화면업데이트
    updateUI: function () {
        if(!document.querySelector('.row.data')){
            //선택상품이 남아있지않은경우 = 모두삭제한 경우와 같은 화면
            document.querySelector('.coupon-use').remove();
            document.querySelector('.delivery-plus').innerHTML = `
                <p>배송비<br>
                <input type="hidden" name="delivery_p" class="delivery_p" value="0">
                <span class="delivery_price">0</span>원</p>
            `;
            document.querySelector('.basket').classList.add('empty');
            document.querySelectorAll('.row.data').forEach(function (item){
                item.remove();
            })
        }
        document.querySelector('.sum_p_price').innerHTML = `상품금액<br><span>${this.totalPrice.formatNumber()}</span>원`;
    },
    //상품 + 배송비 - 화면업데이트
    updateTotal: function (){
        document.querySelector('.price-last p').innerHTML = `합계금액<br><span>${this.totalPrice.formatNumber()}</span>원`
    },
    checkItem: function () {
        this.reCalc();
        this.updateUI();
        this.reTotal();
        this.updateTotal();
    },
    //나머지 아이템:checked
    itemCheck: function(){
        document.querySelectorAll("input[name=buy]").forEach(function (item) {
            item.checked = "checked";
        });
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