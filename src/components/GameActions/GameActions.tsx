import React, { FC } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createBoardCheckBoardAction } from '../../governor/actions';

export interface GameActionsProps {
  checkBoard: () => {}
}

const GameActions: FC<GameActionsProps> = ({ checkBoard }) => {
  return (
    <>
      <button onClick={checkBoard}>Check Board</button>
    </>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  checkBoard: () => dispatch(createBoardCheckBoardAction())
})

export default connect(null, mapDispatchToProps)(GameActions);