const Slider = (sliderSelector, contentSelector, slidesSelector) => {
    const slider = document.querySelector(sliderSelector);
    const content = document.querySelector(contentSelector);
    const slides = document.querySelectorAll(slidesSelector);
    const slidesNumber = slides.length;
    let scrollLock = false;
    
    function sliderInit(){
        const firstSlide = slides[0], lastSlide = slides[slidesNumber - 1];
        const cloneFirst = firstSlide.cloneNode(true);
        const cloneLast = lastSlide.cloneNode(true);
        content.appendChild(cloneFirst);
        content.insertBefore(cloneLast, firstSlide);
        content.style.transform = `translateX(-100%)`;

        let controlArrowLeft = document.createElement('i');
        controlArrowLeft.classList.add('fa-solid', 'fa-chevron-left', 'slider__control-arrow', 'left');
        slider.appendChild(controlArrowLeft);
        controlArrowLeft.addEventListener('click', moveBackward);

        let controlArrowRight = document.createElement('i');
        controlArrowRight.classList.add('fa-solid', 'fa-chevron-right', 'slider__control-arrow', 'right');
        slider.appendChild(controlArrowRight);
        controlArrowRight.addEventListener('click', moveForward);

        let markerContainer = document.createElement('div');
        markerContainer.classList.add('slider__markers');
        slider.appendChild(markerContainer);

        for(let i = 0; i < slidesNumber; i++){
            let marker = document.createElement('div');
            marker.classList.add('slider__marker');
            marker.style.width = `calc((100% / ${slidesNumber}) - 2px)`;
            if(i === 0) marker.classList.add('active');
            markerContainer.appendChild(marker);
            marker.addEventListener('click', () => moveToSlide(i + 1));
        }

        content.addEventListener('transitionend', finishTransition)
        content.addEventListener('transitionstart', () => { scrollLock = true });
    }

    if(slidesNumber > 1) sliderInit();
    const markers = document.querySelectorAll('.slider__marker');

    let currentBias = 0;
    let currentSlide = 1;

    function updateMarker(id){
        for(let i = 0; i < markers.length; i++){
            if(markers[i].classList.contains('active')){
                markers[i].classList.remove('active');
            }
            if(i === id){
                markers[i].classList.add('active');
            }
        }
    }

    function finishTransition(){
        content.classList.remove('transition');
        scrollLock = false;
        if(currentSlide > slidesNumber){
            content.style.transform = `translateX(-100%)`;
            currentSlide = 1;
        }
        else if(currentSlide < 1){
            content.style.transform = `translateX(-${slidesNumber * 100}%)`;
            currentSlide = slidesNumber;
        }
    }

    function moveToSlide(id){
        content.classList.add('transition');
        currentBias = id * 100;
        const updateMarkerId = id === 0 ? slidesNumber - 1 : id === slidesNumber + 1 ?  0 : id - 1;
        updateMarker(updateMarkerId);
        currentSlide = id;
        content.style.transform = `translateX(-${currentBias}%)`;
    }

    function moveForward(){
        if(scrollLock === false){
            currentSlide++;
            moveToSlide(currentSlide);
        }
    }

    function moveBackward(){
        if(scrollLock === false){
            currentSlide--;
            moveToSlide(currentSlide);
        }
    }

    let touchstartX = 0;
    let touchendX = 0;
    let swipeThreshold = window.innerWidth > 1024 ? window.innerWidth / 8 : window.innerWidth / 4;

    content.addEventListener('touchstart', (e) => {
        touchstartX = e.changedTouches[0].screenX;
    }, false);
    content.addEventListener('touchend', (e) => {
        touchendX = e.changedTouches[0].screenX;
        detectSwipe();
    }, false);

    function detectSwipe(){
        if(touchendX > touchstartX && touchendX - touchstartX > swipeThreshold){
            moveBackward();
        }
        if(touchendX < touchstartX && touchstartX - touchendX > swipeThreshold){
            moveForward();
        }
    }
}

export default Slider;