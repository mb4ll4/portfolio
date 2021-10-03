import * as THREE from '/js/three.js-master/build/three.module.js';
import { GLTFLoader } from '/js/three.js-master/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from '/js/three.js-master/examples/jsm/controls/OrbitControls.js';
//import * as dat from "/three.js-master/examples/jsm/libs/dat.gui.module.js";
import Stats from "/js/three.js-master/examples/jsm/libs/stats.module.js";

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

import { gsap } from '/js/gsap/gsap-core.js';
import { ScrollToPlugin } from "/js/gsap/ScrollToPlugin.js";
import { ScrollTrigger } from "/js/gsap/ScrollTrigger.js";
import { CSSPlugin } from "/js/gsap/CSSPlugin.js";
gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CSSPlugin);
gsap.registerPlugin()





let container;
let camera;
let renderer;
let scene;


let composer;
let renderPass;
let savePass;
let blendPass;
let outputPass;
var glitchPass;

let ground;
let ico;
let sphere;
let cube
//let plane;
//let geometry;

let pointLight
let pointLight2;
let dirLight
let spotLight;

let setcolor = ("hsl(0, 0%, 6%)");


const stats = new Stats();
//const gui = new dat.GUI();


const mixers = [];
const clock = new THREE.Clock();


//INIT ALL
function init() {

  //preloadApp()

  container = document.querySelector( '.scene-container' );
  document.body.appendChild(stats.dom);

  //setupGUI();
  setupSzene();
  setupCamera();
  //setupPlane()
  setupLights();
  setupRenderer();
  //setupGrid();
  setupGround();
  //setupControls();
  //setupComposer();
  setupModels();
  setupIco();
  //setupCube()
  //setupSphere()
  setupHelpers();

  
 
  renderer.setAnimationLoop( () => {

    stats.begin();

    update();
    render();
    //composer.render();

    stats.end();

  });
}


//ADD THE SZENE
function setupSzene(){
          scene = new THREE.Scene();
          scene.background = new THREE.Color(setcolor);
          //scene.fog = new THREE.Fog(setcolor, 10, 50);
}

//ADD THE CAMERA
function setupCamera() {

        const fov = 15;
        const aspect = container.clientWidth / container.clientWidth;
        const near = 1;
        const far = 100;
        camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.set( 0, 0, 40);
        //camera.up.set( 0, 10, 0);
        //camera.lookAt(20, 100, 50);
  

  
/*         gsap.fromTo(camera.position, 15, {
        x: 0, y: -0.5, z: 40,
        },{
        x: 0, y: -0.5, z: 18,
    
        yoyo: true,
        repeat: -1,
        ease: 'power3.inOut',
        //paused: true,
        }); */

/*         gsap.ticker.add(render);

        gsap.to(camera.position, {
        z: 40,
        duration: 10,
        scrollTrigger: {
          trigger: ".section",
          start: "top bottom",
          end: "bottom bottom",
          markers: true, 
          scrub: true
        }
        }); */
  
}

// ADD THE CONTROLS
/* function setupControls(){
  let controls = new OrbitControls( camera, renderer.domElement );
  controls.addEventListener( 'change', render ); // use if there is no animation loop
  controls.minDistance = 2;
  controls.maxDistance = 100;

  //controls.target.set( 0, 0, 5 );

  //controls.enableDamping = true;
  //controls.enabled = false;
  //controls.autoRotate = false;
  //controls.enableZoom = true;
  //controls.enablePan = false;
  //controls.dampingFactor = 0.05; 


  controls.update();
} */

