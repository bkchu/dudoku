export type Board = Piece[];

export interface Piece {
  number: number;

  index: number;

  // is the piece actionable
  isActionable: boolean;
}

