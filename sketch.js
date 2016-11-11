var container;
var camera, scene, renderer, effect;
var uniforms;

var radius = 100, theta = 0;

function addCube(){
    var ssss = Math.random() * 5; 

    var material = new THREE.ShaderMaterial( {
        uniforms: uniforms,
        vertexShader: document.getElementById( 'vertexShader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentShader' ).textContent
    } );
    // cube = new THREE.Mesh( new THREE.CubeGeometry( ssss, ssss, ssss ), new THREE.MeshNormalMaterial() );
    cube = new THREE.Mesh( new THREE.CubeGeometry( ssss, ssss, ssss ), material );
    cube.position.y = Math.random() * 200 - 100;
    cube.position.x = Math.random() * 200 - 100;
    cube.position.z = Math.random() * 200 - 100;
    cube.rotation.z = Math.random() * 360;
    scene.add( cube );
}

// removeCube



/*
====
{
       origin: point,
        fadetime: t/f, 
        leavethescreen: function(degrees,[time])
}
*/

function init() {

    uniforms = {}; 
    uniforms.time = {};
    uniforms.time.value = 1.0;
    console.log(uniforms);

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setClearColor( 0x000000);
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild(renderer.domElement);

    window.addEventListener( 'resize', onWindowResize, false );

    effect = new THREE.AnaglyphEffect( renderer );
    effect.setSize(window.innerWidth, window.innerHeight);
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    effect.setSize( window.innerWidth, window.innerHeight );
}

function animate() {

    requestAnimationFrame( animate );
    render();
}

function render() {

    uniforms.time.value += 0.05;
    theta += 0.1;

    camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
    camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
    camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
    camera.lookAt( scene.position );

    camera.updateMatrixWorld();

    effect.render( scene, camera );
}
