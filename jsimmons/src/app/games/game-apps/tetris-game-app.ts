import { Camera } from "three";
import { GameApp } from "./game-app";
import * as THREE from "three";
import { EngineService } from "../engine.service";

export class TetrisGame extends GameApp {

  private cubeSize: number = 40;
  private top: number = 0;
  private left: number = 0;
  // 1 = 1 second
  private speed: number = 0.8;
  private baseSpeed: number = 0.8

  private boardWidth: number = 10;
  private boardHeight: number = 20

  private board: number[][] = [];

  private tetriminos: number[][][] = [
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 1, 0],
      [1, 1, 1],
    ]
  ]

  private currentTetrimino: THREE.Object3D[] = [];
  private currentX: number = 0;
  private currentY: number = 20;

  constructor() {
    super(100,800);
    this.top = this.height - (this.height / 2) - (this.boardHeight * this.cubeSize);
    this.left = this.width - (this.width / 2) - (this.boardWidth * this.cubeSize/2);
    this.name = 'tetris-demo';
  }

  override createScene(): void {
    this.scene.background = new THREE.Color(0x000000);

    document.addEventListener('keydown', (event) => {
      if (event.key === "ArrowLeft") {
        this.currentX = -1;
      } else if (event.key === "ArrowRight") {
        this.currentX = 1;
      } else if (event.key === "ArrowDown") {
        this.speed = 0.1;
      } else if (event.key === "ArrowUp") {
        this.currentTetrimino = this.rotateTetramino(this.currentTetrimino);
      }
    });

    document.addEventListener('keyup', (event) => {
      if (event.key === "ArrowDown") {
        this.speed = this.baseSpeed;
      } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        this.currentX = 0;
      }
    });

    for (var i = 0; i < this.boardWidth; i++) {
      this.board.push([]);
      for (var j = 0; j < this.boardHeight; j++) {
        this.board[i].push(0);
      }
    }


    this.createTetraminoAt(2, this.currentY, this.tetriminos[0]);

    this.createWalls();
  }

  private createTetraminoAt(x: number, y: number, tetramino: number[][]): void {
    for (var i = 0; i < tetramino.length; i++) {
      for (var j = 0; j < tetramino[i].length; j++) {
        if (tetramino[i][j] == 0) continue;
        const box = this.createBoxAt(x + i, y + j);
        box.name = "tetramino";
        this.addEntity(box);
        this.currentTetrimino.push(box);
      }
    }
  }

  /**
   * TODO: fix rotation figure out actual algorithm
   * @param tetramino
   * @returns
   */
  private rotateTetramino(tetramino: THREE.Object3D[]): THREE.Object3D[] {
    const newTetramino: THREE.Object3D[] = [];
    for (const box of tetramino) {
      const x = box.position.x;
      const y = -box.position.y;

      box.position.x = (y);
      box.position.y = x;

      newTetramino.push(box);
    }
    return newTetramino;
  }

  private createWalls(): void {
    const wall = this.createRectangleAt(-1, 9.5, 1, 20);
    const wall2 = this.createRectangleAt(10, 9.5, 1, 20);
    const wall3 = this.createRectangleAt(4.5, -1, 12, 1);

    wall.name = "wall";
    wall2.name = "wall";
    wall3.name = "wall";

    this.addEntity(wall);
    this.addEntity(wall2);
    this.addEntity(wall3);
  }

  private addEntity(entity: any): void {
    this.entities.push(entity);
    this.scene.add(entity);
  }

  override getCamera(): Camera {
    if (this.camera != null) return this.camera;
    this.camera = EngineService.setupCamera2D();
    this.camera.position.z = 500;
    return this.camera;
  }

  override update(deltaTime: number): void {
    super.update(deltaTime);
    if (this.currentTetrimino.length === 0)
      this.createTetraminoAt(2, this.currentY, this.tetriminos[0]);
    if (this.totalTime >= this.speed) {
      this.translateTetramino(this.currentX);
      this.totalTime = 0;
    }
  }

  private translateTetramino(x: number): void {
    for (const box of this.currentTetrimino) {
      box.position.x -= x * this.cubeSize;
      box.position.y -= this.cubeSize;
    }
  }

  private createRectangleAt(x: number, y: number, width: number, height: number): THREE.Mesh {
    const rect = new THREE.Mesh(new THREE.BoxGeometry(width * this.cubeSize, height * this.cubeSize, 1), new THREE.MeshBasicMaterial({color: 0x00FF00}));
    const posX = (x) * this.cubeSize + this.left;
    const posY = (y) * this.cubeSize + this.top;
    rect.position.set(posX, posY, 1);
    return rect;
  }

  private createBoxAt(indexi: number, indexj: number): THREE.Object3D {
    const box = EngineService.createCube(new THREE.Vector3(this.cubeSize, this.cubeSize, this.cubeSize), 0xFF0000);
    const posX = (indexi) * this.cubeSize + this.left;
    const posY = (indexj) * this.cubeSize + this.top;

    console.log(posX, posY);
    box.position.set(posX, posY, -1);
    return box;
  }

}
