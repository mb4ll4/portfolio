new THREE.Vector3(-85, -333, -645),
new THREE.Vector3(-265, 142, -172),
new THREE.Vector3(56, 75, 246),
new THREE.Vector3(255, -100, 188)



useFrame((state) => {
    const t = state.clock.getElapsedTime()
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, Math.cos(t / 2) / 10 + 0.25, 0.1)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(t / 4) / 10, 0.1)
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, Math.sin(t / 4) / 20, 0.1)
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, (-5 + Math.sin(t)) / 5, 0.1)
  })


  this.targetv.applyQuaternion( this.camera.quaternion );


       /*    this.headphones.position.set ( 2, 0, 2);
        this.pen.position.set ( 1, 5, 1); */





  /*         this.headphones.rotation.x += 0.001;
        this.headphones.rotation.y += 0.001;
        this.headphones.rotation.z += 0.001;  */



                /* gsap.set(this.camera.position, {x: 0, y: 20, z: 40}); */

        

/*         gsap.from(this.camera.position, {
            x: 0,
            y: 20,
            z: 40,
          }); */
          
/*         gsap.to(this.camera.position, {
            x: 0,
            y: 10,
            z: 40,
            scrollTrigger: {
              trigger: slide[1],
              markers: true,
              
            }
        });

          gsap.to(this.camera.position, {
            x: 0,
            y: 20,
            z: 40,
            scrollTrigger: {
              trigger: slide[2],
              markers: true,
            }
        });

          gsap.to(this.camera.position, {
            x: 0,
            y: 20,
            z: 40,
            scrollTrigger: {
              trigger: slide[3],
              markers: true,
            }
        });

          gsap.to(this.camera.position, {
            x: 0,
            y: 20,
            z: 40,
            scrollTrigger: {
              trigger: slide[4],
              markers: true,
            }
        });


        this.camera.updateProjectionMatrix();
 */

/*         gsap.fromTo(cubepos, 9.5,{ 	
    
            x: Math.random() * 0, 
            y: Math.random() * -4, 
            z: Math.random() * -5,
            },{ 	
            x: Math.random() * 0.1, 
            y: Math.random() * 2.1, 
            z: Math.random() * 1.1,
            
            repeat: -1,
            yoyo: true, 
            ease: 'power1.inOut'
                    
        }) */

/*         gsap.to(cuberot, 4.5,{ 	
    
            x: Math.random() * 1.1, 
            y: Math.random() * 4.1, 
            z: Math.random() * 1.1, 
            ease: 'power1.in',
        
            repeat: -1,
            yoyo: true, 
            ease: 'power1.inOut'
                
    }) */
/*     var tp = 2;
    let penrot = this.pen.rotation;
    var randomRotation = 270 * Math.PI / 180;
    gsap.to(penrot, 9.5,{z:randomRotation, ease:'none', yoyo:true, repeat:-1});
    gsap.to(penrot, 3.5,{x:randomRotation, ease:'none', yoyo:true, repeat:-1});
 */











        /* let tau = Math.PI * 2; */

   
       
        /* gsap.set(this.cube.position, {x: 0, y: 0, z: 0}); */

/*         const targetA = this.cube.position;

        this.veloTimeline1 = gsap.timeline({
            repeat: 1,
            yoyo: true,
            onComplete: () => this.veloTimeline2.restart()
        });
          
        this.veloTimeline2 = gsap.timeline({
            paused: true,
            repeat: 1,
            yoyo: true,
            onComplete: () => this.veloTimeline1.restart()
        });


          this.veloTimeline1
          .to(targetA, 3.5,{ x: 1, y: 1, z: 1, ease: "none" })

          this.veloTimeline2
          .to(targetA, 3.5,{ x: 0, y: 0, z: 0, ease: "none" }) */


        /* gsap.set(this.cube.rotation, {x: Math.PI / 4, y: Math.PI / 4, z: Math.PI / 2}); */
        

        /* this.timeline.to(this.cube.position, {x: 2, y: 2, z: 10, repeat: -1, ease: 'power1.inOut'}) */

        /* this.cube.rotation.x += 0.005;
        this.cube.rotation.y += 0.005;
        this.cube.rotation.z += 0.005; */

