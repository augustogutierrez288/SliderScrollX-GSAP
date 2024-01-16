let target = 0;
let current = 0;
let ease = 0.075;

const slider = document.querySelector(".slider");
const sliderWrapper = document.querySelector(".slider-wrapper");
const marketWrapper = document.querySelector(".market-wrapper");
const activeSlide = document.querySelector(".active-slide");

let maxScroll = sliderWrapper.offsetWidth - window.innerWidth;

function lerp(start, end, factor){
    return start + (end - start ) * factor;
}

function updateActiveSliderNumber(marketMove, marketMaxMove){
    const partWidth = marketMaxMove / 5;
    let currentPart = Math.round((marketMove - 200) / partWidth) + 1;
    currentPart = Math.min(5, currentPart);
    activeSlide.textContent = `${currentPart}/5`;
}

function update(){
    current = lerp(current, target, ease);

    gsap.set(".slider-wrapper", {
        x: -current,
    });

    let moveRatio = current / maxScroll;

    let marketMaxMove = window.innerWidth - marketWrapper.offsetWidth - 170;

    let marketMove = 70 + moveRatio * marketMaxMove;

    gsap.set(".market-wrapper",{
        x: marketMove,
    });

    updateActiveSliderNumber(marketMove, marketMaxMove);

    requestAnimationFrame(update);
}

window.addEventListener("resize", () => {
    maxScroll = sliderWrapper.offsetWidth - window.innerWidth;
})

window.addEventListener("wheel", (e) => {
    target += e.deltaY;
    target = Math.max(0, target);
    target = Math.min(maxScroll, target);
});

update();
