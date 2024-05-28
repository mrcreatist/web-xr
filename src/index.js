import * as THREE from 'three';
import './style.css';

let scene, camera, renderer, arToolkitSource, arToolkitContext, markerRoot;

init();
animate();

function init () {
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.Camera();
    scene.add(camera);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('container').appendChild(renderer.domElement);

    // AR Toolkit Source
    arToolkitSource = new THREEx.ArToolkitSource({
        sourceType: 'webcam',
    });

    arToolkitSource.init(function onReady () {
        onResize();
    });

    // Handle resizing
    window.addEventListener('resize', function () {
        onResize();
    });

    // AR Toolkit Context
    arToolkitContext = new THREEx.ArToolkitContext({
        cameraParametersUrl: 'https://raw.githack.com/AR-js-org/AR.js/master/three.js/data/data/camera_para.dat',
        detectionMode: 'mono',
    });

    arToolkitContext.init(function onCompleted () {
        camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    });

    // Marker Root
    markerRoot = new THREE.Group();
    scene.add(markerRoot);

    let markerControls = new THREEx.ArMarkerControls(arToolkitContext, markerRoot, {
        type: 'pattern',
        patternUrl: 'https://raw.githack.com/AR-js-org/AR.js/master/three.js/data/data/patt.hiro',
    });

    // Add a box
    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.5 });
    let cube = new THREE.Mesh(geometry, material);
    markerRoot.add(cube);
}

function onResize () {
    arToolkitSource.onResizeElement();
    arToolkitSource.copyElementSizeTo(renderer.domElement);
    if (arToolkitContext.arController !== null) {
        arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas);
    }
}

function update () {
    if (arToolkitSource.ready !== false) {
        arToolkitContext.update(arToolkitSource.domElement);
    }
}

function animate () {
    requestAnimationFrame(animate);
    update();
    renderer.render(scene, camera);
}
