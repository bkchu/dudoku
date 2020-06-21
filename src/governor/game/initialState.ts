export interface GameInitialState {
  isBoardLoading: boolean
  isTimerActive: boolean
  timer: number
  isPaused: boolean
}

export const gameInitialState: GameInitialState = {
  isBoardLoading: false,
  isTimerActive: false,
  timer: 0,
  isPaused: false
}