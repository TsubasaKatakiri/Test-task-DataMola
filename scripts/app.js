import Hamburger from "./modules/hamburger.js";
import Slider from "./modules/slider.js";

window.addEventListener('DOMContentLoaded', () => {
    Slider('.slider', '.slider__content', '.slide');
    Hamburger('.navbutton', '.dropdown')
})