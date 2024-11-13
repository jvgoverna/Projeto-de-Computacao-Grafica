import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

let container = document.querySelector(".container");
let simulationButton = document.querySelector(".simulationButton");

const sphere = {
	Sun : {
		geometry : new THREE.SphereGeometry( 0.5, 32, 32 ),
		material : new THREE.MeshBasicMaterial( {color : 0xffff00} ),
		posX : -5.4,
		scaleX : 3,
		scaleY : 3,
		name : 'Sol',
		texture : '../Files/sol.jpg'
	},
	Mercury : {
		geometry : new THREE.SphereGeometry( 0.5, 32, 32 ),
		material : new THREE.MeshBasicMaterial( {color : 0xff0000 } ),
		posX : 1,
		scaleX : 2,
		scaleY : 2,
		name : 'Mercúrio',
		texture : '../Files/mercurio.jpg'
	},

	Venus : {
		geometry : new THREE.SphereGeometry( 0.5, 32, 32 ),
		material : new THREE.MeshBasicMaterial( {color : 'blue' } ),
		posX : 5,
		scaleX : 1.5,
		scaleY : 1.5,
		name : 'Vênus',
		texture : '../Files/venus.jpg'
	}
}


const createSolarSystem = (sphere) => {
	let solarSystem;
	let textureLoader;
	let texture;
	let textureMaterial;
	const textTag = document.createElement("p");
	textTag.setAttribute("class", "clickPlanets");
	textTag.innerHTML = `Clique em algum planeta ou no sol para visualizar mais detalhes`;
	container.appendChild(textTag);

	for( let keys in sphere ){
		textureLoader = new THREE.TextureLoader();
		texture = textureLoader.load(sphere[keys]['texture']);
		textureMaterial = new THREE.MeshBasicMaterial( { map: texture } );

		solarSystem = new THREE.Mesh( sphere[keys]['geometry'] ,textureMaterial );
		solarSystem.position.x = sphere[keys]['posX'];
		solarSystem.scale.x = sphere[keys]['scaleX'];
		solarSystem.scale.y = sphere[keys]['scaleY'];
		solarSystem.name = sphere[keys]['name'];

		


		scene.add( solarSystem);
	}
}

createSolarSystem(sphere);
camera.position.z = 5;

const simulationSphere = {
	Sun : {
		geometry : new THREE.SphereGeometry( 0.5, 32, 32 ),
		material : new THREE.MeshBasicMaterial( {color : 0xffff00} ),
		posX : 0,
		posZ : 1,
		scaleX : 3,
		scaleY : 3,
		name : 'Sun',
		texture : '../Files/sol.jpg'
	},

	Mercury : {
		geometry : new THREE.SphereGeometry( 0.5, 32, 32 ),
		material : new THREE.MeshBasicMaterial( {color : 0xff0000 } ),
		posX : -3,
		posZ : 1,
		scaleX : 2,
		scaleY : 2,
		name : 'Mercúrio',
		texture : '../Files/mercurio.jpg'
	},

	Venus : {
		geometry : new THREE.SphereGeometry( 0.5, 32, 32 ),
		material : new THREE.MeshBasicMaterial( {color : 'blue' } ),
		posX : -5,
		posZ : 1,
		scaleX : 1.5,
		scaleY : 1.5,
		name : 'Vênus',
		texture : '../Files/venus.jpg'
	},

	Earth : {
		geometry : new THREE.SphereGeometry( 0.5, 32, 32 ),
		material : new THREE.MeshBasicMaterial( {color : 'green' } ),
		posX : -8,
		posZ : 1,
		scaleX : 4,
		scaleY : 4,
		name : 'Terra',
		texture : '../Files/terra.jpg'
	},

	Mars : {
		geometry : new THREE.SphereGeometry( 0.5, 32, 32 ),
		material : new THREE.MeshBasicMaterial( {color : 'red' } ),
		posX : -12,
		posZ : 1,
		scaleX : 3,
		scaleY : 3,
		name : 'Marte',
		texture : '../Files/marte.jpg'
	},

	Jupiter : {
		geometry : new THREE.SphereGeometry( 0.5, 32, 32 ),
		material : new THREE.MeshBasicMaterial( {color : 'orange' } ),
		posX : -16,
		posZ : 1,
		scaleX : 6,
		scaleY : 6,
		name : 'Júpiter',
		texture : '../Files/jupiter.jpg'
	},

	Saturn : {
		geometry : new THREE.SphereGeometry( 0.5, 32, 32 ),
		material : new THREE.MeshBasicMaterial( {color : 'yellow' } ),
		posX : -22,
		posZ : 1,
		scaleX : 5,
		scaleY : 5,
		name : 'Saturno',
		texture : '../Files/saturno.jpg'
	},

	Uranus : {
		geometry : new THREE.SphereGeometry( 0.5, 32, 32 ),
		material : new THREE.MeshBasicMaterial( {color : 'blue' } ),
		posX : -25,
		posZ : 1,
		scaleX : 2,
		scaleY : 2,
		name : 'Urano',
		texture : '../Files/uranio.jpg'
	},

	Neptune : {
		geometry : new THREE.SphereGeometry( 0.5, 32, 32 ),
		material : new THREE.MeshBasicMaterial( {color : 'blue' } ),
		posX : -27,
		posZ : 1,
		scaleX : 2,
		scaleY : 2,
		name : 'Netuno',
		texture : '../Files/netuno.jpg'
	},

}

