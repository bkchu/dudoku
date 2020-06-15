export interface GameInitialState {
  isBoardLoading: boolean
  isTimerActive: boolean
  timer: number
}

export const gameInitialState: GameInitialState = {
  isBoardLoading: false,
  isTimerActive: false,
  timer: 0
}