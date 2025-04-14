export class SceneManager {
    constructor(renderer, camera) {
        this.renderer = renderer;
        this.camera = camera;
        this.currentScene = null;
        this.isLoading = false;
    }

    /**
     * Unloads the current scene and loads a new one.
     * @param {Class} SceneClass - The class constructor of the scene to load.
     */
    loadScene(SceneClass) {
        if (this.isLoading) {
            console.warn('SceneManager is already loading a scene.');
            return;
        }
        this.isLoading = true;

        // Dispose the current scene if it exists
        if (this.currentScene) {
            this.currentScene.dispose();
            this.currentScene = null;
        }

        // Instantiate the new scene
        const newScene = new SceneClass();

        // Load assets for the new scene
        newScene.loadAssets(() => {
            // Asset loading complete callback
            this.currentScene = newScene;
            this.currentScene.initialize(); // Initialize after loading
            this.isLoading = false;
            console.log(`Scene ${SceneClass.name} loaded and initialized.`);
        });
    }

    /**
     * Updates the current scene and renders it.
     * @param {number} deltaTime Time elapsed since the last frame.
     */
    update(deltaTime) {
        if (this.currentScene && !this.isLoading) {
            this.currentScene.update(deltaTime);
            this.renderer.render(this.currentScene.getSceneObject(), this.camera);
        } else if (this.isLoading) {
            // Optionally, render a loading screen or indicator here
            // console.log('Loading scene...');
        } else {
            // No scene loaded, maybe render a default state or log a warning
            // console.warn('No scene loaded to update.');
        }
    }

    // Add methods for transitioning between scenes if needed
    // transitionToScene(SceneClass) { ... }
} 