// ADD THE MODELS
function setupModels() {

  const loadingManager = new THREE.LoadingManager( () => {
    
	

    gsap.to('.preloader', 0.8, {delay: 0.5, y:'-100%', ease:"power3.easeInOut"})

  
	});

  const loader = new GLTFLoader( loadingManager );

  // A reusable function to set up the models. We're passing in a position parameter
  // so that they can be individually placed around the scene
  
  const onLoad = ( gltf, position ) => {

    const model = gltf.scene.children[ 0 ];

/*     model.material = new THREE.MeshPhysicalMaterial({
      color: ("hsl(0, 100%, 5%)"),    // red (can also use a CSS color string here)
      flatShading: false,
      wireframe: true,
      metalness: 0,
      emissive: 0,
      roughness: 100,
      clearcoat: 0,
      clearcoatRoughness: 100,  
    }); */

    model.position.copy( position );
    
    const animation = gltf.animations[ 0 ];

    const mixer = new THREE.AnimationMixer( model );
    mixers.push( mixer );


    

    // Needed when the gltf is animated in blender
/*      const action = mixer.clipAction( animation );
    action.play();  */

    

    scene.add( model );
    
    model.traverse( function ( object ) {

    if ( object.isMesh ) object.castShadow = true, object.receiveShadow = true;

    });
  };

  // the loader will report the loading progress to this function
  const onProgress = () => {};

  // the loader will send any error messages to this function, and we'll log
  // them to to console
  const onError = ( errorMessage ) => { console.log( errorMessage ); };

  // load the first model. Each model is loaded asynchronously,
  // so don't make any assumption about which one will finish loading first

  let penPosition = new THREE.Vector3( -1.5, 0.8, -1.5 );
  loader.load( './models/pen.glb', 
  gltf => onLoad( gltf, penPosition, ), onProgress, onError );

  let headphonesPosition = new THREE.Vector3( 1, 2, -2,5 );
  loader.load( '/models/headphones.glb', gltf => onLoad( gltf, headphonesPosition ), onProgress, onError );

  //let monitorPosition = new THREE.Vector3( 0.5, -3.6, -6.8 );
  //loader.load( '/models/monitor.glb', gltf => onLoad( gltf, monitorPosition ), onProgress, onError );

  let mousePosition = new THREE.Vector3( 0, -3, -2 );
  loader.load( '/models/mouse.glb', gltf => onLoad( gltf, mousePosition ), onProgress, onError );

  let joystickPosition = new THREE.Vector3( 0, -3, 0 );
  loader.load( './models/joystick.glb', gltf => onLoad( gltf, joystickPosition ), onProgress, onError );

/*   let tabletPosition = new THREE.Vector3( 0, 1.3, 0 );
  loader.load( './models/tablet.glb', gltf => onLoad( gltf, tabletPosition ), onProgress, onError ); */

  let cameraPosition = new THREE.Vector3( 0, 2, -5 );
  loader.load( './models/camera.glb', gltf => onLoad( gltf, cameraPosition ), onProgress, onError );

  let phonePosition = new THREE.Vector3( 3, 0, 0.3);
  loader.load( './models/phone.glb', gltf => onLoad( gltf, phonePosition ), onProgress, onError );

  let keyboardPosition = new THREE.Vector3( -0.2, -2.2, 0.5 );
  loader.load( './models/keyboard.glb', gltf => onLoad( gltf, keyboardPosition ), onProgress, onError );

  /* let szenePosition = new THREE.Vector3( 0, 0, 0 );
  loader.load( '/models/szene.glb', gltf => onLoad( gltf, szenePosition ), onProgress, onError ); */

  /* let szene2Position = new THREE.Vector3( 0, 0, 0 );
  loader.load( '/models/szene2.glb', gltf => onLoad( gltf, szene2Position ), onProgress, onError ); */

 
}

// ADD THE GRIDHELPER
/* function setupGrid() {

  const gridHelper = new THREE.GridHelper(50, 50);
  gridHelper.position.y = 0;
  scene.add(gridHelper);

} */


