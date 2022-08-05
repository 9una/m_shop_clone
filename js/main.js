function mainSlide(){
    const slide = document.querySelector('.hero-banner'),
        list = slide.querySelector('.slide-banner ul'),
        item = slide.querySelectorAll('.slide-banner li'),
        pagination = slide.querySelector('.pagination'),
        prevBtn = slide.querySelector('.prev-btn'),
        nextBtn = slide.querySelector('.next-btn'),
        slideWidth = 100,
        slideSpeed = 600,
        startNum = 0;

    list.style.width = slideWidth * (item.length + 2) + '%'; //500%

    // Copy first and last slide
    let firstChild = list.firstElementChild;
    let lastChild = list.lastElementChild;
    let clonedFirst = firstChild.cloneNode(true);
    let clonedLast = lastChild.cloneNode(true);

    // Add copied Slides
    list.appendChild(clonedFirst); 
    list.insertBefore(clonedLast, list.firstElementChild);

    // Add pagination dynamically
    let pageChild = '';
    for(let i = 0; i < item.length; i++){
    pageChild += `<li class="dot`;
    pageChild += (i === startNum) ? ' dot_active' : '';
    pageChild += `" data-index="` + i + `"><button type="button"></button></li>`;
    }
    pagination.innerHTML = pageChild;
    const pageDots = document.querySelectorAll('.dot');

    list.style.transform = "translate3d(-" + (slideWidth * (startNum + 1) / 5) + "%, 0px, 0px)";

    let curIndex = startNum;
    let curSlide = item[curIndex];
    curSlide.classList.add('item_active');

    /* pagination */
    let curDot;
    Array.prototype.forEach.call(pageDots, function(dot, i){
    dot.addEventListener('click', function(e){
        e.preventDefault();
        curDot = document.querySelector('.dot_active');
        curDot.classList.remove('dot_active');

        curDot = this;
        this.classList.add('dot_active');

        curSlide.classList.remove('item_active');
        curIndex = Number(this.getAttribute('data-index'));
        curSlide = item[curIndex];
        curSlide.classList.add('item_active');
        list.style.transition = slideSpeed + "ms";
        list.style.transform = "translateX(-" + (slideWidth * (curIndex + 1) / 5) + "%)";
    });
    })

    function prev(){
    if(curIndex >= 0){
        list.style.transition = slideSpeed + "ms";
        list.style.transform = "translateX(-" + (slideWidth * curIndex / 5) + "%)";
    }
    if(curIndex === 0){
        setTimeout(function(){
        list.style.transition = "0ms";
        list.style.transform = "translateX(-" + (slideWidth * item.length / 5) + "%)";
        }, slideSpeed);
        curIndex = item.length;
    }
    curSlide.classList.remove('item_active');
    pageDots[(curIndex === item.length) ? 0 : curIndex].classList.remove('dot_active');
    curSlide = item[--curIndex];
    curSlide.classList.add('item_active');
    pageDots[curIndex].classList.add('dot_active');
    }

    function next(){
        if(curIndex <= item.length -1){
            list.style.transition = slideSpeed + "ms";
            list.style.transform = "translateX(-" + (slideWidth * (curIndex + 2) / 5) + "%)";
        }
        if(curIndex === item.length - 1){ 
            setTimeout(function(){
            list.style.transition = "0ms";
            list.style.transform = "translateX(-" + slideWidth / 5 + "%)";
            },slideSpeed);
            curIndex = -1;
        }
        curSlide.classList.remove('item_active');
        pageDots[(curIndex === -1) ? item.length - 1 : curIndex].classList.remove('dot_active');
        curSlide = item[++curIndex];
        curSlide.classList.add('item_active');
        pageDots[curIndex].classList.add('dot_active');
        
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
mainSlide();