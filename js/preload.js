import { gsap } from '/js/gsap/gsap-core.js';
import { ScrollToPlugin } from "/js/gsap/ScrollToPlugin.js";
import { ScrollTrigger } from "/js/gsap/ScrollTrigger.js";
import { CSSPlugin } from "/js/gsap/CSSPlugin.js";
gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CSSPlugin);
gsap.registerPlugin()




window.addEventListener('load', () => {
    let element = document.querySelector('.preloader__container__percent');
    let loader = document.querySelector('.preloader__container');
    let preloader = document.querySelector('.preloader');
    let count = 0;
    let counter = setInterval(() => {
        if (count <= 100) {
            element.textContent = count + '%';
            loader.style.width = count + '%';
            count++;
        } else {
            clearInterval(counter);
            fadeOut(preloader);
        }
    }, 20);
  
      //  fadeout
      function fadeOut() {
        gsap.to('.preloader', 0.8, {delay: 0.5, y:'-100%', ease:"power3.easeInOut"})
    }
});