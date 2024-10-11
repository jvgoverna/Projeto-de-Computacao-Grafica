import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.SphereGeometry( 0.5, 32, 32 ); //define os pontos da primitiva

const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); //cor da primitiva

const sphere = new THREE.Mesh( geometry, material ); //cria a primitiva
sphere.position.x = -6;


scene.add( sphere );

camera.position.z = 5;

function animate() {
	renderer.render( scene, camera );

}

//para rodar utilize npm run dev