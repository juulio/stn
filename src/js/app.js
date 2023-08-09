import '../scss/styles.scss';
import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';

// Required THREEjs stuff
import { MeshBasicMaterial, Vector3 } from 'three';

// import all 3d modules
import Sun from './modules/sun';

// THREEjs basic Scene stuff
const scene = new THREE.Scene();
let camera, renderer, controls, isMobile, theSun, sunPosY;

/**
  * Init basic 3D Scene Elements
  */
let init = () => {

    // Checks if app is running on a mobile device
	isMobile = false;

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		isMobile = true;
	}

	let SCREEN_WIDTH = window.innerWidth,
		SCREEN_HEIGHT = window.innerHeight,
		VIEW_ANGLE = 45,
		ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
		NEAR = 0.1,
		FAR = 20000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);
	camera.position.set(0, 10, 40);
	// camera.lookAt(scene.position);
	
	const light = new THREE.DirectionalLight(0xFFFFFF, 1);
	light.position.set(-10, 10, 30);
	scene.add(light);

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor ( "#000000");
    document.body.appendChild( renderer.domElement );
    controls = new OrbitControls( camera, renderer.domElement );
	window.addEventListener( 'resize', onWindowResize, false );

	scene.add( new THREE.AxesHelper( 500 ));
	scene.add( new THREE.GridHelper( 50, 20 ));
	
	sunPosY = 0;

	if(isMobile){
		posY = 1;
	}

	theSun = new Sun(new Vector3(0, sunPosY, 0), 2, 16);
	scene.add(theSun.sunMesh);
    animate();
}

/**
 * Updates objects on each frame
 */
let animate = () => {
 
    requestAnimationFrame( animate );
	// theSun.updateSunPosition(sunPosY+=0.01);
	theSun.updateSun();
	renderer.render( scene, camera );
}

/**
  * Handles window resize events
  */
let onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

init();