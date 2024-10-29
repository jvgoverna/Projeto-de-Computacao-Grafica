import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

let container = document.querySelector(".container");
const sphere = {
	Sun : {
		geometry : new THREE.SphereGeometry( 0.5, 32, 32 ),
		material : new THREE.MeshBasicMaterial( {color : 0xffff00} ),
		posX : -4,
		scaleX : 4,
		scaleY : 4,
		name : 'Sun',
	},
	Mercury : {
		geometry : new THREE.SphereGeometry( 0.5, 32, 32 ),
		material : new THREE.MeshBasicMaterial( {color : 0xff0000 } ),
		posX : 1,
		scaleX : 2,
		scaleY : 2,
		name : 'Mercury'
	},

	Venus : {
		geometry : new THREE.SphereGeometry( 0.5, 32, 32 ),
		material : new THREE.MeshBasicMaterial( {color : 'blue' } ),
		posX : 5.2,
		scaleX : 1.5,
		scaleY : 1.5,
		name : 'Venus'
	}
}

const createSolarSystem = (sphere) => {
	let solarSystem;

	const textTag = document.createElement("p");
	textTag.setAttribute("class", "clickPlanets");
	textTag.innerHTML = `Clique em algum planeta ou no sol para visualizar mais detalhes`;
	container.appendChild(textTag);

	for( let keys in sphere ){
		solarSystem = new THREE.Mesh( sphere[keys]['geometry'] , sphere[keys]['material'] );
		solarSystem.position.x = sphere[keys]['posX'];
		solarSystem.scale.x = sphere[keys]['scaleX'];
		solarSystem.scale.y = sphere[keys]['scaleY'];
		solarSystem.name = sphere[keys]['name'];
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

const clickObject = () => {

	const intersects = raycaster.intersectObjects( scene.children );
	
	
	const container = document.querySelector('.container');
	
	for( let keys in sphere ){
		let name = sphere[keys]['name'];
		if (intersects.length > 0){
			const clickedObject = intersects[0].object;
			if(clickedObject.name === name){
				console.log(camera.position.x , camera.position.z);
				const posX = sphere[keys]['posX'];
				
				if (clickedObject.name === "Sun"){


					if(camera.position.x > posX) {
						camera.position.x -= 0.2;
					}
					if(camera.position.z > 2){
						camera.position.z -= 0.2;
					}

				}else{
					if(camera.position.x < posX) {
						camera.position.x += 0.2;
					}
					if(camera.position.z > 2){
						camera.position.z -= 0.2;
					}
				}
				requestAnimationFrame(clickObject);
				
			}
		}
	}
}

window.addEventListener("click" , (ev) => {
	calculatePointerMovementMouse(ev);
	let backButton = document.querySelector(".backButton");
	const intersects = raycaster.intersectObjects( scene.children );
    // Só cria o botão se ele ainda não existir
    if (!backButton) {
		
		if(intersects.length > 0){
			backButton = document.createElement("button");
			backButton.setAttribute("class", "backButton");
			container.appendChild(backButton);

		}
    }

	clickObject();
	
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