/*         let animation = gsap.timeline({repeat:-1, repeatDelay:0.6})

        animation.to(this.cube.position, { 	
    
          
            x: 2, 
            y: 2, 
            z: 0,

            yoyo: true, 
            ease: 'power1.inOut'
                
        }) */


        ScrollTrigger.defaults({
            /* scrub: true, */
            duration: 1,
            scrub: 1,
            ease: "none",
            immediateRender: false,
            /* stagger: 10.2, */
            /* ease: "power3.easeInOut", */
            /* snap: 1, */
            /* pin: true, */
            duration: 1, 
            /* delay: 1.5, */
            invalidateOnRefresh: true,
            /*  toggleActions: 'play none none reverse', */
            /* toggleActions: "restart pause resume pause", */
            markers: {
                markers: true,
                startColor: "white", 
                endColor: "red", 
                fontSize: "12px", 
                fontWeight: "bold", 
                indent: 0
            },
        });




        gsap.from(this.camera.position, {
            x: 0,
            y: 0,
            z: 40,

            scrollTrigger: {
              trigger: "slide-a",
              markers: true,
              start: "top top",
              end: "bottom bottom",
            },

        });

        gsap.to(this.camera.position, {
            x: 4,
            y: 2,
            z: 40,            
            scrollTrigger: {
              trigger: slide[1],
              start: "top bottom ",
              end: "bottom top ",
            },
            onComplete: function(){
                console.log("complete");
            },
        });

        gsap.to(this.camera.position, {
            x: 6,
            y: 4,
            z: 40,
            scrollTrigger: {
              trigger: slide[2],
              start: "top bottom ",
              end: "bottom top ",
            }
        });

        gsap.to(this.camera.position, {
            x: 8,
            y: 2,
            z: 40,
            scrollTrigger: {
              trigger: slide[3],
              start: "top bottom ",
              end: "bottom top ",
            }
        });


        /*         let cubepos = this.cube.position;
        let cuberot = this.cube.rotation; */
        
        
        /* gsap.set(this.pen.position, {x: -1, y: 0, z: 2}); */
        /* gsap.set(this.headphones.position, {x: 1, y: 0, z: 1.5}); */
        /* gsap.set(this.phone.position, {x: 1, y: 0, z: 2}); */
        /* gsap.set(this.mouse.position, {x: -0.5, y: 0, z: -3}); */
        /* gsap.set(this.keyboard.position, {x: 0, y: 0, z: -0}); */
        /* gsap.set(this.cam.position, {x: 5, y: 5, z: -0}); */


        onUpdate: function(){
            this.camera.updateProjectionMatrix();
            this.camera.lookAt( scene.position );    
        },


        onUpdate: function(){
            this.camera.updateProjectionMatrix();
            this.camera.lookAt( this.targetv  );      
        },










        let cam_anim = gsap.timeline(
        {

            

            toggleActions: 'play none none reverse',
           /*  toggleActions: "restart pause resume pause", */
            /* toggleActions: 'play none none none', */
            /* toggleActions: 'play none none pause', */
            duration: 1,
            
            scrollTrigger: {
                trigger: ".slide-a",
                endTrigger: "slide-d",
                start: "top top",
                end: "bottom",
                scrub: 1,
                markers: true,
            },
        })

        ScrollTrigger.defaults({
            immediateRender: false,
            ease: 'power1.inOut'
        })
        
        // Slide 2
        cam_anim
            .add("slide-b", 0)
            .add("slide-c", 10)
            .add("slide-d", 20)

        cam_anim
            /* .to(this.target.rotation, {x: 1, y: 0.1, duration: 4}, "slide-b") */
            /* .to(this.scene.rotation, {x: 1, y: -2, duration: 6}, "slide-b") */
            .to(this.camera.position, {x: 0, y: 20, z: 40, duration: 6,}, "slide-b", )
            /* .to(this.headphones.position, {x: 2, y: 0, z: 4, duration: 6,}, "slide-b", ) */
            /* .to(this.scene.position, {x: 0, y: 5, z: 20, duration: 6,}, "slide-b", ) */
            /* .to(this.scene.rotation, {x: 0, y: 5, z: -0.5, duration: 6}, "slide-b") */
           /*  .to(this.camera.position, {x: 4, duration: 4}, "slide-b") */
            /* .to(this.camera.rotation, {x: Math.PI * 1, duration: 4}, "slide-b")   */
        // Slide 3
            /* .to(this.target.rotation, {y: -4, duration: 4}, "slide-c") */
            .to(this.camera.position, {x: 0, y: 40, z: 40, duration: 6}, "slide-c")
            /* .to(this.camera.rotation, {x: 0, y: -0.3, z: -0.5, duration: 6}, "slide-c") */
            /* .to(this.camera.rotation, { y: 0.2, duration: 4}, "slide-c") */
        // Slide 4
            .to(this.target.rotation, {x: 30, y: 30, duration: 6}, "slide-d")
            .to(this.camera.position, {x: 0, y: 60, z: 40, duration: 6}, "slide-d")
            /* .to(scene.rotation, {z: .035, y: -3.15, duration: 4}, "slide4") */














            const cameraPosition = {
                n: new THREE.Vector3(0.1, 0, -5),
                e: new THREE.Vector3(5, 0, 0),
                s: new THREE.Vector3(0, 0, 5),
                w: new THREE.Vector3(-5, 0, 0.1),
                top: new THREE.Vector3(0, 5, 0)
            };
    
    
            let cameraPosition1 = new THREE.Vector3( 0, 0, 80 ),



            
