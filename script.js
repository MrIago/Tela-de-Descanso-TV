let particles = [];
let explosionStartTime;
let explosionDuration = 5; // duração da explosão em segundos
let particleFadeSpeed = 5; // velocidade de desvanecimento das partículas
let numParticles = 5000; // 50x mais partículas
let particleSize = 2; // 20x menor

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  explosionStartTime = millis();
  setTimeout(createExplosion, 1000); // Espere 1 segundo antes de começar
}

function draw() {
  background(0);
  
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    
    if (particles[i].isFinished()) {
      particles.splice(i, 1);
    }
  }
  
  if (particles.length === 0 && millis() - explosionStartTime >= explosionDuration * 1000) {
    explosionStartTime = millis();
    createExplosion();
  }
}

function createExplosion() {
  let explosionX = random(width);
  let explosionY = random(height);
  
  for (let i = 0; i < numParticles; i++) {
    let angle = random(TWO_PI);
    let speed = random(1, 5);
    let particle = new Particle(explosionX, explosionY, speed, angle);
    particles.push(particle);
  }
}

class Particle {
  constructor(x, y, speed, angle) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.fromAngle(angle);
    this.vel.mult(speed);
    this.color = color(random(255), random(255), random(255), 255);
    this.lifespan = 255;
  }
  
  update() {
    this.pos.add(this.vel);
    this.vel.add(p5.Vector.random2D().mult(0.1)); // Aleatoriedade adicional no movimento
    this.lifespan -= particleFadeSpeed;
  }
  
  display() {
    fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.lifespan);
    ellipse(this.pos.x, this.pos.y, particleSize, particleSize);
  }
  
  isFinished() {
    return this.lifespan <= 0;
  }
}
