import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );


const sphere = {
	Sun : {
		geometry : new THREE.SphereGeometry( 0.5, 32, 32 ),
		material : new THREE.MeshBasicMaterial( {color : 0xffff00} ),
		posX : -4.3,
		scaleX : 2,
		scaleY : 2
	},
	Mercury : {
		geometry : new THREE.SphereGeometry( 0.5, 32, 32 ),
		material : new THREE.MeshBasicMaterial( {color : 0xff0000 } ),
		posX : 2,
		scaleX : 1,
		scaleY : 1
	}
}

const createSolarSystem = (sphere) => {
	let solarSystem;
	
	for( let keys in sphere ){
		solarSystem = new THREE.Mesh( sphere[keys]['geometry'] , sphere[keys]['material'] );
		solarSystem.position.x = sphere[keys]['posX'];
		solarSystem.scale.x = sphere[keys]['scaleX'];
		solarSystem.scale.y = sphere[keys]['scaleY'];

		scene.add( solarSystem);
	}
}
createSolarSystem(sphere);
camera.position.z = 5;


const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

const calculatePointerMovementMouse = (ev) => {
	pointer.x = (ev.clientX / window.innerWidth) * 2 - 1; // da esquerda p/ direita (-1 a 1)
	pointer.y = -(ev.clientY / window.innerHeight) * 2 + 1; //de cima para baixo (-1 a 1)
	raycaster.setFromCamera( pointer , camera );
}

window.addEventListener("mousemove" , (ev) => {
	calculatePointerMovementMouse(ev);

	//ao traçar o raio da camera ao objeto e detectar uma "colisão" intersects retorna uma lista de objetos encontrados
	const intersects = raycaster.intersectObjects( scene.children );

	if(intersects.length > 0){
		document.body.style.cursor = 'pointer';
	}else{
		document.body.style.cursor = 'default';
	}

	//console.log(intersects);
})


window.addEventListener( "resize", () => {
    camera.aspect = innerWidth/innerHeight;
    camera.updateProjectionMatrix( );
    renderer.setSize( innerWidth, innerHeight );
});

function animate() {
	renderer.render( scene, camera );
}

//para rodar utilize npm run dev