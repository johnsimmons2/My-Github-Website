import * as THREE from 'three';
import { ElementRef, Injectable, NgZone, OnDestroy } from "@angular/core";
import { GameApp } from './game-apps/game-app';

@Injectable({providedIn: 'root'})
export class EngineService implements OnDestroy {
  private canvas: HTMLCanvasElement | null = null;
  private renderer: THREE.WebGLRenderer | null = null;
  private camera: THREE.PerspectiveCamera | null = null;
  private scene: THREE.Scene = new THREE.Scene();
  private currentSceneId: number = 0;

  private frameId: number | null = null;

  private entities: THREE.Object3D[] = [];

  private clock = new THREE.Clock();
  private speed = 1;
  private dt = 0;

  public constructor(private ngZone: NgZone) {
  }

  ngOnDestroy(): void {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer = null;
      this.canvas = null;
    }
  }

  public currentScene(): THREE.Scene {
    return this.scene!;
  }

  public setScene(scene: THREE.Scene, sceneId: number): void {
    this.scene = scene;
    this.currentSceneId = sceneId
    cancelAnimationFrame(this.frameId!);
  }

  public static setupCamera3D(): THREE.Camera {
    return new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 1000,
    );
  }

  public static setupCamera2D(): THREE.Camera {
    return new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0, 2000)
  }

  public static getCanvasWidth(): number {
    return window.innerWidth;
  }

  public static getCanvasHeight(): number {
    return window.innerHeight;
  }

  public setupRenderer(canvas: ElementRef<HTMLCanvasElement>): void {
    this.canvas = canvas.nativeElement;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  public createScene(): void {
      this.scene.background = new THREE.Color(0x000000);
  }

  public static createCube(geometry: THREE.Vector3, color: number): THREE.Mesh {
    const cube = new THREE.Mesh(new THREE.BoxGeometry(geometry.x, geometry.y, geometry.z), new THREE.MeshBasicMaterial({color: color}));
    return cube;
  }

  public animate(game: GameApp, id: number): void {
    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== 'loading') {
        if (this.renderer && this.scene && game.getCamera()) {
          // clock the time between frames

          game.update(this.dt);
          game.render(this.dt, this.renderer);
          //cancelAnimationFrame(this.frameId!);
          this.frameId = requestAnimationFrame(() => this.animate(game, id));

          //this.renderer.render(this.scene, game.getCamera());
          this.dt = this.clock.getDelta() * this.speed;
        }
      }

      window.addEventListener('resize', () => this.resize(game));
    });
  }

  public resize(game: GameApp): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const camera = (game.getCamera() as THREE.PerspectiveCamera);
    if (camera) {
      camera.aspect = width / height
      camera.updateProjectionMatrix();
    }

    this.renderer!.setSize(width, height);
  }

}
