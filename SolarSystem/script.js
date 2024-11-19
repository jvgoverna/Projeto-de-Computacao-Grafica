import * as THREE from 'three';

const scene = new THREE.Scene(); // Cria a cena
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); // Cria a camera

// Renderização
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

//pega a div container do html para adicionar o texto : Clique em algum planeta ou no sol para visualizar mais detalhes
let container = document.querySelector(".container");
let simulationButton = document.querySelector(".simulationButton");//pega o botão de simulação do html para adicionar o evento de clique

//Objeto que contém as informações para a criações do sistema solar (primitivas do Three.js)
const sphere = {
	Sun : {
		geometry : new THREE.SphereGeometry( 0.5, 32, 32 ),
		material : new THREE.MeshBasicMaterial( {color : 0xffff00} ),
		posX : -3.4,
		posY : 1.2,
		posZ : 1,
		scaleX : 2.8,
		scaleY : 2.8,
		name : 'Sun',
		texture : '../Files/sol.jpg'
	},

	Jupiter : {
		geometry : new THREE.SphereGeometry( 0.5, 32, 32 ),
		material : new THREE.MeshBasicMaterial( {color : 'orange' } ),
		posX : -0.45,
		posY : 1.2,
		posZ : 1,
		scaleX : 2.2,
		scaleY : 2.2,
		name : 'Júpiter',
		texture : '../Files/jupiter.jpg'
	},

	Saturn : {
		geometry : new THREE.SphereGeometry( 0.5, 32, 32 ),
		material : new THREE.MeshBasicMaterial( {color : 'yellow' } ),
		posX : 1.8,
		posY : 1.2,
		posZ : 1,
		scaleX : 2,
		scaleY : 2,
		name : 'Saturno',
		texture : '../Files/saturno.jpg'
	},

	Uranus : {
		geometry : new THREE.SphereGeometry( 0.5, 32, 32 ),
		material : new THREE.MeshBasicMaterial( {color : 'blue' } ),
		posX : 4.4,
		posY : 1.25,
		posZ : 1,
		scaleX : 1.9,
		scaleY : 1.9,
		name : 'Urano',
		texture : '../Files/uranio.jpg'
	},

	Neptune : {
		geometry : new THREE.SphereGeometry( 0.5, 32, 32 ),
		material : new THREE.MeshBasicMaterial( {color : 'blue' } ),
		posX : 4.55,
		posY : -1.2,
		posZ : 1,
		scaleX : 1.7,
		scaleY : 1.7,
		name : 'Netuno',
		texture : '../Files/netuno.jpg'
	},

	Earth : {
		geometry : new THREE.SphereGeometry( 0.5, 32, 32 ),
		material : new THREE.MeshBasicMaterial( {color : 'green' } ),
		posX : 2.25,
		posY : -1.2,
		posZ : 1,
		scaleX : 1.5,
		scaleY : 1.5,
		name : 'Terra',
		texture : '../Files/terra.jpg'
	},

	Venus : {
		geometry : new THREE.SphereGeometry( 0.5, 32, 32 ),
		material : new THREE.MeshBasicMaterial( {color : 'blue' } ),
		posX : 0.5,
		posY : -1.2,
		posZ : 1,
		scaleX : 1.4,
		scaleY : 1.4,
		name : 'Vênus',
		texture : '../Files/venus.jpg'
	},

	Mars : {
		geometry : new THREE.SphereGeometry( 0.5, 32, 32 ),
		material : new THREE.MeshBasicMaterial( {color : 'red' } ),
		posX : -1.1,
		posY : -1.2,
		posZ : 1,
		scaleX : 1.3,
		scaleY : 1.3,
		name : 'Marte',
		texture : '../Files/marte.jpg'
	},

	Mercury : {
		geometry : new THREE.SphereGeometry( 0.5, 32, 32 ),
		material : new THREE.MeshBasicMaterial( {color : 0xff0000 } ),
		posX: -2.7,
		posY: -1.2,
		posZ: 1,
		scaleX: 1.2,
		scaleY: 1.2,
		name : 'Mercúrio',
		texture : '../Files/mercurio.jpg'
	},

}

