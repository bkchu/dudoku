import { BoardInitialState } from "./board";
import { PencilMarkBoardInitialState } from "./pencilMarkBoard";

export interface InitialState {
  board: BoardInitialState,
  pencilMarkBoard: PencilMarkBoardInitialState
}