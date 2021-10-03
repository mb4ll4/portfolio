import * as THREE from './js/three.js-master/build/three.module.js';
import { GLTFLoader } from './js/three.js-master/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './js/three.js-master/examples/jsm/controls/OrbitControls.js';
//import * as dat from "/three.js-master/examples/jsm/libs/dat.gui.module.js";
//import Stats from "/js/three.js-master/examples/jsm/libs/stats.module.js";

//import { EffectComposer } from '/js/three.js-master/examples/jsm/postprocessing/EffectComposer.js';
//import { RenderPass } from '/js/three.js-master/examples/jsm/postprocessing/RenderPass.js';
//import { ShaderPass } from '/js/three.js-master/examples/jsm/postprocessing/ShaderPass.js';
//import { BloomPass } from '/js/three.js-master/examples/jsm/postprocessing/BloomPass.js';
//import { FilmPass } from '/js/three.js-master/examples/jsm/postprocessing/FilmPass.js';
//import { DotScreenPass } from '/js/three.js-master/examples/jsm/postprocessing/DotScreenPass.js';
//import { GlitchPass } from '/js/three.js-master/examples/jsm/postprocessing/GlitchPass.js';
//import { SavePass } from '/js/three.js-master/examples/jsm/postprocessing/SavePass.js';

//import { CopyShader } from '/js/three.js-master/examples/jsm/shaders/CopyShader.js';
//import { BlendShader } from '/js/three.js-master/examples/jsm/shaders/BlendShader.js';
//import { RGBShiftShader } from '/js/three.js-master/examples/jsm/shaders/RGBShiftShader.js';
//import { DotScreenShader} from '/js/three.js-master/examples/jsm/shaders/DotScreenShader.js';

import { gsap } from './js/gsap/gsap-core.js';
import { ScrollToPlugin } from "./js/gsap/ScrollToPlugin.js";
import { ScrollTrigger } from "./js/gsap/ScrollTrigger.js";
import { CSSPlugin } from "./js/gsap/CSSPlugin.js";
gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CSSPlugin);
gsap.registerPlugin()


class App
{
    constructor() {
      this._Initialize();
    }
  
    _Initialize() {

        this.clock = new THREE.Clock();
        /* const mixers = []; */

        let container = document.querySelector( '.scene-container' );
        let setcolor = ("hsl( 0, 0%, 3% )");

        this.mouse = {
            x: 0,
            y: 0
        };
        
        this.w = container.clientWidth;
        this.h = container.clientHeight;
        this.cameraAspect = this.w / this.h;

		this.renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
		});

        this.renderer.setSize( this.w / this.h );
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        
        this.renderer.physicallyCorrectLights = true;
/*         this.renderer.setAnimationLoop(e=> this.update(e));
 */
        container.appendChild( this.renderer.domElement );

        this.resizeWindow = this.setupResize.bind(this)
        this.mouseMove = this.mouseMove.bind(this)

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(setcolor);

        this.camera = new THREE.PerspectiveCamera( 15, this.cameraAspect, 1, 100 )
        this.camera.position.set( 0, 0, 40 );
        this.targetV = new THREE.Vector3( 0, 1, 0 );
        this.camera.lookAt( this.targetV );
        console.log(this.targetV)

        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        this.controls.update();

      /*   this.ambiLight = new THREE.AmbientLight( 0xffffff, 0.1 );
        this.scene.add(this.ambiLight) */

        this.pointLight = new THREE.PointLight( 0xffffff, 4, 100 );
        this.pointLight.position.set( -5, 20, 5 );
        this.pointLight.shadow.bias = -0.0001;
        this.pointLight.castShadow = true;
/*         this.pointLight.shadow.camera.near = 10;
        this.pointLight.shadow.camera.far = 0.1;  */
        this.pointLight.shadow.mapSize.width = 1024*4;
        this.pointLight.shadow.mapSize.height = 1024*4;
        this.scene.add(this.pointLight)

