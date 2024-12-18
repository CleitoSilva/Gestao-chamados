import { CSSProperties, FC } from "react"
import './Divider.css'

interface DividerProps{
style?:CSSProperties
}

export const Divider:FC<DividerProps> = ({style}) => {
  return (
    <div className="divider" style={style} />
  )
}
