import * as THREE from 'three';

const scene = new THREE.Scene(); // Cria a cena
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); // Cria a camera

// Renderização
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
		posY : 0,
		posZ : 0,
		scaleX : 3,
		scaleY : 3,
		name : 'Sol',
		texture : '../Files/sol.jpg'
	},
	Mercury : {
		geometry : new THREE.SphereGeometry( 0.5, 32, 32 ),
		material : new THREE.MeshBasicMaterial( {color : 0xff0000 } ),
		posX : -1,
		posY : 0,
		posZ : 1,
		scaleX : 1,
		scaleY : 1,
		name : 'Mercúrio',
		texture : '../Files/mercurio.jpg'
	},

	Venus : {
		geometry : new THREE.SphereGeometry( 0.5, 32, 32 ),
		material : new THREE.MeshBasicMaterial( {color : 'blue' } ),
		posX : 3,
		posY : 0,
		posZ : 1,
		scaleX : 4,
		scaleY : 4,
		name : 'Vênus',
		texture : '../Files/venus.jpg'
	}
}

let spinning = false;

const animateRotation = () => {
	spinning = true;
	requestAnimationFrame(() => rotation(sphere));
}

const rotation = (sphere) => {
	let angle = 0.10;
	if(spinning){
		for(let keys in sphere){
			const planets = sphere[keys];

			//Rotação em Y
			
			planets.posZ = parseFloat( planets.posZ * Math.cos(angle) - planets.posX * Math.sin(angle) ).toFixed(2);
			planets.posX = parseFloat( planets.posZ * Math.sin(angle) + planets.posX * Math.cos(angle) ).toFixed(2);
			planets.posY = planets.posY;
			
			const object = scene.getObjectByName(planets.name); //pega os objetos da cena através do nome
			
			object.position.x = planets.posX;
			object.position.y = planets.posY;
			object.position.z = planets.posZ;
			
			
			
			console.log("POSIÇÕES: ",planets.posX , planets.posY , planets.posZ);
		}
	}
	requestAnimationFrame(() => rotation(sphere));
}

//let rotation = false;
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
		solarSystem.position.y = sphere[keys]['posY'];
		solarSystem.position.z = sphere[keys]['posZ'];
		solarSystem.scale.x = sphere[keys]['scaleX'];
		solarSystem.scale.y = sphere[keys]['scaleY'];
		solarSystem.name = sphere[keys]['name'];

		
		scene.add( solarSystem);
		//animateRotation();
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
		scaleX : 6.9,
		scaleY : 6.9,
		name : 'Sun',
		texture : '../Files/sol.jpg'
	},

	Mercury : {
		geometry : new THREE.SphereGeometry( 0.5, 32, 32 ),
		material : new THREE.MeshBasicMaterial( {color : 0xff0000 } ),
		posX : -4.4,
		posZ : 1,
		scaleX : 1.4,
		scaleY : 1.4,
		name : 'Mercúrio',
		texture : '../Files/mercurio.jpg'
	},

	Venus : {
		geometry : new THREE.SphereGeometry( 0.5, 32, 32 ),
		material : new THREE.MeshBasicMaterial( {color : 'blue' } ),
		posX : -6.7,
		posZ : 1,
		scaleX : 2.4,
		scaleY : 2.4,
		name : 'Vênus',
		texture : '../Files/venus.jpg'
	},

	Earth : {
		geometry : new THREE.SphereGeometry( 0.5, 32, 32 ),
		material : new THREE.MeshBasicMaterial( {color : 'green' } ),
		posX : -9.9,
		posZ : 1,
		scaleX : 2.9,
		scaleY : 2.9,
		name : 'Terra',
		texture : '../Files/terra.jpg'
	},

	Mars : {
		geometry : new THREE.SphereGeometry( 0.5, 32, 32 ),
		material : new THREE.MeshBasicMaterial( {color : 'red' } ),
		posX : -12.9,
		posZ : 1,
		scaleX : 1.9,
		scaleY : 1.9,
		name : 'Marte',
		texture : '../Files/marte.jpg'
	},

	Jupiter : {
		geometry : new THREE.SphereGeometry( 0.5, 32, 32 ),
		material : new THREE.MeshBasicMaterial( {color : 'orange' } ),
		posX : -16.8,
		posZ : 1,
		scaleX : 4.9,
		scaleY : 4.9,
		name : 'Júpiter',
		texture : '../Files/jupiter.jpg'
	},

	Saturn : {
		geometry : new THREE.SphereGeometry( 0.5, 32, 32 ),
		material : new THREE.MeshBasicMaterial( {color : 'yellow' } ),
		posX : -22,
		posZ : 1,
		scaleX : 4.4,
		scaleY : 4.4,
		name : 'Saturno',
		texture : '../Files/saturno.jpg'
	},

	Uranus : {
		geometry : new THREE.SphereGeometry( 0.5, 32, 32 ),
		material : new THREE.MeshBasicMaterial( {color : 'blue' } ),
		posX : -26.8,
		posZ : 1,
		scaleX : 3.9,
		scaleY : 3.9,
		name : 'Urano',
		texture : '../Files/uranio.jpg'
	},

	Neptune : {
		geometry : new THREE.SphereGeometry( 0.5, 32, 32 ),
		material : new THREE.MeshBasicMaterial( {color : 'blue' } ),
		posX : -31,
		posZ : 1,
		scaleX : 3.4,
		scaleY : 3.4,
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

const scaleAndReturningCameraPosition = (simulationSphere) => {
	let factor = 1.05;
	if(simulationAnimate){
		if(!simulationButtonClicked){
			console.log("Alternando posição para a simulacao");
			camera.position.z = 45;

			for(let keys in simulationSphere){
				const planets = simulationSphere[keys];				
				if(planets.posZ  < 23){
					planets.posZ = parseFloat(planets.posZ * factor).toFixed(2);
					const object = scene.getObjectByName(planets.name); //pega os objetos da cena através do nome

					object.position.z = planets.posZ; //atualiza a posição do objeto

					console.log(object.position.z);
				}else{
					simulationAnimate = false;
				}

			}
			console.log("SIMULATION ANIMATE" , simulationAnimate);
		}else{
			console.log("Voltando para a posição original da camera");
			if(camera.position.z > 5.00){
				camera.position.z = parseFloat( (camera.position.z - 0.50).toFixed(2) );
				console.log(camera.position.z);
			}else{
				simulationAnimate = false;
			}
		}
		requestAnimationFrame( () => scaleAndReturningCameraPosition(simulationSphere) );
		
	}
}

const scaleAndReturningCamera = () => {
	simulationAnimate = true;
	requestAnimationFrame( () => scaleAndReturningCameraPosition(simulationSphere) );
}

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
		simulationButton.innerText = "Detalhes do Sistema Solar";
		simulationButtonClicked = false;
	}
	else if(!simulationButtonClicked){	
		for(let keys in simulationSphere){
			simulationSphere[keys]['posZ'] = 1;
			scene.remove(scene.getObjectByName(simulationSphere[keys]['name']));
		}
		createSolarSystem(sphere);
		simulationButtonClicked = true;
		simulationButton.innerText = "Simular Sistema Solar";
	}
	scaleAndReturningCamera();
})

function animate() {
	renderer.render( scene, camera );
}

//para rodar utilize npm run dev