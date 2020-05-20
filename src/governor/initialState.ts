import { BoardInitialState } from "./board";
import { PencilMarkBoardInitialState } from "./pencilMarkBoard";
import { GameInitialState } from "./game/initialState";

export interface InitialState {
  board: BoardInitialState,
  pencilMarkBoard: PencilMarkBoardInitialState,
  game: GameInitialState
}