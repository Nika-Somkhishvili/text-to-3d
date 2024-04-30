import * as THREE from "https://cdn.skypack.dev/three@0.134.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.134.0/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.134.0/examples/jsm/loaders/GLTFLoader.js";

const canvasBox = document.getElementById("canvas-box");
// get canvas size
const canvasSize = {
    width: canvasBox.offsetWidth,
    height: canvasBox.offsetHeight,
};
const mousePos = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
};

// create scene
const scene = new THREE.Scene();

// create camera
const camera = new THREE.PerspectiveCamera(
    35,
    innerWidth / innerHeight,
    0.1,
    3000
);
camera.position.setZ(11);
camera.position.setY(1);
camera.position.setX(4);
camera.aspect = canvasSize.width / canvasSize.height;
camera.updateProjectionMatrix();

// create and set renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas: document.getElementById("canvas3d"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(canvasSize.width, canvasSize.height);
renderer.setClearColor(0xffffff, 0);
renderer.outputEncoding = THREE.sRGBEncoding; //(for hdr)
renderer.toneMapping = THREE.ACESFilmicToneMapping; // (for hdr)
renderer.toneMappingExposure = 2;

// // add grid
// const gridHelper = new THREE.GridHelper(5, 20, 0x111111, 0x222222);
// scene.add(gridHelper);

// // add ambient light
// const ambientLight = new THREE.AmbientLight(0xffffff);
// ambientLight.intensity = 2;
// scene.add(ambientLight);

// // add point light
// const light = new THREE.PointLight(0xffffff, 9, 111);
// light.position.set(-22, 44, 22);
// scene.add(light);

// // add directional light
// const directionalLight = new THREE.DirectionalLight( 0xaaaaaa, 1 );
// scene.add( directionalLight );

let r = "https://threejs.org/examples/textures/cube/Bridge2/";
let urls = [
    r + "posx.jpg",
    r + "negx.jpg",
    r + "posy.jpg",
    r + "negy.jpg",
    r + "posz.jpg",
    r + "negz.jpg",
];

let textureCube = new THREE.CubeTextureLoader().load(urls);

scene.environment = textureCube;

// add orbit controls
let controls = new OrbitControls(camera, renderer.domElement);
controls.saveState();
controls.autoRotate = true;

// import 3d model
let model;
let loader = new GLTFLoader();
loader.load("animated_triceratops_skeleton.glb", function (obj) {
    model = obj.scene;

    // // center it
    // const boundingBox = new THREE.Box3().setFromObject(model);
    // const center = new THREE.Vector3();
    // boundingBox.getCenter(center);
    // const translation = new THREE.Vector3();
    // translation.subVectors(model.position, center);
    // model.position.add(translation);

    scene.add(model);
    model.position.setY(-1);
    // model.scale.set(0.1, 0.1, 0.1);
    console.log("sdfsd");
});

resize();
// eventlistener for updating camera and renderer after window/canvas resize
window.addEventListener("resize", resize);
function resize() {
    // Update canvas sizes
    canvasSize.width = canvasBox.offsetWidth;
    canvasSize.height = canvasBox.offsetHeight;

    // Update camera
    camera.aspect = canvasSize.width / canvasSize.height;
    camera.updateProjectionMatrix();
    // Update renderer
    renderer.setSize(canvasSize.width, canvasSize.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    console.log(canvasSize);
}

// eventlistener for updating mouse pos
window.addEventListener("mousemove", (e) => {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
});

// update frame
function update() {
    requestAnimationFrame(update);
    renderer.render(scene, camera);
    controls.update();
}
update();
