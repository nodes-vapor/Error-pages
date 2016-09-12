'use strict';

if (detectWebGLContext()) {
	console.log('inside')
	loadSmoke();
}

function detectWebGLContext() {
	// Create canvas element. The canvas is not added to the
	// document itself, so it is never displayed in the
	// browser window.
	var canvas = document.createElement("canvas");
	// Get WebGLRenderingContext from canvas element.
	var gl = canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' )
	// Report the result.
	if (gl && gl instanceof WebGLRenderingContext) {
		return true;
	} else {
		return false;
	}
}

function loadSmoke() {
	var camera, scene, renderer,
		geometry, material, mesh, clock,cubeSineDriver,textGeo,
		light,smokeMaterial,smokeGeo,smokeParticles,delta,smokeTexture;
	
	init();
	animate();
	
	function init() {
		
		clock = new THREE.Clock();
		
		renderer = new THREE.WebGLRenderer({ alpha: true } );
		renderer.setSize(window.innerWidth, window.innerHeight);
		
		scene = new THREE.Scene();
		
		
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
		camera.position.z = 1000;
		scene.add(camera);
		
		geometry = new THREE.CubeGeometry(400, 400, 400);
		material = new THREE.MeshLambertMaterial({color: 0xffffff, wireframe: false});
		mesh = new THREE.Mesh(geometry, material);
		//scene.add( mesh );
		cubeSineDriver = 0;
		
		textGeo = new THREE.PlaneGeometry(300, 300);
		THREE.ImageUtils.crossOrigin = '';
		
		light = new THREE.DirectionalLight('#ffffff', 10);
		light.position.set(-2,2,1);
		scene.add(light);
		
		smokeTexture = THREE.ImageUtils.loadTexture('https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png');
		smokeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, map: smokeTexture, opacity: 0.3,transparent: true});
		smokeGeo = new THREE.PlaneGeometry(300, 300);
		smokeParticles = [];
		
		
		for (var p = 0; p < 150; p++) {
			var particle = new THREE.Mesh(smokeGeo, smokeMaterial);
			particle.position.set(Math.random() * 1000 - 500, Math.random() * 500 - 250, Math.random() * 1000 - 5);
			particle.rotation.z = Math.random() * 360;
			scene.add(particle);
			smokeParticles.push(particle);
		}
		
		document.body.appendChild(renderer.domElement);
		
	}
	
	function animate() {
		
		// note: three.js includes requestAnimationFrame shim
		delta = clock.getDelta();
		requestAnimationFrame(animate);
		evolveSmoke();
		render();
	}
	
	function evolveSmoke() {
		var sp = smokeParticles.length;
		while (sp--) {
			smokeParticles[sp].rotation.z += (delta * 0.2);
		}
	}
	
	function render() {
		
		mesh.rotation.x += 0.005;
		mesh.rotation.y += 0.01;
		cubeSineDriver += .01;
		mesh.position.z = 100 + (Math.sin(cubeSineDriver) * 500);
		renderer.render(scene, camera);
		
	}
	
	function toXYCoords(pos) {
		var vector = projector.projectVector(pos.clone(), camera);
		vector.x = (vector.x + 1) / 2 * window.innerWidth;
		vector.y = -(vector.y - 1) / 2 * window.innerHeight;
		return vector;
	}
}