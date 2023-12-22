import { ElementRef } from "@angular/core";
import * as THREE from "three";
import { EngineService } from "../engine.service";

export abstract class GameApp {

  protected name!: string;
  protected camera!: THREE.Camera;
  protected scene: THREE.Scene = new THREE.Scene();
  protected entities: any[] = [];
  protected totalTime: number = 0;
  protected _debug: boolean = false;

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
    
    if (this._debug) {
      var cube = EngineService.createCube(new THREE.Vector3(1, 0.5, 0.5), 0xFF0000);
      cube.position.x = 0
      cube.position.y = 0
      cube.position.z = 0
      this.entities.push(cube);
      
      var cube2 = EngineService.createCube(new THREE.Vector3(0.5, 1, 0.5), 0x00FF00);
      cube2.position.x = 0
      cube2.position.y = 0
      cube2.position.z = 0
      this.entities.push(cube2);

      var cube3 = EngineService.createCube(new THREE.Vector3(0.5, 0.5, 1), 0x0000FF);
      cube3.position.x = 0
      cube3.position.y = 0
      cube3.position.z = 0
      this.entities.push(cube3);
    }

    for (const entity of this.entities) {
      this.scene.add(entity);
    }
  }

  protected addEntity(entity: THREE.Object3D): void {
    this.entities.push(entity);
    this.scene.add(entity);
  }

  protected insertCube(x: number, y: number, z: number, w: number, color: number): void {
    var wall = EngineService.createCube(new THREE.Vector3(w, w, w), color);
    wall.position.x = x
    wall.position.y = y
    wall.position.z = z
    this.addEntity(wall);
  }

  protected insertRect(x: number, y: number, z: number, x1: number, y1: number, z1: number, color: number): void {
    var wall = EngineService.createCube(new THREE.Vector3(x1, y1, z1), color);
    wall.position.x = x
    wall.position.y = y
    wall.position.z = z
    this.entities.push(wall);
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