/* function hamIcon() {
  
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, CSSRulePlugin);
  
  let tlhamIcon = gsap.timeline({paused:true} );

  tlhamIcon.to("#hamburger", .3, {scale:0, opacity:0, transformOrigin:"center center", ease: Back.easeIn.config(2)});
  tlhamIcon.to("#close", .3, {scale:1, rotation: 270, opacity:1, transformOrigin:"center center", ease: Back.easeOut.config(2)});

  
   function anihamIcon() {
      //animateOpenNav();
      let navBtn = document.getElementById("#hamicon2");
      navBtn.onclick = function (e) {
	      if(navBtn.hasClass("active")) {
		    tlhamIcon.play();
	      } else {
		     tlhamIcon.reverse();
	      }
        navBtn.toggleClass("active");
   };

   
}
anihamIcon() */



    /*  toggleActions: "restart pause resume pause", */
      /* toggleActions: 'play none none none', */
      /* toggleActions: 'play none none pause', */
     



      /*         var navtl = new gsap.timeline({paused:true} );


        navtl.to("#hamburger", .3, {scale:0,  opacity:0, transformOrigin:"center center",  ease: "Back.easeIn"});
        navtl.to("#close", .3, {scale:1,  rotation: 270, opacity:1, transformOrigin:"center center",  ease: "Back.easeOut"});
        
        
        $(".menu-button").on("click", function(){
            var $this = $(this);
            
            if(!$this.hasClass("active")) {
                navtl.play();
            } else {
                navtl.reverse();
            }
            
            $this.toggleClass("active");
        }) */




        


        gsap.to(".content-a", {
          scrollTrigger: {
              /* toggleActions: 'play none none reverse', */
        /*       trigger: ".slide-a",
              endTrigger: "slide-b", */
              scrub: true,
        /*     pin: true, */
              markers:true,
/*                 start: "25% 75%",
              end: "75% 25%", */
              start: "top 25%",
              end: "bottom 75%",
              
              /* delay: 11, */
          },
          /* yoyo: true, */
          ease:"none",
          opacity: 0,
          /* duration: 10, */
         
      }, 0)

      gsap.to(".content-b", {
          scrollTrigger: {
              toggleActions: 'play none none reverse',
              trigger: ".slide-b",
              endTrigger: "slide-c",
              scrub: true,
        /*     pin: true, */
              /* markers:true, */
/*                 start: "25% 75%",
              end: "75% 25%", */
              start: "top",
              end: "bottom",
              
          },
          /* yoyo: true, */
          ease:"none",
          opacity: 1,
          duration: 10,
      }, 0)

      gsap.to(".content-c", {
          scrollTrigger: {
              toggleActions: 'play none none reverse',
              trigger: ".slide-c",
              trigger: ".slide-d",
              scrub: true,
             /*  pin : true, */
              /* markers:true, */
              start: "top",
              end: "bottom ",
            
          },
         /*  yoyo: true, */
          ease:"none",
          opacity: 1,
      }, 0)

      gsap.to(".content-d", {
          scrollTrigger: {
              toggleActions: 'play none none reverse',
              trigger: ".slide-d",
              scrub: true,
           /*  pin: true, */
              /* markers:true, */
    /*           start: "25% center",
              end: "75% center", */
              start: "top",
              end: "bottom ",
          },
          ease:"none",
          opacity: 1,
      }, 0)


      let numbers = gsap.utils.toArray(".sec02").forEach(function(elem) {
        var num = elem.querySelector(".top");
        
        ScrollTrigger.create({
          trigger: elem,
          start: "top center-=34",
          end: "bottom center+=36px",
          pin: num,
          toggleClass: {targets: num, className: "green"}
        })
    });







    var elementFirst = document.querySelector('.box1');