const createSimulationSolarSystem = (simulationSphere) => {
	let solarSystem;
	let textureLoader;
	let texture;
	let textureMaterial;

	for( let keys in simulationSphere ){
		textureLoader = new THREE.TextureLoader();
		texture = textureLoader.load(simulationSphere[keys]['texture']);
		textureMaterial = new THREE.MeshBasicMaterial( { map: texture } );

		solarSystem = new THREE.Mesh( simulationSphere[keys]['geometry'] ,textureMaterial );
		solarSystem.position.x = simulationSphere[keys]['posX'];
		solarSystem.position.z = simulationSphere[keys]['posZ'];
		solarSystem.scale.x = simulationSphere[keys]['scaleX'];
		solarSystem.scale.y = simulationSphere[keys]['scaleY'];
		solarSystem.name = simulationSphere[keys]['name'];

		scene.add( solarSystem);
	}
}

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

const calculatePointerMovementMouse = (ev) => {
	pointer.x = (ev.clientX / window.innerWidth) * 2 - 1; // da esquerda p/ direita (-1 a 1)
	pointer.y = -(ev.clientY / window.innerHeight) * 2 + 1; //de cima para baixo (-1 a 1)
	raycaster.setFromCamera( pointer , camera );
}

let animation = false;

const clickObject = () => {
	const intersects = raycaster.intersectObjects( scene.children );

	if(animation && intersects.length > 0){

		for(let keys in sphere){
			let name = sphere[keys]['name'];
			const clickedObject = intersects[0].object;
				
			if(clickedObject.name === name){
				console.log(camera.position.x , camera.position.z);
				let posX = sphere[keys]["posX"];

				if(clickedObject.name === "Sol"){

					if(camera.position.x > posX){
						camera.position.x = parseFloat((camera.position.x - 0.2).toFixed(2));
					}else{
						animation = false;
					}

					if(camera.position.z > 2){
						camera.position.z = parseFloat((camera.position.z - 0.2).toFixed(2));
					}

				}else{
					if(posX > 2){
						if(camera.position.x < posX){
							camera.position.x = parseFloat((camera.position.x + 0.2).toFixed(2));
						}else{
							animation = false;
						}

						if(camera.position.z > 2){
							camera.position.z = parseFloat((camera.position.z - 0.2).toFixed(2));
						}
					}else{
						if(camera.position.x < posX){
							camera.position.x = parseFloat((camera.position.x + 0.2).toFixed(2));
						}

						if(camera.position.z > 2){
							camera.position.z = parseFloat((camera.position.z - 0.2).toFixed(2));
						}else{
							animation = false;
						}
					}

				}
			}
		}
		console.log(animation);
		requestAnimationFrame(clickObject);
	}
}

const startAnimation = () => {
	animation = true;
	requestAnimationFrame(clickObject);
}

let backAnimation = false;
const returningToTheOriginalCameraPositioning = () => {
	if(backAnimation){

		console.log("CLIQUEI");
		
		
		if(camera.position.x > 0 ){
			camera.position.x = parseFloat((camera.position.x - 0.20).toFixed(2));
		}else if(camera.position.x < 0){
			camera.position.x = parseFloat((camera.position.x + 0.20).toFixed(2));
		}else{
			backAnimation = false;
		}
		if (camera.position.z < 5.00){
			camera.position.z = parseFloat((camera.position.z + 0.20).toFixed(2));
		}
		requestAnimationFrame(returningToTheOriginalCameraPositioning)
		console.log(camera.position.x, camera.position.z);
	}
}

const returningPosition = () => {
	backAnimation = true;
	requestAnimationFrame(returningToTheOriginalCameraPositioning);
}

let simulationAnimate = false;

const cameraSimulation = () => {
	if(simulationAnimate){
		if(!simulationButtonClicked){
			console.log("Alternando posição para a simulacao");
			if(camera.position.z < 20.00){
				camera.position.z = parseFloat( (camera.position.z + 0.10).toFixed(2) );
				requestAnimationFrame(cameraSimulation);
			}else{
				simulationAnimate = false;
			}
			console.log(simulationAnimate);
		}
		else{
			console.log("Voltando para a posição original da camera");
			if(camera.position.z > 5.00){
				camera.position.z = parseFloat( (camera.position.z - 0.10).toFixed(2) );
				requestAnimationFrame(cameraSimulation);
			}else{
				simulationAnimate = false;
			}
		}
	}
	console.log(`Camera X: ${camera.position.x} Camera Z: ${camera.position.z}`);
	
}

