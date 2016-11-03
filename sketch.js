function setup() { 
	createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
	background('#FFF');

    rotateZ(frameCount * 0.01);
    rotateX(frameCount * 0.003);
    /*ambientLight(250,250,250);
    specularMaterial(200,20,20); */
    push()
    box(100, 100, 100);
    translate(-100, -100, 0);
    box(200, 200, 200);
    pop()
    
    
}