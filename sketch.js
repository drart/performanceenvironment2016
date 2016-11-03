
			var container;
			var camera, scene, renderer, parentTransform;

			var radius = 100, theta = 0;

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );

				scene = new THREE.Scene();

				var geometry = new THREE.Geometry();

				var point = new THREE.Vector3();
				var direction = new THREE.Vector3();

				for ( var i = 0; i < 50; i ++ ) {

					direction.x += Math.random() - 0.5;
					direction.y += Math.random() - 0.5;
					direction.z += Math.random() - 0.5;
					direction.normalize().multiplyScalar( 10 );

					point.add( direction );

					geometry.vertices.push( point.clone() );

				}

				parentTransform = new THREE.Object3D();
				parentTransform.position.x = Math.random() * 40 - 20;
				parentTransform.position.y = Math.random() * 40 - 20;
				parentTransform.position.z = Math.random() * 40 - 20;

				parentTransform.rotation.x = Math.random() * 2 * Math.PI;
				parentTransform.rotation.y = Math.random() * 2 * Math.PI;
				parentTransform.rotation.z = Math.random() * 2 * Math.PI;

				parentTransform.scale.x = Math.random() + 0.5;
				parentTransform.scale.y = Math.random() + 0.5;
				parentTransform.scale.z = Math.random() + 0.5;

				for ( var i = 0; i < 50; i ++ ) {

					var object;

					if ( Math.random() > 0.5 ) {

						object = new THREE.Line( geometry );

					} else {

						object = new THREE.LineSegments( geometry );

					}

					object.position.x = Math.random() * 400 - 200;
					object.position.y = Math.random() * 400 - 200;
					object.position.z = Math.random() * 400 - 200;

					object.rotation.x = Math.random() * 2 * Math.PI;
					object.rotation.y = Math.random() * 2 * Math.PI;
					object.rotation.z = Math.random() * 2 * Math.PI;

					object.scale.x = Math.random() + 0.5;
					object.scale.y = Math.random() + 0.5;
					object.scale.z = Math.random() + 0.5;

					parentTransform.add( object );

				}

				scene.add( parentTransform );

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setClearColor( 0xf0f0f0 );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild(renderer.domElement);

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestAnimationFrame( animate );
				render();
			}

			function render() {

				theta += 0.1;

				camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
				camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
				camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
				camera.lookAt( scene.position );

				camera.updateMatrixWorld();

				renderer.render( scene, camera );

			}