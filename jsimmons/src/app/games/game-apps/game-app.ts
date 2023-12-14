import { ElementRef } from "@angular/core";
import * as THREE from "three";

export abstract class GameApp {

  protected name!: string;
  protected camera!: THREE.Camera;
  protected scene: THREE.Scene = new THREE.Scene();
  protected entities: any[] = [];
  protected totalTime: number = 0;

  constructor(protected width: number, protected height: number) {
  }

  public getName(): string {
    return this.name;
  }

  public getEntities(): any[] {
    return this.entities;
  }

  /**
   * Runs all the setup necessary in order
   */
  public setup(): void {
    this.createScene();
    this.camera = this.getCamera();
    for (const entity of this.entities) {
      console.log('added', entity);
      this.scene.add(entity);
    }
  }

  public getScene(): THREE.Scene {
    return this.scene;
  }

  /**
   * Define entities initially used in the scene
   */
  abstract createScene(): void;

  /**
   * Returns the camera used in the scene, override to use 2D / 3D camera etc.
   */
  abstract getCamera(): THREE.Camera;

  public update(deltaTime: number): void {
    this.totalTime += deltaTime;
  };

  public render(deltaTime: number, renderer: THREE.WebGLRenderer): void {
    renderer.render(this.scene, this.camera);
  }

}
