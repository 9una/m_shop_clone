/* faq */
const faqQuestion = document.querySelectorAll('.faq-table .faq-q');
const faqAnswer = document.querySelectorAll('.faq-table .faq-a');

for(let i = 0; i < faqQuestion.length; i++){
    const qTitle = faqQuestion[i].querySelector('.q-title').innerText;
    faqAnswer[i].querySelector('.q').innerHTML = qTitle;
    // faq-q의 q-title 텍스트를 faq-a 의 q 안에 넣음

    function onclick(){

    }
    faqQuestion[i].onclick = function(){
        if(faqAnswer[i].classList.contains('active') === true){
            faqAnswer[i].classList.remove('active');
            // faq-a[i]의 active가 이미 추가되어있을때 toggle처럼 active를 제거
        } else {
            let j = 0;
            while(j < faqQuestion.length){
                faqAnswer[j++].classList.remove('active');
            }
            faqAnswer[i].classList.add('active');
            // faq-q[i] 탭 클릭시 faq-a[i]만 active추가
        }
    }
} 