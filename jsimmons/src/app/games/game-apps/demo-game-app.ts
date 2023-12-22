import { Camera, Vector3 } from "three";
import { GameApp } from "./game-app";
import { EngineService } from "../engine.service";
import * as THREE from "three";

export class DemoGame extends GameApp {

  constructor() {
    super(EngineService.getCanvasWidth(), EngineService.getCanvasHeight());
    this.name = "demo-demo";
  }

  override createScene(): void {
    var cube = EngineService.createCube(new Vector3(1, 1, 1), 0xA0D006);
    this.scene.background = new THREE.Color(0xEEEEEE);
    this.entities.push(cube);
  }

  override getCamera(): Camera {
    if (this.camera != null) return this.camera;
    this.camera = EngineService.setupCamera3D();
    this.camera.position.z = 5;
    return this.camera;
  }

  override update(deltaTime: number): void {
    for (const entity of this.entities) {
      entity.rotation.x += 0.01;
      entity.rotation.y += 0.01;
    }
  }

}