let spinning = false;
const animateMeteorRotation = () => {
	spinning = true;
	requestAnimationFrame(() => meteorRotation(sphere));
}

// Função para rotacionar apenas o meteoro em torno do sistema solar de acordo com as transformações geométricas de rotação
const meteorRotation = (sphere) => {
	const planetMeteor = scene.getObjectByName('meteor');
	const angleIncrement = 0.01; 
	if(spinning){
		const angle = angleIncrement;
		
		const currentX = planetMeteor.position.x;
        const currentZ = planetMeteor.position.z;
		const currentY = planetMeteor.position.y;

        // Aplica a rotação em Y (mantendo Y fixo)
        planetMeteor.position.x = currentX * Math.cos(angle) + currentZ * Math.sin(angle);
        planetMeteor.position.z = currentZ * Math.cos(angle) - currentX * Math.sin(angle);
        planetMeteor.position.y = currentY;
		
		console.log("POSIÇÕES: ",planetMeteor.posX , planetMeteor.posY , planetMeteor.posZ);
	}
	requestAnimationFrame(() => meteorRotation(sphere));
}

// Função para rotacionar os planetas do sistema solar em torno do seu próprio eixo y
let isRotation = false;
const rotationPlanets = (sphere)  => {
	if(isRotation){
		for(let keys in sphere){
			if(sphere[keys]['name'] !== "Sun"){
				const object = scene.getObjectByName(sphere[keys]['name']);
				object.rotation.y += 0.01;
	
			}	
		}
	}
	requestAnimationFrame(() => rotationPlanets(sphere));
}

const animateRotationPlanets = () => {
	isRotation = true;
	requestAnimationFrame(() => rotationPlanets(sphere));
}

const createMeteor = () => {
	let textureLoader = new THREE.TextureLoader();
	const meteorGeometry = new THREE.SphereGeometry(0.5 , 32 , 32);
	let texture = textureLoader.load('../Files/meteoro.jpg');
	let meteorTexture = new THREE.MeshBasicMaterial( { map: texture } );
	let meteor = new THREE.Mesh( meteorGeometry , meteorTexture);

	meteor.position.x = 1.8;
	meteor.position.y = -0.15;
	meteor.position.z = -1;
	meteor.scale.x = 0.5;
	meteor.scale.y = 0.5;
	meteor.name = 'meteor';

	scene.add(meteor);
}

const createSolarSystem = (sphere) => {
	const textTag = document.createElement("p");
	textTag.setAttribute("class", "clickPlanets");
	textTag.innerHTML = `Clique em algum planeta ou no sol para visualizar mais detalhes`;
	container.appendChild(textTag);

	for( let keys in sphere ){
		let textureLoader = new THREE.TextureLoader();
		let texture = textureLoader.load(sphere[keys]['texture']);
		let textureMaterial = new THREE.MeshPhongMaterial( {
			map: texture,           // Aplicar a textura
			specular: 0x000000,         // Remover o brilho especular (brilho branco)
			shininess: 30,              // Intensidade do brilho, agora mais suave
		});

		let solarSystem = new THREE.Mesh( sphere[keys]['geometry'] ,textureMaterial );
		solarSystem.position.x = sphere[keys]['posX'];
		solarSystem.position.y = sphere[keys]['posY'];
		solarSystem.position.z = sphere[keys]['posZ'];
		solarSystem.scale.x = sphere[keys]['scaleX'];
		solarSystem.scale.y = sphere[keys]['scaleY'];
		solarSystem.scale.z = sphere[keys]['scaleX'];
		solarSystem.name = sphere[keys]['name'];

		
		scene.add(solarSystem);


	}
	
	// Adicionando o plano (chão)
	const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
	const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
	const plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.rotation.x = -Math.PI / 2; // Deixando o plano horizontal
	plane.position.y = -2; 
	scene.add(plane);

	const ambientLight = new THREE.AmbientLight(0x404040); // Luz suave para iluminação geral
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // Aumentando a intensidade da luz
	directionalLight.position.set(-4.25, 1.2, 1); // Posição da luz
	directionalLight.castShadow = true; // Habilitando sombras para a luz direcional
	scene.add(directionalLight);

	const pointLight = new THREE.PointLight('orange', 1, 50); //Luz pontual para iluminar o sol
	pointLight.position.set(-2, 1, 3);
	scene.add(pointLight);


	// Ativar sombreamento para os objetos
	sphere.Sun.castShadow = true; // A esfera pode projetar sombras
	plane.receiveShadow = true; // O plano recebe sombras


	// chama as funções para animação dos planetas e do meteoro, alem de criar o meteoro
	animateRotationPlanets();
	createMeteor();
	animateMeteorRotation();
}

