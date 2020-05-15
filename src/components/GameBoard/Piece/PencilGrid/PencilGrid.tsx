import React, { FC } from "react"
import classnames from 'classnames';
import "./PencilGrid.css"

interface PencilGridProps {
  // the array of pencil marks made by the user
  pencilMarks: number[]
  
  // to determine if the pencil grid is able to be seen
  isVisible: boolean

  // to determine if the colors of the numbers should be inverted while the piece is selected
  isActive: boolean
}

const PencilGrid: FC<PencilGridProps> = ({ isVisible, isActive, pencilMarks }) => {
  const _classNames = classnames('pencil-grid', {
    'pencil-grid--is-visible': isVisible,
    'pencil-grid--is-active': isActive
  });
  return (
    <div className={_classNames}>
      {pencilMarks?.sort((a, b) => a - b).map(num => (
        <p key={num} className="pencil-grid__mark">{num}</p>
      ))}
    </div>
  )
}

export default PencilGrid
