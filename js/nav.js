import { gsap } from '/js/gsap/gsap-core.js';
import { ScrollToPlugin } from "/js/gsap/ScrollToPlugin.js";
import { ScrollTrigger } from "/js/gsap/ScrollTrigger.js";
import { CSSPlugin } from "/js/gsap/CSSPlugin.js";
gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CSSPlugin);
gsap.registerPlugin()





window.addEventListener("orientationchange", function() {
  console.log(screen.orientation);
}, false);





function setNav() {

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  var navtl = gsap.timeline({ paused: true });
  let container = document.querySelector("#hero-wrapper");
  let height;


  function setHeight() {
    height = container.clientHeight;
    document.body.style.height = height + "px";
  }


  ScrollTrigger.addEventListener("refreshInit", setHeight);


  // smooth scrolling container
  gsap.to(container, {
    y: () => -(height - document.documentElement.clientHeight),
    ease: "none",
    scrollTrigger: {
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      invalidateOnRefresh: true
    }
  });

  // scrolltrigger for each slide
  gsap.utils.toArray('.slide').forEach(slide => {
    gsap.to(slide, {
      /* backgroundColor: '#ffffff', */
      scrollTrigger: {
        trigger: slide,
  /*       duration: 1, // seconds
        delay: 0.5, */
        snap: 1,
        start: 'top top',
        toggleActions: 'play none none reverse',
        markers: true,
      }
    });
  });    


  function setupLinks(scroller) {
    let linkElements = gsap.utils.toArray('.topnav a, .mobilenav__link a'),
        linkTargets = linkElements.map(e => document.querySelector(e.getAttribute("href"))),
        linkPositions = [],
        calculatePositions = () => {
          let offset = gsap.getProperty(scroller, "y");
          linkTargets.forEach((e, i) => linkPositions[i] = e.getBoundingClientRect().top - offset);
        };
    
        linkElements.forEach((element, i) => {   
          element.addEventListener("click", e => {
            e.preventDefault();
            gsap.to(window, 2.5, {
              scrollTo: linkPositions[i], 
              ease: "power3.easeInOut", 
              overwrite: true});
          });
        });

    ScrollTrigger.addEventListener("refresh", calculatePositions);
  }


  navtl.to("#hamburger", .3, {scale:0, opacity:0, transformOrigin:"center center", ease: "Back.easeIn"});
  navtl.to("#close", .3, {scale:1, rotation: 270, opacity:1, transformOrigin:"center center", ease: "Back.easeOut"});


  function openNav() {

    animateOpenNav();
    var navBtn = document.getElementById("hamburgericon");
    navBtn.onclick = function (e) {
      navtl.reversed(!navtl.reversed());
      navBtn.classList.toggle("active");
    };
  }


  function closeNav() {
    
    let klickedElements = gsap.utils.toArray('.mobilenav__link a');
    klickedElements.forEach((element, i) => {    
      element.addEventListener("click", e => {
        e.preventDefault();
        animateOpenNav();
      });
    });
  }


  function animateOpenNav() {
    
    var mobileNav = document.getElementById("overlay_mobilenav");
    navtl.to(mobileNav, {duration: 0.8, ease: "power3.easeInOut", y: 0,})
         .to(".mobilenav__link", {opacity: 1,ease: "power3.out", y: 0, duration: 0.8, stagger: 0.2,})
         .reverse(); 
  }


  navtl.from(".scrollline", {
    scrollTrigger: {
      trigger: ".hero-wrapper",
      scrub: true,
      pin: true,
      //markers:true,
      start: "top top",
      end: "bottom bottom",
    },
    scaleY: 0,
    ease:"none",
    transformOrigin:"left top"
  }, 0)


  function animateContent() {

    let contl = new gsap.timeline({

      toggleActions: 'play none none reverse',
      duration: 1,
      ease: 'none',
      scrollTrigger: {
          trigger: ".slide-a",
          endTrigger: "slide-d",
          start: "top top",
          end: "bottom",
          scrub: 1,
          markers: true,
      },
  })
  contl.to(".content-b", {opacity: 1,}, "slide-b",)
  }

  
  // init
  openNav();
  closeNav()
  setupLinks(container);
  animateContent() 
  
}



setNav()






















































































