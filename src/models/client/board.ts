export type Board = Piece[];

export interface Piece {
  number: number;

  index: number;

  // is the piece actionable
  isActionable: boolean;

  isWrong: boolean;

  isHighlighted: boolean;

  isActive: boolean;
}

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}