var elementSecond = document.querySelector('.box2');
var elementThird = document.querySelector('.box3');

ScrollTrigger.create({
  trigger: ".box1",
  markers: true,
  start: "top top",
  end: "top top",
  // once: "true",
  // toggleClass: {targets: ".box1, .box2", className: "active, leave, hide"},
  // toggleActions: "play resume resume reset",

  onEnter: () => myfunction(),
  onLeaveBack: () => myfunction(),

});

function myfunction() {
  elementFirst.classList.toggle('active')
  elementSecond.classList.toggle('leave');
  elementThird.classList.toggle('hide');
};


function indicatorHandler(id, enter) {
  let indicator = document.querySelector(`[data-section-id="${id}"]`)
  if (enter) {
    indicator.classList.add('active')
  } else {
    indicator.classList.remove('active')
  }
}






let firstC = document.querySelector('.content-a');
let secondC = document.querySelector('.content-b');
let thirdC = document.querySelector('.content-c');
let fourthC = document.querySelector('.content-d');


function add() {
  firstC.classList.add('active');
  secondC.classList.add('active');
  thirdC.classList.add('active');
  fourthC.classList.add('active');
};

function remove() {
  firstC.classList.remove('active');
  secondC.classList.remove('active');
  thirdC.classList.remove('active');
  fourthC.classList.remove('active');
};



gsap.to(".content-a", {
  scrollTrigger: {
          trigger: "#slide1",
          start: "25%",
          end: "75% center",
          scrub: true,
          markers: true,
          onEnter: () => {
            // find indicator and light it up$
          add(firstC.classList.add, true)
          },
          onLeave: () => {
          // find indicator and reset it
          remove(firstC.classList.remove, false)
          },
          onEnterBack: () => {
          // find indicator and light it up
          add(firstC.classList.add, true)
          },
          onLeaveBack: () => {
          // find indicator and reset it
          remove(firstC.classList.remove, false)
          },
  },
})








gsap.to(".content-a", {
  scrollTrigger: {
          trigger: "#slide1",
          start: "25%",
          end: "75% center",
          scrub: true,
          markers: true,
          toggleClass: {targets: ".content-a", className: ".noneactive"},
          /* invalidateOnRefresh: true, */
  },
/*     ease:"none",
  opacity: 0, */
  /* duration: 10, */
  /* yoyo: true, */
 
})

gsap.to(".content-b", {
  scrollTrigger: {
          trigger: "#slide2",
          start: "25%",
          end: "75% center",
          scrub: true,
          markers: true,
          toggleClass: {targets: ".content-b", className: ".active"},
          /* invalidateOnRefresh: true, */
  },
/*     ease:"none",
  opacity: 0, */
  /* duration: 10, */
  /* yoyo: true, */
 
})






























function add() {
  firstC.classList.toggle('active')
  secondC.classList.toggle('leave');
  thirdC.classList.toggle('hide');
  fourthC.classList.toggle('hide');
};