createSolarSystem(sphere);

// Posicionamento inicial da câmera
camera.position.z = 5;

// Objetos que contém as informações para a criação da simulação do sistema solar (primitivas do Three.js) ao clicar no botão de simular
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

// Função para criar a simulação de orbita dos planetas do sistema solar na simulação do sistema solar
let isMoving = false;
const orbitPlanets = (simulationSphere) => {
	
	if (isMoving){
		const time = 16684;
		
		const orbitalPeriods = {
			Mercury: 1, // 0.24,
			Venus: 2, // 0.615,
			Earth: 3, // 1,
			Mars: 4, // 1.88,
			Jupiter: 6, // 11.86,
			Saturn: 7, // 29.46,
			Uranus: 9, // 84.02,
			Neptune: 12, // 164.79
		};

		for (let keys in simulationSphere) {
			if (keys !== 'Sun') { //o sol não se orbita
				const planet = scene.getObjectByName(simulationSphere[keys]['name']);
				const radius = Math.abs(simulationSphere[keys].posX); // radianos
				const periodInYears = orbitalPeriods[keys]; // período em anos
				const periodInSeconds = periodInYears * 365.25 * 24 * 60 * 60; // converte o período para segundos
				const angularSpeed = (2 * Math.PI) / periodInSeconds; // vai calcular a velodidade angular em rad/s
				const initialAngle = Math.atan2(planet.position.y, planet.position.x); // inicia o ângulo baseado na posição inicial dele
				const angle = initialAngle + angularSpeed * time; // atualiza o ângulo com base no tempo e na velocidade angular
	
				planet.position.x = radius * Math.cos(angle);
				planet.position.y = radius * Math.sin(angle);
				console.log("position: ", planet.position.x , planet.position.y);
			}
		}
	
		renderer.render(scene, camera);
	}
	requestAnimationFrame(() => orbitPlanets(simulationSphere));
}

const animateOrbit = () => {
	isMoving = true;
	requestAnimationFrame(() => orbitPlanets(simulationSphere));
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
		// solarSystem.scale.z = simulationSphere[keys]['scaleY'];
		solarSystem.name = simulationSphere[keys]['name'];

		scene.add( solarSystem);

	}
	// orbitPlanets(simulationSphere);
}

// Raycaster para detectar o clique do mouse em objetos da cena (primitevas do Three.js)
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2(); // Vetor para armazenar a posição do mouse

// Função para calcular o movimento do ponteiro do mouse (x e y)
const calculatePointerMovementMouse = (ev) => {
	pointer.x = (ev.clientX / window.innerWidth) * 2 - 1; // da esquerda p/ direita (-1 a 1)
	pointer.y = -(ev.clientY / window.innerHeight) * 2 + 1; //de cima para baixo (-1 a 1)
	raycaster.setFromCamera( pointer , camera );
}

let animation = false;

