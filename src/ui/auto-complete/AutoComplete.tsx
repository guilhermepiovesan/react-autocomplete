import React, { useState } from "react";
import type { Option } from "./types";
import AutoCompleteOption from "./AutoCompleteOption";

type AutoCompleteProps = {
  options: Option[];
  onSelect: (option: Option) => void;
};

const AutoComplete: React.FC<AutoCompleteProps> = ({ options, onSelect }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleOptionSelect = (option: Option) => {
    setInputValue(option.label);
    onSelect(option);
  };

  return (
    <div className="auto-complete">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type to search..."
      />
      {inputValue && (
        <ul className="options">
          {options.map((option) => (
            <AutoCompleteOption
              key={option.value}
              option={option}
              onSelect={() => handleOptionSelect(option)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