// ADD THE LIGHTING 
function setupLights() {

//////////////////
//ADD AmbientLight
//////////////////

  const ambiLight = new THREE.AmbientLight( 0xffffff, 0.1 );
  scene.add(ambiLight);


/////////////////////
//ADD HemisphereLight
/////////////////////

/*   let hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 10 );
  hemiLight.position.set( 0, 20, 0 );
  hemiLight.color.setHSL( 0, 0, 0.1);
  hemiLight.groundColor.setHSL( 0, 0, 0.1 );
  scene.add( hemiLight ); */

  


///////////////////
//ADD RectAreaLight
///////////////////

/*   const width = 10;
  const height = 10;
  const intensity = 0.5;
  let rectLight = new THREE.RectAreaLight( 0xffffff, intensity, width, height );
  rectLight.position.set( 5, 5, 5 );
  rectLight.lookAt( 0, 0, 0 );
  scene.add( rectLight ); */ 

 /*  let rectLightHelper = new THREE.RectAreaLightHelper( rectLight);
  rectLight.add( rectLightHelper, 5 ); */


//////////////////////
//ADD DirectionalLight
//////////////////////

 /*  dirLight = new THREE.DirectionalLight( 0xffffff, 1.9);
  dirLight.castShadow = true;
  dirLight.position.set( 5, 5, 5 );
  dirLight.shadow.bias = -0.0001; */
  
  //dirlight.shadow.mapSize.width = 512;
  //dirlight.shadow.mapSize.height = 512;
/*   dirLight.shadow.camera.top = 2;
  dirLight.shadow.camera.bottom = - 2; */
/*   dirLight.shadow.camera.left = - 2;
  dirLight.shadow.camera.right = 2;
  dirLight.shadow.camera.near = 0.1;
  dirLight.shadow.camera.far = 20; */
  
  //dirLight.position.multiplyScalar( 3 );

  /* scene.add(dirLight); */
  



////////////////
//ADD PointLight
////////////////

  pointLight = new THREE.PointLight( 0xffffff, 6, 100 );
  pointLight.position.set( -5, 20, 5);
  pointLight.shadow.bias = -0.0001;
  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 1024*4;
  pointLight.shadow.mapSize.height = 1024*4;
  scene.add( pointLight );



  /* pointLight2 = new THREE.PointLight( 0xffffff, 3, 100 );
  pointLight2.position.set( -5, 5, 5 );
  pointLight2.shadow.bias = -0.0001;
  pointLight2.castShadow = true;
  pointLight2.shadow.mapSize.width = 1024*4;
  pointLight2.shadow.mapSize.height = 1024*4;
  scene.add( pointLight2 ); */




///////////////  
//ADD SpotLight
///////////////  

  spotLight = new THREE.SpotLight(0xffffff, 50);
  spotLight.position.set(-5, 5, -5);
  spotLight.shadow.bias = -0.00005;
  spotLight.lookAt( 0, 0, 0 );

  spotLight.angle = Math.PI / 8;
  spotLight.penumbra = 0.1;
  spotLight.decay = 2;
  spotLight.distance = 100;

  
  spotLight.shadow.mapSize.width = 1024*4;
  spotLight.shadow.mapSize.height = 1024*4;
  //spotLight.shadow.camera.near = 10;
  //spotLight.shadow.camera.far = 200;
  //spotLight.shadow.focus = 1;
  spotLight.castShadow = true;
  scene.add(spotLight);
 
}

// ADD THE GROUND
function setupGround() {

  let groundGeometry = new THREE.PlaneGeometry( 100, 100 );

  let groundMaterial = new THREE.ShadowMaterial({
    opacity: 0.5,
    //color: ("hsl(0, 0%, 1%)"),    // red (can also use a CSS color string here)
    //flatShading: true,
/*     emissive: 0, 
    wireframe: false,
    metalness: 0,
    roughness: 100,
    side: THREE.DoubleSide,  */
     
  });

  ground = new THREE.Mesh( groundGeometry, groundMaterial );

  ground.position.set( 0, -4.1, 0 );
  ground.rotation.x = - Math.PI / 2;
  //ground.scale.set( 0, 0, 0 );
  ground.castShadow = false;
  ground.receiveShadow = true;
  //ground.receiveLight = false;

  scene.add( ground );
}

// ADD A PLANE
/* function setupPlane() {
  let side = 120;
  geometry = new THREE.PlaneGeometry( 5, 5, side, side );
  let material = new THREE.MeshStandardMaterial( { roughness: 0.8, color: new THREE.Color(0x202020), });

  plane = new THREE.Mesh( geometry, material );
  
  plane.position.set( 0, 5, -5 );
  plane.castShadow = true;
  plane.receiveShadow = true;

  scene.add( plane );
} */


// ADD A ICO
function setupIco() {

  let icoGeometry = new THREE.IcosahedronGeometry(0.5);

  let icoMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff, 
    wireframe: false, 
    side: THREE.DoubleSide, 
    //flatShading: true
  });

  ico = new THREE.Mesh(icoGeometry, icoMaterial);
  ico.castShadow = true,
  //ico.receiveShadow = true,  
  ico.position.set(5, 0, 0);

  scene.add( ico );
}


// ADD A CUBE
/* function setupCube() {

  cube = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 1, 1),
  new THREE.MeshLambertMaterial({
      color: 0xffffff
  }));

cube.position.set(-3, 0, 0);
scene.add(cube);
} */