// Objeto que contém os detalhes dos planetas do sistema solar ao clicar em algum planeta ou no sol
const detailsPlanets = {
	Sun : {
		name : 'Sol',
		body_type : 'Estrela (classe G2V)',
		year : 'Não aplicável (centro do Sistema Solar)',
		temperature : 'Cerca de 5.500 °C (na superfície), 15 milhões °C (no núcleo)',
		velocity : 'Não aplicável',
		moon : 'Não possui',
		position : 'Centro do Sistema Solar',
		diameter : '1.392.700 km'
	},
	Mercury : {
		name : 'Mercúrio',
		body_type : 'Planeta rochoso',
		year : '88 dias terrestres',
		temperature : '-173 °C à noite a 427 °C durante o dia',
		velocity : '47,87 km/s',
		moon : 'Nenhuma',
		position : '1º planeta a partir do Sol',
		diameter : '4.880 km',
	},
	Venus : {
		name : 'Vênus',
		body_type : 'Planeta rochoso',
		year : '225 dias terrestres',
		temperature : 'Cerca de 462 °C (efeito estufa intenso)',
		velocity : '35,02 km/s',
		moon : 'Nenhuma',
		position : '2º planeta a partir do Sol',
		diameter : '12.104 km',
	},
	Earth : {
		name : 'Terra',
		body_type : 'Planeta rochoso',
		year : '365,25 dias terrestres',
		temperature : 'Cerca de 15 °C',
		velocity : '29,78 km/s',
		moon : '1 (Lua)',
		position : '3º planeta a partir do Sol',
		diameter : '12.742 km',
	},
	Mars : {
		name : 'Marte',
		body_type : 'Planeta rochoso',
		year : '687 dias terrestres',
		temperature : 'Cerca de -60 °C',
		velocity : '24,077 km/s',
		moon : '2 (Fobos e Deimos)',
		position : '4º planeta a partir do Sol',
		diameter : '6.779 km',
	},
	Jupiter : {
		name : 'Júpiter',
		body_type : 'Planeta gasoso',
		year : '11,86 anos terrestres',
		temperature : 'Cerca de -110 °C',
		velocity : '13,07 km/s',
		moon : '79 (incluindo Io, Europa, Ganimedes e Calisto)',
		position : '5º planeta a partir do Sol',
		diameter : '139.820 km',
	},
	Saturn : {
		name: 'Saturno',
		body_type : 'Planeta gasoso',
		year : '29,46 anos terrestres',
		temperature : 'Cerca de -140 °C',
		velocity : '9,69 km/s',
		moon : '83 (incluindo Titã e Encélado)',
		position : '6º planeta a partir do Sol',
		diameter : '116.460 km',
	},
	Uranus : {
		name : 'Urano',
		body_type : 'Planeta gasoso (gelo)',
		year : '84 anos terrestres',
		temperature : 'Cerca de -195 °C',
		velocity : '6,81 km/s',
		moon : '27 (incluindo Miranda, Ariel, Umbriel, Titânia e Oberon)',
		position : '7º planeta a partir do Sol',
		diameter : '50.724 km',
	},
	Neptune : {
		name : 'Netuno',
		body_type : 'Planeta gasoso (gelo)',
		year : '164,8 anos terrestres',
		temperature : 'Cerca de -200 °C',
		velocity : '5,43 km/s',
		moon : '14 (incluindo Tritão)',
		position : '8º planeta a partir do Sol',
		diameter : '49.244 km',
	}
}

