import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { EngineService } from "./engine.service";
import { Game } from "./game-selector/game-selector.component";
import { DemoGame } from "./game-apps/demo-game-app";
import { TetrisGame } from "./game-apps/tetris-game-app";
import { Vector3 } from "three";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
})
export class GamesComponent implements OnInit {

  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas!: ElementRef<HTMLCanvasElement>;

  public selectedId: number = 0;

  public games: Game[] = [
    {
      name: "Demo",
      description: "demo",
      id: 0,
      data: new DemoGame()
    },
    {
      name: "Tetris",
      description: "tetris clone",
      id: 1,
      data: new TetrisGame()
    }
  ];

  public constructor(private engServ: EngineService) {
  }

  public ngOnInit(): void {
    this.engServ.setupRenderer(this.rendererCanvas);
    for (const game of this.games) {
      game.data.setup();
    }

    this.changeSelection(1);

    this.engServ.animate(this.games[this.selectedId].data, this.selectedId);
  }

  public changeSelection(id: number): void {
    this.selectedId = id;
    this.engServ.setScene(this.games[id].data.getScene(), id);
    this.engServ.animate(this.games[id].data, id);
  }
}