//ADD A SPHERE
/* function setupSphere() {

  let SphereGeometry = new THREE.SphereGeometry( 50, 64, 32 );

  let SphereMaterial = new THREE.MeshBasicMaterial( {
    color: ("hsl(0, 0%, 1%)"),
    wireframe: true,
    });

  sphere = new THREE.Mesh( SphereGeometry, SphereMaterial );
  sphere.castShadow = true,
  sphere.receiveShadow = true, 
  sphere.position.set(0, 0, 0);
  sphere.rotation.x = - Math.PI / 2;

  scene.add( sphere );
} */


//ADD HELPERS
function setupHelpers() {

  /* let cameraHelper = new THREE.CameraHelper( camera );
  scene.add( cameraHelper ); */

  /* let spotLightHelper = new THREE.SpotLightHelper( spotLight, 5);
  scene.add(spotLightHelper, 5 ); */ 

  /* let hemiLighthelper = new THREE.HemisphereLightHelper( hemiLight, 1 );
  scene.add( hemiLighthelper ); */

  /* let sphereSize = 0.2;
  const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
  scene.add( pointLightHelper, 100 ); */  

  /* let sphereSize2 = 0.2;
  const pointLightHelper2 = new THREE.PointLightHelper( pointLight2, sphereSize2 );
  scene.add( pointLightHelper2, 100 ); */ 

/*   let sphereSize = 0.2;
  const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
  scene.add( pointLightHelper, 100 ); 
 */
  /*   let dirLightHelper = new THREE.DirectionalLightHelper( dirLight, 5 );
  scene.add(dirLightHelper, 5 ); */
}


//ADD THE RENDERER
function setupRenderer() {

  // create a WebGLRenderer and set its width and height
  renderer = new THREE.WebGLRenderer( { 
    antialias: true, 
    alpha: true,
    //shadowMapEnabled: true, 
  } );
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  
  renderer.setSize( container.clientWidth, container.clientHeight );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.physicallyCorrectLights = true;
  //renderer.toneMapping.type = THREE.NoToneMapping;
  renderer.shadowMap.needsUpdate = true;
  container.appendChild( renderer.domElement );
}

//ADD THE COMPOSER
/* function setupComposer(){
  composer = new EffectComposer( renderer );
  composer.addPass( new RenderPass( scene, camera ) ); */

  /*
  const bloomPass = new BloomPass(
  1,    // strength
  25,   // kernel size
  4,    // sigma ?
  256,  // blur render target resolution
  );
    composer.addPass(bloomPass);
  */
  
/*   const filmPass = new FilmPass(
    1.35,   // noise intensity
    0.025,  // scanline intensity
    648,    // scanline count
    true,  // grayscale
  );
  filmPass.renderToScreen = true;
  composer.addPass(filmPass);  */
 
  /*  
  var effect = new DotScreenPass( new THREE.Vector2( 0, 0 ), 0.5, 0.8 );
  composer.addPass( effect );
  */

/*   var effect = new ShaderPass( DotScreenShader );
  effect.uniforms[ 'scale' ].value = 2;
  composer.addPass( effect ); */
 
  /*
  var effect = new ShaderPass( RGBShiftShader );
  effect.uniforms[ 'amount' ].value = 0.0015;
  composer.addPass( effect );
  */

//}

function update() {

  const delta = clock.getDelta();
  for ( const mixer of mixers ) {

    mixer.update( delta );

  }
}

function render() {
  
/*   var timer = Date.now() * 0.0003;
  
  camera.position.x = Math.sin( timer ) * 0.5;
  camera.position.z = Math.cos( timer ) * 0.5;
  camera.lookAt( 0, 0.1, 0 ); */
 

  ico.rotation.x += 0.005;
	ico.rotation.y += 0.005;
  ico.rotation.z += 0.005;
  
 

  renderer.render( scene, camera, );
  renderer.shadowMap.enabled = true;
}

function onWindowResize() {

  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( container.clientWidth, container.clientHeight );
}

function onMouseMove(e) {
  const x = e.clientX;
  const y = e.clientY;
  // rotate the whole scene
  gsap.to(scene.rotation, {
    y: gsap.utils.mapRange(0, window.innerWidth, 0.1, -0.1, x),
    x: gsap.utils.mapRange(0, window.innerHeight, 0.1, -0.1, y)
  });
}


window.addEventListener("mousemove", onMouseMove);
window.addEventListener( 'resize', onWindowResize );

init();