// Função para deslocar a câmera para o planeta clicado e remover os outros planetas da cena (primitivas do Three.js)
const clickObject = () => {
	const intersects = raycaster.intersectObjects( scene.children ); //verifica se o raio do mouse intersecciona com algum objeto da cena
	if(animation && intersects.length > 0){ //se houver interseção e a animação estiver ativa

		for(let keys in sphere){
			let name = sphere[keys]['name']; //pega o nome do objeto original
			const clickedObject = intersects[0].object; //pega o objeto clicado
			
			// Deslocar a câmera de acordo com o planeta clicado
			if(clickedObject.name === name){
				let posX = sphere[keys]["posX"];
				console.log("BBBBBBBB", camera.position.x, camera.position.y, camera.position.z);
				
				if(clickedObject.name === "Sun"){
					if(camera.position.x > -4){
						camera.position.x = parseFloat((camera.position.x - 0.2).toFixed(2));
					}
					else{
						animation = false;
					}
					if (camera.position.y < 0.8) {
						camera.position.y = parseFloat((camera.position.y + 0.2).toFixed(2));
					}
					if(camera.position.z > 4){
						camera.position.z = parseFloat((camera.position.z - 0.2).toFixed(2));
					}
					
					for(let keys in sphere){ //remove os outros planetas da cena e o meteoro
						if(sphere[keys]['name'] !== "Sun"){
							scene.remove(scene.getObjectByName(sphere[keys]['name']));
						}
					}
					scene.remove(scene.getObjectByName('meteor'));
				}
				if(clickedObject.name === "Júpiter"){
					if(camera.position.x > -0.8){
						camera.position.x = parseFloat((camera.position.x - 0.2).toFixed(2));
					}
					if (camera.position.y < 0.8) {
						camera.position.y = parseFloat((camera.position.y + 0.2).toFixed(2));
					}
					if(camera.position.z > 3.6){
						camera.position.z = parseFloat((camera.position.z - 0.2).toFixed(2));
					}
					else{
						animation = false;
					}
					
					for(let keys in sphere){
						if(sphere[keys]['name'] !== "Júpiter"){
							scene.remove(scene.getObjectByName(sphere[keys]['name']));
						}
					}
					scene.remove(scene.getObjectByName('meteor'));
				}
				else if(clickedObject.name === "Saturno"){
					if(camera.position.x < 1.4){
						camera.position.x = parseFloat((camera.position.x + 0.2).toFixed(2));
					}
					else{
						animation = false;
					}
					if (camera.position.y < 0.8) {
						camera.position.y = parseFloat((camera.position.y + 0.2).toFixed(2));
					}
					if(camera.position.z > 3.6){
						camera.position.z = parseFloat((camera.position.z - 0.2).toFixed(2));
					}
					
					for(let keys in sphere){
						if(sphere[keys]['name'] !== "Saturno"){
							scene.remove(scene.getObjectByName(sphere[keys]['name']));
						}
					}
					scene.remove(scene.getObjectByName('meteor'));
				}
				else if(clickedObject.name === "Urano"){
					if(camera.position.x < 4.6){
						camera.position.x = parseFloat((camera.position.x + 0.2).toFixed(2));
					}
					else{
						animation = false;
					}
					if (camera.position.y < 1) {
						camera.position.y = parseFloat((camera.position.y + 0.2).toFixed(2));
					}
					if(camera.position.z > 3.6){
						camera.position.z = parseFloat((camera.position.z - 0.2).toFixed(2));
					}
					
					for(let keys in sphere){
						if(sphere[keys]['name'] !== "Urano"){
							scene.remove(scene.getObjectByName(sphere[keys]['name']));
						}
					}
					scene.remove(scene.getObjectByName('meteor'));
				}
				else if(clickedObject.name === "Netuno"){
					// camera.position.x = 4.7;
					// camera.position.y = -1.5;
					// camera.position.z = 3;
					if(camera.position.x < 4.6){
						camera.position.x = parseFloat((camera.position.x + 0.2).toFixed(2));
					}
					else{
						animation = false;
					}
					if (camera.position.y > -1.6) {
						camera.position.y = parseFloat((camera.position.y - 0.2).toFixed(2));
					}
					if(camera.position.z > 3.6){
						camera.position.z = parseFloat((camera.position.z - 0.2).toFixed(2));
					}
					
					for(let keys in sphere){
						if(sphere[keys]['name'] !== "Netuno"){
							scene.remove(scene.getObjectByName(sphere[keys]['name']));
						}
					}
					scene.remove(scene.getObjectByName('meteor'));
				}
				else if(clickedObject.name === "Terra"){
					if(camera.position.x < 2.6){
						camera.position.x = parseFloat((camera.position.x + 0.2).toFixed(2));
					}
					else{
						animation = false;
					}
					if (camera.position.y > -1.6) {
						camera.position.y = parseFloat((camera.position.y - 0.2).toFixed(2));
					}
					if(camera.position.z > 3){
						camera.position.z = parseFloat((camera.position.z - 0.2).toFixed(2));
					}
					
					for(let keys in sphere){
						if(sphere[keys]['name'] !== "Terra"){
							scene.remove(scene.getObjectByName(sphere[keys]['name']));
						}
					}
					scene.remove(scene.getObjectByName('meteor'));
				}
				else if(clickedObject.name === "Vênus"){
					if(camera.position.x < 0.6){
						camera.position.x = parseFloat((camera.position.x + 0.2).toFixed(2));
					}
					if (camera.position.y > -1.6) {
						camera.position.y = parseFloat((camera.position.y - 0.2).toFixed(2));
					}
					if(camera.position.z > 2.8){
						camera.position.z = parseFloat((camera.position.z - 0.2).toFixed(2));
					}
					else{
						animation = false;
					}
					
					for(let keys in sphere){
						if(sphere[keys]['name'] !== "Vênus"){
							scene.remove(scene.getObjectByName(sphere[keys]['name']));
						}
					}
					scene.remove(scene.getObjectByName('meteor'));
				}
				else if(clickedObject.name === "Marte"){
					if(camera.position.x > -0.8){
						camera.position.x = parseFloat((camera.position.x - 0.2).toFixed(2));
					}
					if (camera.position.y > -1.6) {
						camera.position.y = parseFloat((camera.position.y - 0.2).toFixed(2));
					}
					if(camera.position.z > 2.8){
						camera.position.z = parseFloat((camera.position.z - 0.2).toFixed(2));
					}
					else{
						animation = false;
					}
					
					for(let keys in sphere){
						if(sphere[keys]['name'] !== "Marte"){
							scene.remove(scene.getObjectByName(sphere[keys]['name']));
						}
					}
					scene.remove(scene.getObjectByName('meteor'));
				}
				else if(clickedObject.name === "Mercúrio"){
					if(camera.position.x > -2.6){
						camera.position.x = parseFloat((camera.position.x - 0.2).toFixed(2));
					}
					if (camera.position.y > -1.6) {
						camera.position.y = parseFloat((camera.position.y - 0.2).toFixed(2));
					}
					if(camera.position.z > 2.8){
						camera.position.z = parseFloat((camera.position.z - 0.2).toFixed(2));
					}
					else{
						animation = false;
					}
					
					for(let keys in sphere){
						if(sphere[keys]['name'] !== "Mercúrio"){
							scene.remove(scene.getObjectByName(sphere[keys]['name']));
						}
					}
				}
				scene.remove(scene.getObjectByName('meteor'));
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
// Função para retornar a câmera para a posição inicial ao clicar no esc do teclado
const returningToTheOriginalCameraPositioning = () => {
    if (backAnimation) {
        console.log(camera.position.x, camera.position.y, camera.position.z);

        if (camera.position.x > 0) {
            camera.position.x = parseFloat((camera.position.x - 0.20).toFixed(2));
        } else if (camera.position.x < 0) {
            camera.position.x = parseFloat((camera.position.x + 0.20).toFixed(2));
        }

        if (camera.position.z < 5.00) {
            camera.position.z = parseFloat((camera.position.z + 0.20).toFixed(2));
        }

        if (camera.position.y > 0) {
            camera.position.y = parseFloat((camera.position.y - 0.20).toFixed(2));
        } else if (camera.position.y < 0) {
            camera.position.y = parseFloat((camera.position.y + 0.20).toFixed(2));
        }

        // Verificar se está próximo o suficiente da posição inicial
        if (Math.abs(camera.position.x) < 0.1 && Math.abs(camera.position.y) < 0.1 && Math.abs(camera.position.z - 5.0) < 0.1) {
            backAnimation = false;
            camera.position.set(0, 0, 5); // Garante a posição exata
        }

        requestAnimationFrame(returningToTheOriginalCameraPositioning);
    }
};

const returningPosition = () => {
	backAnimation = true;
	requestAnimationFrame(returningToTheOriginalCameraPositioning);
}

let simulationAnimate = false;

// Função para escalar os objetos da simulação e retornar a câmera para a posição inicial ao clicar no botão de detalhes do sistema solar
const scaleAndReturningCameraPosition = (simulationSphere) => {
	let factor = 1.05; //fator da escala dos objetos da simulação do sistema solar
	if(simulationAnimate){
		if(!simulationButtonClicked){ // se o botão de simular for clicado
			console.log("Alternando posição para a simulacao");
			camera.position.z = 68;

			for(let keys in simulationSphere){
				const planets = simulationSphere[keys];				
				if(planets.posZ  < 23){
					planets.posZ = parseFloat(planets.posZ * factor).toFixed(2); // calcula a nova posição dos objetos
					const object = scene.getObjectByName(planets.name); // pega os objetos da cena através do nome

					object.position.z = planets.posZ; // atualiza a posição do objeto

					console.log(object.position.z);
				}else{
					simulationAnimate = false;
					animateOrbit(); // chama a função para animar a órbita dos planetas da simulação do sistema solar em torno do sol
				}
			}
			console.log("SIMULATION ANIMATE" , simulationAnimate);
		}else{// se o botão de detalhes for clicado
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

// Evento de clique ao clicar em algum objeto em detalhes do sistema solar (primitivas do Three.js)
window.addEventListener("click" , (ev) => {
	calculatePointerMovementMouse(ev); // chamada da função para calcular o movimento do ponteiro do mouse
	const intersects = raycaster.intersectObjects( scene.children ); //verifica se o raio do mouse intersecciona com algum objeto da cena

	//Quando clicar em algum objeto da cena o texto de clique em algum planeta do sistema solar é mudado para o nome do objeto clicado
	let objectName = document.querySelector(".clickPlanets");
	//cria um parágrafo para exibir os detalhes do objeto clicado
	let details = document.createElement('p');
    
	// Se houver interseção e o objeto clicado for um planeta ou o sol e não o meteoro ou outro objeto
	for(let intersect of intersects){
		if(intersects.length > 0 && intersect.object.geometry instanceof THREE.SphereGeometry && intersect.object.name !== 'meteor'){ //clique em algum objeto

			// Exibir o nome do objeto clicado
			objectName.innerText = `${intersects[0].object.name}`;
			details.setAttribute('class' , 'details');
			
			// Exibir o texto de volta para o menu de detalhes do sistema solar
			const textBack = document.createElement('p');
			textBack.setAttribute('class' , 'textBack');
			textBack.innerText = "Pressione ESC para voltar para o menu de detalhes do Sistema Solar";
			container.appendChild(textBack);
	
			container.removeChild(simulationButton); // Remove o botão de simular sistema solar
	
			const sunDetails = detailsPlanets.Sun;
			const mercuryDetails = detailsPlanets.Mercury;
			const venusDetails = detailsPlanets.Venus;
			const earthDetails = detailsPlanets.Earth;
			const marsDetails = detailsPlanets.Mars;
			const jupiterDetails = detailsPlanets.Jupiter;
			const saturnDetails = detailsPlanets.Saturn;
			const uranusDetails = detailsPlanets.Uranus;
			const neptuneDetails = detailsPlanets.Neptune;
			// Iterar e exibir no console
	
			// Exibir os detalhes do objeto clicado na tela
			if(intersects[0].object.name === "Sun"){
				for (let key in sunDetails) {
					details.style.color = '#ddc01b';
					details.innerHTML += `${key}: ${sunDetails[key]}<br>`;
				}
				container.appendChild(details);
			}
	
			else if(intersects[0].object.name === "Mercúrio"){
				for (let key in mercuryDetails) {
					details.style.color = '#91837c';
					details.innerHTML += `${key}: ${mercuryDetails[key]}<br>`;
				}
				container.appendChild(details);
			}
	
			else if(intersects[0].object.name === "Vênus"){
				for (let key in venusDetails) {
					details.style.color = '#b0b681';
					details.innerHTML += `${key}: ${venusDetails[key]}<br>`;
				}
				container.appendChild(details);
			}
			
			else if(intersects[0].object.name === "Terra"){
				for (let key in earthDetails) {
					details.style.color = '#126e12';
					details.innerHTML += `${key}: ${earthDetails[key]}<br>`;
				}
				container.appendChild(details);
			}
	
			else if(intersects[0].object.name === "Marte"){
				for (let key in marsDetails) {
					details.style.color = '#e96629';
					details.innerHTML += `${key}: ${marsDetails[key]}<br>`;
				}
				container.appendChild(details);
			}
	
			else if(intersects[0].object.name === "Júpiter"){
				for (let key in jupiterDetails) {
					details.style.color = '#b17424';
					details.innerHTML += `${key}: ${jupiterDetails[key]}<br>`;
				}
				container.appendChild(details);
			}
			
			else if(intersects[0].object.name === "Saturno"){
				for (let key in saturnDetails) {
					details.style.color = '#dbbc92';
					details.innerHTML += `${key}: ${saturnDetails[key]}<br>`;
				}
				container.appendChild(details);
			}
			
			else if(intersects[0].object.name === "Urano"){
				for (let key in uranusDetails) {
					details.style.color = '#a0e7e7';
					details.innerHTML += `${key}: ${uranusDetails[key]}<br>`;
				}
				container.appendChild(details);
			}
			
			else if(intersects[0].object.name === "Netuno"){
				for (let key in neptuneDetails) {
					details.style.color = '#258fc0';
					details.innerHTML += `${key}: ${neptuneDetails[key]}<br>`;
				}
				container.appendChild(details);
			}
	
			// evento para voltar para o menu de detalhes do sistema solar ao clicar no esc do teclado
			window.addEventListener("keydown", (event) => {
				if (event.key === "Escape") { // Detecta a tecla Esc
	
					const objectName = document.querySelector(".clickPlanets"); 
					
					container.removeChild(textBack); 
	
					if(container.contains(objectName)){ 
						container.removeChild(objectName);
					}
					
					container.removeChild(details); 
					
					for (let keys in sphere) { // Remove todos os objetos da cena
						scene.remove(scene.getObjectByName(sphere[keys]['name']));
					}
			
					createSolarSystem(sphere); // Cria os detalhes do sistema solar novamente
	
					container.appendChild(simulationButton);
							
					returningPosition(); // Chama a função para retornar a câmera para a posição inicial 
				}
			});
		}
		
	}


	startAnimation(); // Chama a função para deslocar a câmera para o planeta clicado
})

window.addEventListener( "resize", () => { //ajusta o tamanho da tela e a câmera ao redimensionar a janela do navegador
	camera.aspect = innerWidth/innerHeight;
    camera.updateProjectionMatrix( );
    renderer.setSize( innerWidth, innerHeight );
});

let simulationButtonClicked = true;

// Evento de clique ao clicar no botão de simular sistema solar
simulationButton.addEventListener( "click" , () =>{
	if(simulationButtonClicked){ // se o botão de simular for clicado

		if(container.contains(document.querySelector(".details"))) {
			container.removeChild(document.querySelector(".details"));
		}
		container.removeChild(document.querySelector(".clickPlanets"));
		for(let keys in sphere){ // tira a cena que estava antes de clicar no botão de simular sist. Solar
			scene.remove(scene.getObjectByName(sphere[keys]['name']));
		}
		createSimulationSolarSystem(simulationSphere); 
		simulationButton.innerText = "Detalhes do Sistema Solar";
		simulationButtonClicked = false;
		isRotation = false; // Para de rotacionar os planetas em torno do eixo y
	}
	else if(!simulationButtonClicked){ // se o botão de detalhes for clicado
		isMoving = false; // Para de orbitar os planetas em torno do sol
		scene.remove(scene.getObjectByName('meteor')); // Remove o meteoro da cena
		for(let keys in simulationSphere){
			simulationSphere[keys]['posZ'] = 1; //volta a posição dos objetos para a posição inicial e remove os objetos da cena
			scene.remove(scene.getObjectByName(simulationSphere[keys]['name']));
		}
		createSolarSystem(sphere); // Cria os detalhes do sistema solar novamente
		simulationButtonClicked = true;
		simulationButton.innerText = "Simular Sistema Solar";
	}
	scaleAndReturningCamera(); // Chama a função para escalar os objetos da simulação ao clicar no botão de simular e retorna a câmera para a posição inicial ao clicar no botão de detalhes
})

function animate() {
	renderer.render( scene, camera );
}
//para rodar utilize npm run dev