import React from "react";

interface Props {
    children: any
}

const Cards = ({children}: Props) => {
return (
    <div className="cards-container"> 
        {children}
    </div>
)
}

export default Cards