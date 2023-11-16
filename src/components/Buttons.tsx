import React from "react";

interface Props {
  onBtnClick: (index: number) => void;
  onBtnClicked?: () => void;

  pokemons: Array<{ name: string }>;
  children: string;
  isDisabled: boolean;
}

const Buttons = ({
  pokemons,
  onBtnClick,
  onBtnClicked,
  children,
  isDisabled,
}: Props) => {
  if (pokemons.length !== 0) {
    return (
      <div>
        {pokemons.map((pokemon, index) => (
          <button
            className="pokemon-buttons"
            key={pokemon.name}
            onClick={() => onBtnClick(index)}
          >
            <div>{pokemon.name}</div>
          </button>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <button
          onClick={() => {
            onBtnClick();
            console.log("onBtnClicked", onBtnClicked);
            if (onBtnClicked) {
              onBtnClicked();
            }
          }}
          disabled={isDisabled}
        >
          {children}
        </button>
      </div>
    );
  }
};

export default Buttons;
