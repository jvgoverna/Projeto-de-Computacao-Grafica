import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

camera.position.z = 5;

const geometry = new THREE.SphereGeometry( 0.5, 32, 32 ); //define os pontos da primitiva

const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); //cor da primitiva
const createSun = ( geometry,material ) => {
	const container = document.querySelector(".container");
	const sphere = new THREE.Mesh( geometry,material );
	sphere.position.x = 0;
	sphere.scale.y = 2;
	sphere.scale.x = 2;

	const tag = document.createElement("button");
	tag.setAttribute("class","sun");
	container.appendChild(tag);

	console.log(sphere);
	return sphere;
}
const sun = createSun(geometry,material);
scene.add( sun );

function animate() {
	renderer.render( scene, camera );

}

//para rodar utilize npm run dev
//Zoom deve ser 110