const positioningSimulationCamera = () => {
	simulationAnimate = true;
	requestAnimationFrame(cameraSimulation);
}


let direction = false;
const scale = (simulationSphere) => {
	let factor = 1.10;
	let posZ;

	if(direction && !simulationAnimate){
		for(let keys in simulationSphere){
			posZ = simulationSphere[keys]['posZ'];
			let textureLoader = new THREE.TextureLoader();
			let texture = textureLoader.load(simulationSphere[keys]['texture']);
			let textureMaterial = new THREE.MeshBasicMaterial( { map: texture } );
			
			let solarSystem = new THREE.Mesh( simulationSphere[keys]['geometry'] ,textureMaterial );
			
			solarSystem.position.x = simulationSphere[keys]['posX'];
			if(posZ < 15){
				let newZ = parseFloat(posZ * factor).toFixed(2);
				
				simulationSphere[keys]['posZ'] = newZ;
				solarSystem.position.z = simulationSphere[keys]['posZ'];
				
				
				scene.remove(scene.getObjectByName(simulationSphere[keys]['name']));
				
				scene.add(solarSystem);

				
				
			}else{
				//let test = [... scene.children];
				//lastElement = valuesPosZ[valuesPosZ.length - 1];
				
				// let lastElement = test[test.length - 1];
				// console.log(lastElement , simulationSphere[keys]['name']);
				// test.forEach(element => {
				// 	if(element != lastElement) scene.remove(element);
				// });

				let test = [... scene.children];
				console.log(test);

				

				direction = false;
			}
			console.log(`posZ : ${simulationSphere[keys]['posZ']}`);
		}
		console.log("DIRECTION " , direction);
	}
	requestAnimationFrame( () => scale(simulationSphere) );

	
}

const scaleAnimation = () => {
	direction = true;
	requestAnimationFrame( () => scale(simulationSphere) );
}


const test = () => {
	const lista = [1,2,3,4,5];

	const copiaLista = [...lista , 100];

	for(let i = 0 ; i < copiaLista.length ; i++){
		copiaLista.shift();
		i--;
		console.log("LISTA ALTERADA: " , copiaLista);
	}

}
//test();

window.addEventListener("click" , (ev) => {
	calculatePointerMovementMouse(ev);
	const intersects = raycaster.intersectObjects( scene.children );
	let backButton = document.querySelector(".backButton");
	let objectName = document.querySelector(".clickPlanets");
    // Só cria o botão se ele ainda não existir
    if (!backButton) {

		if(intersects.length > 0){ //clique em algum objeto
			objectName.innerText = `${intersects[0].object.name}`;
			backButton = document.createElement("button");
			backButton.setAttribute("class", "backButton");
			container.appendChild(backButton);

			backButton.addEventListener("click" , () => {
				objectName.innerHTML = `Clique em algum planeta ou no sol para visualizar mais detalhes`;
				container.removeChild(backButton);
				returningPosition();
			})
		}
    }

	startAnimation();
})

window.addEventListener( "resize", () => {
	camera.aspect = innerWidth/innerHeight;
    camera.updateProjectionMatrix( );
    renderer.setSize( innerWidth, innerHeight );
});

let simulationButtonClicked = true;

simulationButton.addEventListener( "click" , () =>{
	if(simulationButtonClicked){

		if(container.contains(document.querySelector(".backButton"))) {
			container.removeChild(document.querySelector(".backButton"));
			returningPosition();
		}
		container.removeChild(document.querySelector(".clickPlanets"));
		for(let keys in sphere){ //tira a cena que estava antes de clicar no botão de simular sist. Solar
			scene.remove(scene.getObjectByName(sphere[keys]['name']));
		}
		createSimulationSolarSystem(simulationSphere);
		scaleAnimation();
		simulationButton.innerText = "Detalhes do Sistema Solar";
		simulationButtonClicked = false;
	}
	else if(!simulationButtonClicked){	

		const sceneRemove = [... scene.children]; //copia da lista de objetos da cena
		//console.log(sceneRemove);
		sceneRemove.forEach( (element) => {
			console.log("FUi ACIONADO");
			scene.remove(element);
		})
		for(let keys in simulationSphere){
			simulationSphere[keys]['posZ'] = 1;
		}
		createSolarSystem(sphere);
		simulationButtonClicked = true;
		simulationButton.innerText = "Simular Sistema Solar";
	}
	positioningSimulationCamera();
})

function animate() {
	renderer.render( scene, camera );
}

//para rodar utilize npm run dev