function remove() {
  firstC.classList.toggle('active')
  secondC.classList.toggle('leave');
  thirdC.classList.toggle('hide');
  fourthC.classList.toggle('hide');
};






    let contl1 = new gsap.timeline({
      
      toggleActions: 'play none none reverse',
      duration: 0,
      ease: 'none',
      scrollTrigger: {
          trigger: "#slide1",
        /*   endTrigger: "slide-b", */
          start: "25%",
          end: "75% center",
          scrub: 1,
          markers: true,
          /* toggleClass: {className: ".noneactive"} */
      },
  })
  contl1.to(".content-a", {opacity: 0,}, "slide-a",)
  
  let contl2 = new gsap.timeline({

      toggleActions: 'play none none reverse',
      duration: 0,
      ease: 'none',
      scrollTrigger: {
          trigger: "#slide2",
        /*   endTrigger: "slide-b", */
        start: "45% 45%",
        end: "65% 65%",
          scrub: 1,
          markers: true,
          toggleClass: {className: ".active"}
      },
  })
  contl2.to(".content-b", {opacity: 1,}, "slide-b",)




  let contl1 = new gsap.timeline({
      
    toggleActions: 'play none none reverse',
    duration: 0,
    ease: 'none',
    scrollTrigger: {
        trigger: "#slide1",
      /*   endTrigger: "slide-b", */
        start: "25%",
        end: "75% center",
        scrub: 1,
        markers: true,
        invalidateOnRefresh: true,

        /* toggleClass: {className: ".noneactive"} */
    },
})
contl1.to(".content-a", {opacity: 0,}, "slide-a",)

let contl2 = new gsap.timeline({

    toggleActions: 'play none none pause',
    duration: 0,
    ease: 'none',
    scrollTrigger: {
        trigger: "#slide2",
      /*   endTrigger: "slide-b", */
      start: "45% 45%",
      end: "65% 65%",
        scrub: 1,
        markers: true,
        toggleClass: {className: ".active"},
        invalidateOnRefresh: true,
    },
})
contl2.to(".content-b", {opacity: 1,}, "slide-b",)

















let firstC = document.querySelector('.content-a');
let secondC = document.querySelector('.content-b');
let thirdC = document.querySelector('.content-c');
let fourthC = document.querySelector('.content-d');


function add() {
  firstC.classList.add('.active');
  secondC.classList.add('.active');
  thirdC.classList.add('.active');
  fourthC.classList.add('.active');
};

function remove() {
  firstC.classList.remove('.active');
  secondC.classList.remove('.active');
  thirdC.classList.remove('.active');
  fourthC.classList.remove('.active');
};





gsap.to(".content-a", {
    scrollTrigger: {
            trigger: "#slide1",
            start: "25%",
            end: "75% center",
            scrub: true,
            markers: true,
            onEnter: () => {
              // find indicator and light it up$
            add()
            },
            onLeave: () => {
            // find indicator and reset it
            remove()
            },
            onEnterBack: () => {
            // find indicator and light it up
            add()
            },
            onLeaveBack: () => {
            // find indicator and reset it
            remove()
            },
    },
})






































const hideText = (p) => {
	gsap.to(p, { opacity: 0, duration: 1 })
}

sections.forEach((section, i) => {
	const p = section.querySelector('p')
	gsap.to(p, { opacity: 0 })
	
	ScrollTrigger.create({
		trigger: section,
		markers: true,
		start: "top top",
		onEnter: () => makeBubbles(p, i),
		onEnterBack: () => {
			if (i <= 6) {
				gsap.to('.bubbles', {
					opacity: 1
				})
			}
		},
		onLeave: () => {
			hideText(p)
			if (i == 0) {
			gsap.to('.rays', {
				opacity: 0,
				y: -500,
				duration: 8,
				ease: 'power4.in'
			})
			}
		},
		onLeaveBack: () => hideText(p),
		onUpdate: (self) => rotateFish(self)
	})
})




const p = section.querySelector('.content__outer')
gsap.to(p, { opacity: 0 })