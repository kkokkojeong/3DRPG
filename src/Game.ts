import * as THREE from 'three';

class Game {

    private scene: THREE.Scene;
    private camera: THREE.Camera;
    private renderer: THREE.Renderer;

    private cube: THREE.Mesh;

    /**
     * 생성자
     */
    constructor() {
        this.init();
    }

    /**
     * Three - Scene, Light, Object 초기화
     */
    private init(): void {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0, 20, 10);
        const ambient = new THREE.AmbientLight(0x707070); // soft white light

        const material = new THREE.MeshPhongMaterial({ color: 0x00aaff });

        this.cube = new THREE.Mesh(geometry, material);

        this.scene.add(this.cube);
        this.scene.add(light);
        this.scene.add(ambient);

        this.camera.position.z = 3;

        this.render();
    }

    /**
     * rAF 렌더링 60fps
     */
    private render(): void {
        requestAnimationFrame(() => {
            this.render();
        });

        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;

        this.renderer.render(this.scene, this.camera);
    }
}

export default Game;