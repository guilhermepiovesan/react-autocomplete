import React, { useState } from "react";

export type Option = {
  label: string;
  value: string;
};

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
            <li key={option.value} onClick={() => handleOptionSelect(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
