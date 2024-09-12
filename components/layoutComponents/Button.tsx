import React from 'react'

interface ButtonProp {
  text?: string;
  color?: string;
  onClick?: () => void;
  onSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const Button = ({text,color,onClick,onSubmit}:ButtonProp) => {
  return (
    <button onSubmit={onSubmit} onClick={onClick} className={`border border-black bg-${color} w-[10rem] h-[4rem] text-black p-2 font-bold rounded-[30px]`}>
        {text}
    </button>
  )
}

export default Button