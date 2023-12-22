import { Camera } from "three";
import { GameApp } from "./game-app";
import * as THREE from "three";
import { EngineService } from "../engine.service";

interface Tetramino {
  shape: THREE.Object3D[];
  color: number;
}

export class TetrisGame extends GameApp {
  private cubeSize: number = 1.75;
  private top: number = 0;
  private left: number = 0;
  // 1 = 1 second
  private speed: number = 0.5;
  private baseSpeed: number = 1.8

  // 10 x 20 board
  private boardWidth: number = 10;
  private boardHeight: number = 20
  private board: number[] = Array(this.boardHeight * this.boardWidth).fill(0);

  private tetriminoColor: number[] = [0xFF0000, 0x00FF00, 0x0000FF, 0xFFFF00, 0x00FFFF, 0xFF00FF, 0xF0F0FF];
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
    ],
    [
      [1, 1],
      [1, 1],
    ],
    [
      [0, 1, 1],
      [1, 1, 0],
    ],
    [
      [1, 1, 0],
      [0, 1, 1],
    ],
    [
      [1, 1, 1],
      [0, 0, 1]
    ],
    [
      [0, 0, 1],
      [1, 1, 1]
    ]
  ]

  private currentTetrimino?: Tetramino = undefined;
  private playing: boolean = true;
  private currentX: number = 0;
  private currentY: number = 20;

  constructor() {
    super(100, 800);
    this.top = this.height - (this.height / 2) - (this.boardHeight * this.cubeSize);
    this.left = this.width - (this.width / 2) - (this.boardWidth * this.cubeSize/2);
    this.name = 'tetris-demo';
    this._debug = true;
  }

  override getCamera(): Camera {
    if (this.camera != null) return this.camera;
    this.camera = EngineService.setupCamera3D();
    this.camera.position.z = 32;
    return this.camera;
  }

  private createWalls(): void {
    var factory = this.boardHeight / 1.2;
    var factorx = this.boardWidth / 2;
    var wallColor = 0x00FFFF;

    // Bottom wall
    for (var i = 0; i <= this.boardWidth + 1; i++) {
      var xpos = ((i-1) * this.cubeSize) - factorx;
      var ypos = (-this.cubeSize) - factory
      this.insertCube(xpos, ypos, 0, this.cubeSize, wallColor);
    }

    // Left wall
    for (var i = 0; i <= this.boardHeight + 1; i++) {
      var xpos = (-this.cubeSize) - factorx;
      var ypos = ((i-1) * this.cubeSize) - factory
      this.insertCube(xpos, ypos, 0, this.cubeSize, wallColor);
    }

    // Right wall
    for (var i = 0; i <= this.boardHeight + 1; i++) {
      var xpos = (this.boardWidth * this.cubeSize) - factorx;
      var ypos = ((i-1) * this.cubeSize) - factory
      this.insertCube(xpos, ypos, 0, this.cubeSize, wallColor);
    }
  }

  override createScene(): void {
    this.scene.background = new THREE.Color(0x000000);



    this.createWalls();

    document.addEventListener('keydown', (event) => {
      if (event.key === "ArrowLeft") {
        this.translateTetrimino(-1, 0);
      } else if (event.key === "ArrowRight") {
        this.translateTetrimino(1, 0);
      } else if (event.key === "ArrowDown") {
        this.speed = 0.1;
      } else if (event.code === "Space") {
        while (this.translateTetrimino(0, -1) == 0) {
          this.translateTetrimino(0, -1);
        }
      }
    });

    // document.addEventListener('keyup', (event) => {
    //   if (event.key === "ArrowDown") {
    //     this.speed = this.baseSpeed;
    //   } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    //     this.currentX = 0;
    //   }
    // });

  }

  public translateTetrimino(x: number, y: number): number {
    var dx = x * this.cubeSize;
    var dy = (y * this.cubeSize);
    for (const entity of this.currentTetrimino!.shape) {
      console.log(entity.position.y);
      var checkX = entity.position.x + dx;
      var checkY = entity.position.y + dy;
      if (checkY < (-this.boardHeight / 1.2)) return -1;
      if (checkX < (-this.boardWidth / 2)) return -1;

      if (this.board[this.coordinatesToIndex(checkX, checkY)] !== 0) {
        if (entity.position.y >= this.boardHeight/1.2) {
          this.playing = false;
        } 
        return -1; 
      }
    }

    for (const entity of this.currentTetrimino!.shape) {
      entity.position.x += dx;
      entity.position.y += dy;
    }
    return 0;
  }

  public createTetrimino(): Tetramino {
    var random = Math.floor(Math.random() * this.tetriminos.length);
    var tetrimino = this.tetriminos[random];
    var shapes = [];

    var factory = this.boardHeight / 1.2;
    var factorx = this.boardWidth / 2;

    for (var i = 0; i < tetrimino.length; i++) {
      for (var j = 0; j < tetrimino[i].length; j++) {
        if (tetrimino[i][j] !== 0) {
          var cube = EngineService.createCube(new THREE.Vector3(this.cubeSize, this.cubeSize, this.cubeSize), this.tetriminoColor[random]);
          var [xpos, ypos] = this.indexToCoordinates(this.coordinatesToIndex((j * this.cubeSize) - this.boardWidth/this.cubeSize, i * this.cubeSize + this.boardHeight/this.cubeSize));
          cube.position.x = (j+this.cubeSize) * this.cubeSize - factorx/this.cubeSize;
          cube.position.y = i * this.cubeSize + factory;
          cube.position.z = 0;
          this.addEntity(cube);
          shapes.push(cube);
        }
      }
    }

    return {
      shape: shapes,
      color: this.tetriminoColor[random],
    }
  }

  private indexToCoordinates(index: number): [number, number]{
    var xpos = (index % this.boardWidth) * this.cubeSize - (this.boardWidth / 2);
    var ypos = (Math.floor(index / this.boardWidth) * this.cubeSize) - (this.boardHeight / 1.2);
    return [xpos, ypos];
  }

  private coordinatesToIndex(x: number, y: number): number {
    var xpos = (x + (this.boardWidth / 2)) / this.cubeSize;
    var ypos = (y + (this.boardHeight / 1.2)) / this.cubeSize;
    return Math.floor((ypos * this.boardWidth) + xpos);
  }

  override update(deltaTime: number) {
    this.totalTime += deltaTime;
    if (this.playing) {
      if (this.currentTetrimino === undefined) {
        this.currentTetrimino = this.createTetrimino();
      }
      
      if (this.totalTime > this.speed) {
        this.totalTime = 0;
        if (this.translateTetrimino(0, -1) == -1) {
          for (const box of this.currentTetrimino!.shape) {
            var indx = this.coordinatesToIndex(box.position.x, box.position.y);
            this.board[indx] = this.currentTetrimino!.color;
            this.scene.remove(box);
          }
          this.currentTetrimino = undefined;
        };
      }

      for (var i = 0; i < this.board.length; i++) {
        if (this.board[i] !== 0) {
          var [xpos, ypos] = this.indexToCoordinates(i);
          this.insertCube(xpos, ypos, 0, this.cubeSize, this.board[i]);
        }
      }
    }
  }
}
