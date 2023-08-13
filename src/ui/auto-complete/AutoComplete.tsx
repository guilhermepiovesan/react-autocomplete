import "./AutoComplete.css";
import React, { useState } from "react";
import type { Option } from "./types";
import AutoCompleteOption from "./AutoCompleteOption";

type AutoCompleteProps = {
  options: Option[];
  onSelect: (option: Option) => void;
};

const AutoComplete: React.FC<AutoCompleteProps> = ({ options, onSelect }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    filterOptions(value);
  };

  const handleOptionSelect = (option: Option) => {
    setInputValue(option.label);
    setFilteredOptions([]);
    setIsOpen(false);
    onSelect(option);
  };

  const filterOptions = async (value: string) => {
    // Simulating an asynchronous filtering function
    const filtered = await new Promise<Option[]>((resolve) => {
      setTimeout(() => {
        const lowerCaseValue = value.toLowerCase();
        const filteredOptions = options.filter(
          (option) =>
            option.label.toLowerCase().includes(lowerCaseValue) ||
            option.value.toLowerCase().includes(lowerCaseValue)
        );
        resolve(filteredOptions);
      }, 500);
    });

    setFilteredOptions(filtered);
    setIsOpen(true);
  };

  return (
    <div className={`auto-complete ${isOpen ? "auto-complete--open" : ""}`}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type to search..."
      />
      {isOpen && (
        <ul className="options">
          {filteredOptions.map((option) => (
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