/*         this.spotLight = new THREE.SpotLight( 0xffffff, 50 );
        this.spotLight.position.set( -5, 5, -5 );
        this.spotLight.shadow.bias = -0.00005;
        this.spotLight.lookAt( 0, 0, 0 );
        this.spotLight.angle = Math.PI / 8;
        this.spotLight.penumbra = 0.1;
        this.spotLight.decay = 2;
        this.spotLight.distance = 100;
        this.spotLight.shadow.mapSize.width = 1024*4;
        this.spotLight.shadow.mapSize.height = 1024*4;
        this.spotLight.castShadow = true;
        this.scene.add(this.spotLight) */

        this.target = new THREE.Group();
        this.target.position.set( 0, 0, 0 );
        this.scene.add(this.target);

        this.pen = new THREE.Group();
        this.headphones = new THREE.Group();
        this.phone = new THREE.Group();
        this.mouse = new THREE.Group();
        this.keyboard = new THREE.Group();
        this.cam = new THREE.Group();
        
        this.target.add(this.pen);
        this.target.add(this.headphones);
        this.target.add(this.phone);
        this.target.add(this.mouse);
        this.target.add(this.keyboard);
        this.target.add(this.cam);

        this.targetV.add(this.target)

       /*  this.setupCube() */
        this.setupGround()
        this.setupModels()
        this.setupEvents()
        this.setupResize()
        this.setupNav() 
        this.setupGsap()

        this.renderer.setAnimationLoop( () => {

           /*  stats.begin(); */
            this.setupAni()  
            this.update();
            this.render();
           /*  composer.render(); */
        
          /*   stats.end(); */
        
          });
    }

    setupModels(){

        var manager = new THREE.LoadingManager( () => {
    
	        /* gsap.to('.preloader', 0.8, {delay: 0.5, y:'-100%', ease:"power3.easeInOut"}) */
            gsap.to('.preloader', 0, {delay: 0, opacity:0, y:'-100%', ease:"none"})
        
        });
        
        this.penloader = new GLTFLoader(manager);       
        this.penloader.load('./models/pen.glb',( gltf ) => {
            this.pen.add( gltf.scene );
            gltf.scene.traverse( o => {
                if( o.isMesh ){
                    o.castShadow = true,
                    o.receiveShadow = true;
                }
            })
            },
        );

        this.headphonesloader = new GLTFLoader(manager);
        this.headphonesloader.load('/models/headphones.glb',( gltf ) => {
            this.headphones.add( gltf.scene );
                gltf.scene.traverse( o => {
                    if( o.isMesh ){
                        o.castShadow = true,
                        o.receiveShadow = true;
                    }
                })
            },
        );

        this.phoneloader = new GLTFLoader(manager);
        this.phoneloader.load('/models/phone.glb',( gltf ) => {
            this.phone.add( gltf.scene );
                gltf.scene.traverse( o => {
                    if( o.isMesh ){
                        o.castShadow = true,
                        o.receiveShadow = true;
                    }
                })
            },
        );

        this.mouseloader = new GLTFLoader(manager);
        this.mouseloader.load('/models/mouse.glb',( gltf ) => {
            this.mouse.add( gltf.scene );
                gltf.scene.traverse( o => {
                    if( o.isMesh ){
                        o.castShadow = true,
                        o.receiveShadow = true;
                    }
                })
            },
        );

        this.keyboardloader = new GLTFLoader(manager);
        this.keyboardloader.load('/models/keyboard.glb',( gltf ) => {
            this.keyboard.add( gltf.scene );
                gltf.scene.traverse( o => {
                    if( o.isMesh ){
                        o.castShadow = true,
                        o.receiveShadow = true;
                    }
                })
            },
        );

        this.camloader = new GLTFLoader(manager);
        this.camloader.load('/models/camera.glb',( gltf ) => {
            this.cam.add( gltf.scene );
                gltf.scene.traverse( o => {
                    if( o.isMesh ){
                        o.castShadow = true,
                        o.receiveShadow = true;
                    }
                })
            },
        );
       

    }

