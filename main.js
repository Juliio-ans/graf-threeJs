
import * as THREE from './vendor/three.module.js';

const escena = new THREE.Scene();
escena.background = new THREE.Color(0x000000);

const camara = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
camara.position.set(0, 0, 10.5);

const renderizador = new THREE.WebGLRenderer({ canvas: document.querySelector('#escena'), antialias: true });
renderizador.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const geometria = new THREE.BoxGeometry(2.25, 2.25, 2.25);
function crearCubo(color, x, rx, ry, rz) {
  const material = new THREE.MeshLambertMaterial({ color });
  const cubo = new THREE.Mesh(geometria, material);
  cubo.position.x = x;
  cubo.rotation.set(rx, ry, rz);
  escena.add(cubo);
  return cubo;
}

// Primero amarillo; al centro azul; al final rojo.
const cuboIzquierdo = crearCubo(0xffff00, -4.7, 0.65, 0.68, 0.38);
const cuboAzul      = crearCubo(0x0000ff, -1.2, 0.08, -0.18, 0.04);
const cuboRojo      = crearCubo(0xff0000,  2.3, 0.25, -0.62, -0.30);

// Luz y sombra para diferenciar las caras de cada cubo.
escena.add(new THREE.AmbientLight(0xffffff, 0.38));
const luz = new THREE.DirectionalLight(0xffffff, 1.3);
luz.position.set(-3, 5, 9);
escena.add(luz);

function ajustar() {
  camara.aspect = window.innerWidth / window.innerHeight;
  camara.updateProjectionMatrix();
  renderizador.setSize(window.innerWidth, window.innerHeight, false);
}
window.addEventListener('resize', ajustar);
ajustar();

function animar() {
  requestAnimationFrame(animar);
  // Cada cubo gira a una velocidad y dirección distinta.
  cuboIzquierdo.rotation.x += 0.009;
  cuboIzquierdo.rotation.y += 0.003;
  cuboAzul.rotation.y += 0.029;
  cuboAzul.rotation.x += 0.013;
  cuboRojo.rotation.x -= 0.038;
  cuboRojo.rotation.y += 0.044;
  renderizador.render(escena, camara);
}
animar();
