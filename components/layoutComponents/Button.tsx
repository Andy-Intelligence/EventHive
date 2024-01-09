import React from 'react'

interface ButtonProp {
    text?:string;
    color?:string;
    onClick?:()=>void;

}
const Button = ({text,color,onClick}:ButtonProp) => {
  return (
    <button onClick={onClick} className={`border border-black bg-${color} w-[10rem] h-[4rem] text-white p-2 font-bold rounded-[30px]`}>
        {text}
    </button>
  )
}

export default Button