/*     setupCube() {

        this.cube = new THREE.Mesh(
            new THREE.BoxGeometry( 10, 1, 10 ),
            new THREE.MeshStandardMaterial({
                color: ("hsl( 0, 0%, 5% )")
            }));

        this.cube.position.set( 5, -4.5, -2 );
        this.cube.castShadow = true;
        this.cube.receiveShadow = true;
        this.scene.add(this.cube);
        console.log(this.cube)
    } */

    setupGround() {

        this.sground = new THREE.Mesh(
            new THREE.PlaneGeometry( 100, 100 ),
            new THREE.ShadowMaterial({
                opacity: 0.8,
            }));
          
        this.sground.position.set( 0, -4.1, 0 );
        this.sground.rotation.x = - Math.PI / 2;
        this.sground.castShadow = false;
        this.sground.receiveShadow = true;
        this.scene.add(this.sground);
        /* console.log(this.ground) */


/*         this.fground = new THREE.Mesh(
            new THREE.PlaneBufferGeometry( 100, 100 ),
            new THREE.MeshBasicMaterial({
                color: (0x010101)
            }));
          
        this.fground.position.set( 0, -4.11, 0 );
        this.fground.rotation.x = - Math.PI / 2;
        this.fground.castShadow = false;
        this.fground.receiveShadow = false;
        this.scene.add(this.fground); */
        /* console.log(this.ground) */




    }

    setupGsap() {

        this.mastertimeline = gsap.timeline();
   
        gsap.fromTo(this.pen.position, 9.5,{ 	
    
            x: -0.8, 
            y: 0, 
            z: 2,
            },{ 	
            x: -0.8, 
            y: -1, 
            z: 2,
            
            repeat: -1,
            yoyo: true, 
            ease: 'power1.inOut',
            delay: 0.5,
        })

        gsap.fromTo(this.headphones.position, 9.0,{ 	
    
            x: 1, 
            y: 0, 
            z: 1,
            },{ 	
            x: 1, 
            y: -1, 
            z: 1,
            
            repeat: -1,
            yoyo: true, 
            ease: 'power1.inOut'
        })

        gsap.fromTo(this.phone.position, 8.5,{ 	
    
            x: 1.5, 
            y: -1.5, 
            z: 0,
            },{ 	
            x: 1.5, 
            y: -2, 
            z: 0,
            
            repeat: -1,
            yoyo: true, 
            ease: 'power1.inOut'
        })

        gsap.fromTo(this.mouse.position, 9.5,{ 	
    
            x: -1.2, 
            y: 1.8, 
            z: -2.0,
            },{ 	
            x: -1.2, 
            y: 0.5, 
            z: -2.0,
            
            repeat: -1,
            yoyo: true, 
            ease: 'power1.inOut',
            delay: 0.5,
        })

        gsap.fromTo(this.keyboard.position, 9.5,{ 	
    
            x: -0.5, 
            y: -1.8, 
            z: -1,
            },{ 	
            x: -0.5, 
            y: -2.5, 
            z: -1,
            
            repeat: -1,
            yoyo: true, 
            ease: 'power1.inOut',
            delay: 1,
        })

        gsap.fromTo(this.cam.position, 8.5,{ 	
    
            x: -2.3, 
            y: 0, 
            z: 0,
            },{ 	
            x: -2.3, 
            y: 0.5, 
            z: 0,
            
            repeat: -1,
            yoyo: true, 
            ease: 'power1.inOut'
                    
        })

/*         gsap.fromTo(this.cube.position, 9.5,{ 	
    
            x: -1, 
            y: 0, 
            z: -3,
            },{ 	
            x: -1, 
            y: -1, 
            z: -3,
            
            repeat: -1,
            yoyo: true, 
            ease: 'power1.inOut',
            delay: 0.5,
        }) */


       
        

        let slideDuration = 1;
        let delay = 0;

        let camtl = new gsap.timeline({
            onUpdate: this.scene.render,

            toggleActions: 'play none none reverse',
           /*  toggleActions: "restart pause resume pause", */
            /* toggleActions: 'play none none none', */
            /* toggleActions: 'play none none pause', */
            duration: slideDuration,
            ease: 'none',
            scrollTrigger: {
                trigger: ".slide-a",
                endTrigger: "slide-d",
                start: "top top",
                end: "bottom",
                scrub: 1,
               /*  markers: true, */
            },
        })

       /*      camtl.add("slide-b", 0)
            camtl.add("slide-c", 10)
            camtl.add("slide-d", 20) */

            // Slide 2

            /* camtl.to(this.target.rotation, {x: 1, y: 0.1, duration: 4}, "slide-b") */
            /* camtl.to(this.scene.rotation, {x: 1, y: -2, duration: 6}, "slide-b") */
            camtl.to(this.camera.position, {x: 20, y: 40, z: 20, duration: 4,}, "slide-b", delay)
            /* camtl.to(this.headphones.position, {x: 2, y: 0, z: 4, duration: 6,}, "slide-b", ) */
            /* camtl.to(this.scene.position, {x: 0, y: 5, z: 20, duration: 6,}, "slide-b", ) */
            /* camtl.to(this.scene.rotation, {x: 0, y: 5, z: -0.5, duration: 6}, "slide-b") */
            /*  camtl.to(this.camera.position, {x: 4, duration: 4}, "slide-b") */
            /* camtl.to(this.camera.rotation, {x: Math.PI * 1, duration: 4}, "slide-b")   */

            delay += slideDuration;

            // Slide 3

            /* camtl.to(this.target.rotation, {y: -4, duration: 4}, "slide-c") */
            camtl.to(this.camera.position, {x: -40, y: 40, z: 20, duration: 4}, "slide-c", delay)
            /* camtl.to(this.camera.rotation, {x: 0, y: -0.3, z: -0.5, duration: 6}, "slide-c") */
            /* camtl.to(this.camera.rotation, { y: 0.2, duration: 4}, "slide-c") */

            delay += slideDuration;

            // Slide 4

            /* camtl.to(this.target.rotation, {x: 30, y: 30, duration: 6}, "slide-d", delay) */
            camtl.to(this.camera.position, {x: 0, y: 0, z: -120, duration: 4}, "slide-d", delay)
            /* camtl.to(scene.rotation, {z: .035, y: -3.15, duration: 4}, "slide4") */

            delay += slideDuration;


    
    }

    setupNav() {
        
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
            duration: 3,
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
              /* markers: true, */
            }
          });
        });    
      
      
        function setupLinks(scroller) {
          let linkElements = gsap.utils.toArray('.topnav a, .mobilenav__link a, .bullets__link a'),
              linkTargets = linkElements.map(e => document.querySelector(e.getAttribute("href"))),
              linkPositions = [],
              calculatePositions = () => {
                let offset = gsap.getProperty(scroller, "y");
                linkTargets.forEach((e, i) => linkPositions[i] = e.getBoundingClientRect().top - offset);
              };
          
              linkElements.forEach((element, i) => {   
                element.addEventListener("click", e => {
                  e.preventDefault();
                  gsap.to(window, 3, {
                    scrollTo: linkPositions[i], 
                    ease: "power3.easeInOut", 
                    overwrite: true});
                });
              });
      
          ScrollTrigger.addEventListener("refresh", calculatePositions);
        }
      
      
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

      

        navtl.to("#hamburger", .3, {scale:0, opacity:0, transformOrigin:"center center", ease: "Back.easeIn"});
        navtl.to("#close", .3, {scale:1, rotation: 270, opacity:1, transformOrigin:"center center", ease: "Back.easeOut"});
        
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
        



        let s1 = document.querySelectorAll('.content-a')
        gsap.to(s1, { opacity: 1 })

        let s2 = document.querySelectorAll('.content-b')
        gsap.to(s2, { opacity: 0 })

        let s3 = document.querySelectorAll('.content-c')
        gsap.to(s3, { opacity: 0 })

        let s4 = document.querySelectorAll('.content-d')
        gsap.to(s4, { opacity: 0 })

   

        gsap.from(".content-a", {
           /*  toggleActions: 'play none none reverse', */
            scrollTrigger: {
                    trigger: ".slide-a",
                    start: "45%",
                    end: "55%",
                    scrub: true,
                    /* markers: true, */
                    duration: 0, 
                    onEnter: () => {
                        gsap.to(s1, { opacity: 1 })
                    },
                    onLeave: () => {
                        gsap.to(s1, { opacity: 0 })
                    },
                    onEnterBack: () => {
                        gsap.to(s1, { opacity: 1 })
                    },
                    onLeaveBack: () => {
                        gsap.to(s1, { opacity: 1 })
                    },
            },
        })

        gsap.to(".content-b", {
            scrollTrigger: {
                    trigger: ".slide-b",
                    start: "45% 55%",
                    end: "55% 45%",
                    scrub: true,
                    /* markers: true, */
                    onEnter: () => {
                        gsap.to(s2, { opacity: 1 })
                    },
                    onLeave: () => {
                        gsap.to(s2, { opacity: 0 })
                    },
                    onEnterBack: () => {
                        gsap.to(s2, { opacity: 1 })
                    },
                    onLeaveBack: () => {
                        gsap.to(s2, { opacity: 0 })
                    },
            },
        })

        gsap.to(".content-c", {
            scrollTrigger: {
                    trigger: ".slide-c",
                    start: "45% 55%",
                    end: "55% 45%",
                    scrub: true,
                   /*  markers: true, */
                    onEnter: () => {
                        gsap.to(s3, { opacity: 1 })
                    },
                    onLeave: () => {
                        gsap.to(s3, { opacity: 0 })
                    },
                    onEnterBack: () => {
                        gsap.to(s3, { opacity: 1 })
                    },
                    onLeaveBack: () => {
                        gsap.to(s3, { opacity: 0 })
                    },
            },
        })

        gsap.to(".content-d", {
            scrollTrigger: {
                    trigger: ".slide-d",
                    start: "45% 55%",
                    end: "55% 45%",
                    scrub: true,
                   /*  markers: true, */
                    onEnter: () => {
                        gsap.to(s4, { opacity: 1 })
                    },
                    onLeave: () => {
                        gsap.to(s4, { opacity: 0 })
                    },
                    onEnterBack: () => {
                        gsap.to(s4, { opacity: 1 })
                    },
                    onLeaveBack: () => {
                        gsap.to(s4, { opacity: 0 })
                    },
            },
        })










        
        // init
        openNav();
        closeNav()
        setupLinks(container);
        /* animateContent()  */
    }

    setupAni() {

        const t = this.clock.getElapsedTime() 
 
        this.pen.rotation.x = THREE.MathUtils.lerp(this.pen.rotation.x, Math.cos(t / 4) / 20 + 0.25, 0.1)
        this.pen.rotation.y = THREE.MathUtils.lerp(this.pen.rotation.y, Math.sin(t / 2) / 10, 0.1)
        this.pen.rotation.z = THREE.MathUtils.lerp(this.pen.rotation.z, Math.sin(t / 4) / 20, 0.1)

        this.headphones.rotation.x = THREE.MathUtils.lerp(this.headphones.rotation.x, Math.cos(t / 2) / 10 + 0.25, 0.1)
        this.headphones.rotation.y = THREE.MathUtils.lerp(this.headphones.rotation.y, Math.sin(t / 4) / 5, 0.1)
        this.headphones.rotation.z = THREE.MathUtils.lerp(this.headphones.rotation.z, Math.sin(t / 4) / 10, 0.1)

        this.phone.rotation.x = THREE.MathUtils.lerp(this.phone.rotation.x, Math.cos(t / 2) / 5, 0.1)
        this.phone.rotation.y = THREE.MathUtils.lerp(this.phone.rotation.y, Math.sin(t / 4) / 10 + 0.25, 0.1)
        this.phone.rotation.z = THREE.MathUtils.lerp(this.phone.rotation.z, Math.sin(t / 4) / 20, 0.1)

        this.mouse.rotation.x = THREE.MathUtils.lerp(this.mouse.rotation.x, Math.cos(t / 2) / -10, 0.1)
        this.mouse.rotation.y = THREE.MathUtils.lerp(this.mouse.rotation.y, Math.sin(t / 4) / -10, 0.1)
        this.mouse.rotation.z = THREE.MathUtils.lerp(this.mouse.rotation.z, Math.sin(t / 4) / -30 - 0.25, 0.1)

        this.keyboard.rotation.x = THREE.MathUtils.lerp(this.keyboard.rotation.x, Math.cos(t / 4) / 20 + 0.25, 0.1)
        this.keyboard.rotation.y = THREE.MathUtils.lerp(this.keyboard.rotation.y, Math.sin(t / 2) / 8, 0.1)
        this.keyboard.rotation.z = THREE.MathUtils.lerp(this.keyboard.rotation.z, Math.sin(t / 4) / 20, 0.1)

        this.cam.rotation.x = THREE.MathUtils.lerp(this.cam.rotation.x, Math.cos(t / 4) / 5 + 0.25, 0.1)
        this.cam.rotation.y = THREE.MathUtils.lerp(this.cam.rotation.y, Math.sin(t / 2) / 50, 0.1)
        this.cam.rotation.z = THREE.MathUtils.lerp(this.cam.rotation.z, Math.sin(t / 4) / 5, 0.1)
    }

    update() {
        
        /* this.camera.lookAt(new THREE.Vector3()); */
        /* requestAnimationFrame(update); */
       
        /* this.camera.updateProjectionMatrix(); */
        /* this.camera.lookAt( this.targetV ); */

        /* this.camera.lookAt(0,0,0); */
        /* this.controls.update(); */

      /*   this.mesh.rotation.y = elapsedTime * .05
    
        this.smoothScroll.update() */
    
        /* this.render() */
    
        /* window.requestAnimationFrame(this.update) */
    }

    render() {
        this.controls.update();
        this.renderer.render( this.scene, this.camera );
    }
    
    mouseMove(e) {

        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
        // rotate the whole scene
        gsap.to(this.target.rotation, {
          y: gsap.utils.mapRange(0, window.innerWidth, 0.1, -0.1, this.mouse.x),
          x: gsap.utils.mapRange(0, window.innerHeight, 0.1, -0.1, this.mouse.y)
        });    
    }

    setupEvents() {

        window.addEventListener('resize', this.resizeWindow, false)
        window.addEventListener("mousemove", this.mouseMove, false)
        
    }

    setupResize() {

        this.w = window.innerWidth;
		this.h = window.innerHeight;
        
        this.camera.aspect = this.w / this.h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( this.w, this.h );
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.render();
        
        console.log(this.cameraAspect)
    }
}

const app = new App()
