const searchEl = document.querySelector('.search')
const searchInputEl = document.querySelector('input')

searchEl.addEventListener('click', () => {
    searchInputEl.focus()
})
searchInputEl.addEventListener('focus', () => {
    searchEl.classList.add('focused')
    searchInputEl.setAttribute('placeholder', '통합검색')
})

searchInputEl.addEventListener('blur', () => {
    searchEl.classList.remove('focused')
    searchInputEl.setAttribute('placeholder', '')
})

//화면 스크롤이 일정길이 이상 길어지면 Badge가 Scroll되도록 : GSAP 애니메이션 효과 사용
const badegEl = document.querySelector("header .badges")
const topEl = document.getElementById('to-top')

topEl.addEventListener('click', ()=>{
    window.scrollTo({top:0, left:0, behavior:'auto'});
})

/* 외부에서 가져오는 함수의 양이 너무 많음=>속도에 치명적
window.addEventListener('scroll', ()=>{
    console.log('Scroll');
})*/
//외부에서 가져오는 함수량을 제어 ==>lodash 사용
// _.throttle(func, [wait=0], [options={}]) : 스코롤 작업시 함수가 많이 실행 될 때 3초 간격으로 실행되도록
window.addEventListener('scroll',_.throttle(()=>{
    // console.log(scrollY)
    if(scrollY>500){
        //배지숨기기
        gsap.to(badegEl, .6, {
            opacity: 0,
            display : 'none'
        })
        //Home버튼 보여지기
        gsap.to(topEl, .2, {
            x:0
        })
    }
    else{
        //배지보여주기
        gsap.to(badegEl, .6, {
            opacity: 1,
            display : 'block'
        })
        //Home버튼 숨기기
        gsap.to(topEl, .2, {
            x: 100
        })
    }
},300))

//GSAP & SCROLL TO PLUG IN 사용
//커피 이미지가 시간 차를 두고 화면에 순차적으로 표현되도록 애니메이션 효과를 주도록 설정
const fadeEls = document.querySelectorAll('.visual .fade-in')
fadeEls.forEach((fadeEl, index) => {
    //gsap.to (요소명, 지속시간(초), 옵션)
    gsap.to(fadeEl, 1, {
        delay: (index + 1) * .7, //지연시간 0.7 1.4 2.1 2.7
        opacity: 1
    })
})

//슬라디어 요소관리
// 공지사항 슬라이더 --> swiper slide 사용
// ==> 사용법 : new swiper(요소, 옵션)
new Swiper('.notice-line .swiper-container', {
    // Optional parameters
    direction: 'vertical',
    autoplay: true,
    loop: true
});

// promotion 슬라디어 작업 --> swiper slider 사용
new Swiper('.promotion .swiper-container', {
    // Optional parameters
    // direction: 'horizental', //수평배열
    autoplay: {
        delay: 4000
    },
    loop: true, //반복재생
    slidesPerView: 3, //한번에 보여질 슬라이더 수 
    spaceBetween: 10, //슬라이드 사이 여백
    centeredSlides: true, //1번 슬라이더가 가운데 배치
    // If we need pagination
    pagination: { //페이지 사용여부
        el: '.promotion .swiper-pagination', //페이지번호 요소 지정
        clickable: true, //제어가능 여부
    },
    // Navigation arrows
    navigation: { //슬라이더 이전/이후 버튼 사용여부
        prevEl: '.promotion .swiper-prev', //이후버튼 요소지정
        nextEl: '.promotion .swiper-next' //이전버튼 요소지정
    }
});

//toggle-promotion 선택처리
const promotionEl = document.querySelector(".promotion")
const promotionToggleBtn = document.querySelector(".toggle-promotion")

let isHidePromotion = false
promotionToggleBtn.addEventListener('click', () => {
    isHidePromotion = !isHidePromotion
    if (isHidePromotion) {
        //숨김처리
        promotionEl.classList.add('hide')
    } else {
        promotionEl.classList.remove('hide')
    }
})


//Floating image 처리

//Floating image 처리
//Random 함수
function random(min, max) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size) {
    //gsap.to (요소명, 지속시간(초), 옵션)
    gsap.to(selector, random(1.5, 2.5), {
        y: size,
        repeat: -1, //무한반복
        yoyo: true, //yoyo효과
        ease: Power1.easeInOut,
        delay: random(0, delay)
    });
}

floatingObject('.floating1', 1, 15)
floatingObject('.floating2', .5, 15)
floatingObject('.floating3', 1.5, 20)

//ScrollMagic
//참고      https://cdnjs.com/libraries/ScrollMagic
//          https://github.com/janpaepke/ScrollMagic?utm_source=cdnjs&utm_medium=cdnjs_link&utm_campaign=cdnjs_library
// new ScrollMagic.Controller();
const spyEls = document.querySelectorAll('section.scroll-spy')
spyEls.forEach((spyEl) => {
    new ScrollMagic.Scene({ //감시하게될 장면을 추가
            triggerElement: spyEl, //감시할 요소
            triggerHook: .8 //화면의 80%지점에서 보여짐 여부 감시
        })
        .setClassToggle(spyEl, 'show') //요소가 화면에 보여지도록 설정
        .addTo(new ScrollMagic.controller()); // assign the scene to the controller
})


