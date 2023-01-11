const Hamburger = (buttonSelector, menuSelector) => {
    const button = document.querySelector(buttonSelector);
    const menu = document.querySelector(menuSelector);

    button.addEventListener('click', toggleMenu);

    window.addEventListener('click', (e) => {
        if(!e.target.matches(menuSelector) && !e.target.matches(buttonSelector)){
            menu.classList.remove('active');
        }
    })

    function toggleMenu(){
        menu.classList.toggle('active');
    }
}

export default Hamburger;