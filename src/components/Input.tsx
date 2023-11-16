import React, { ReactNode } from "react";

interface Props {
    textType: string;
    inputRef: any
    wordPlaceHolder: string
}

const Input = ({ textType, inputRef, wordPlaceHolder }: Props) => {
    return (
        <input className="text-box" ref={inputRef} type={textType} placeholder={wordPlaceHolder}>
        </input>
    )
};

export default Input;