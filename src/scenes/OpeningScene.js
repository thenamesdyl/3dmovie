import * as THREE from 'three';
import { loadGLBModel } from '../utils/glbLoader.js';

export class OpeningScene {
    constructor() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xcccccc); // Example background

        // Add lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 7.5);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);

        // Optional: Configure shadow properties
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 50;

        this.models = {}; // To store loaded models if needed
        this.mixers = [];   // To store animation mixers
    }

    /**
     * Loads necessary assets for the scene.
     * @param {Function} onComplete Callback function when all assets are loaded.
     */
    async loadAssets(onComplete) {
        console.log('Loading assets for OpeningScene...');
        const loadingPromises = [];

        // Load the mage model
        const mageConfig = {
            modelId: 'mage',
            modelUrl: '/mage.glb', // Ensure this path is correct relative to your public/assets folder
            scaleValue: 1,
            position: [0, 0, 0],
            rotation: [0, 0, 0],
            // Optional: Add animation setup if needed
            // animationSetup: (model) => { /* setup code */ }
        };

        const magePromise = new Promise((resolve) => {
            loadGLBModel(this.scene, mageConfig, (success) => {
                if (success) {
                    console.log('Mage model loaded successfully.');
                    // Store reference if needed, e.g., this.models.mage = loadedModelObject;
                } else {
                    console.error('Failed to load mage model.');
                }
                resolve(success); // Resolve promise based on loading success
            });
        });
        loadingPromises.push(magePromise);

        // Wait for all assets to load
        try {
            await Promise.all(loadingPromises);
            console.log('All OpeningScene assets loaded.');
            if (onComplete) onComplete();
        } catch (error) {
            console.error('Error loading OpeningScene assets:', error);
            // Optionally, handle errors more gracefully, e.g., show an error message
        }
    }

    /**
     * Initializes the scene after assets are loaded.
     */
    initialize() {
        console.log('Initializing OpeningScene...');
        // Add any post-load initialization logic here
        // Example: Set up interactions, start specific animations
    }

    /**
     * Updates the scene state.
     * @param {number} deltaTime Time elapsed since the last frame.
     */
    update(deltaTime) {
        // Update animations
        this.mixers.forEach(mixer => mixer.update(deltaTime));

        // Add other scene-specific update logic here
        // e.g., move objects, check for collisions, etc.
    }

    /**
     * Cleans up resources when the scene is unloaded.
     */
    dispose() {
        console.log('Disposing OpeningScene...');
        // Dispose of geometries, materials, textures
        // You might need a more robust way to track and dispose resources
        // See glbLoader's unloadGLBModel for inspiration if using it directly
        // For now, a simple cleanup
        while (this.scene.children.length > 0) {
            this.scene.remove(this.scene.children[0]);
        }
        // Add more specific disposal logic as needed
        this.mixers = [];
    }

    // Getter for the Three.js scene object
    getSceneObject() {
        return this.scene;
    }
} 