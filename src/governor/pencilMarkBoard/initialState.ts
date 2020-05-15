import { PencilMarkBoard } from "../../models/client/pencilMarkBoard";

const pencilMarkBoard: PencilMarkBoard = Array(81).fill([]);

export interface PencilMarkBoardInitialState {
  pencilMarkBoard: PencilMarkBoard
  pencilMode: boolean
}

export const pencilMarkBoardInitialState: PencilMarkBoardInitialState = {
  pencilMarkBoard,
  pencilMode: false,
};

