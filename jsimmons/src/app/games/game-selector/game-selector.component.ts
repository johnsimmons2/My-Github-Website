import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'app-game-selector',
  templateUrl: './game-selector.component.html',
  styleUrls: ['./game-selector.component.scss']
})
export class GameSelectorComponent {

  @Input() games: Game[] = [];

  public currentId: number = 0;
  @Output() selectedId: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  select(id: number) {
    this.currentId = id;
    this.selectedId.emit(id);
  }
}

export interface Game {
  name: string;
  description: string;
  id: number;
  data?: any;
}
