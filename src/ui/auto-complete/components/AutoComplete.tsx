import "./AutoComplete.css";
import React, { useState } from "react";
import type { Option } from "../types";
import AutoCompleteOption from "./AutoCompleteOption";

type AutoCompleteProps = {
  options: Option[];
  onSelect: (option: Option) => void;
};

const AutoComplete: React.FC<AutoCompleteProps> = ({ options, onSelect }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number | null>(
    null
  );

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

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setFocusedOptionIndex((prev) =>
          prev === null || prev === filteredOptions.length - 1 ? 0 : prev + 1
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setFocusedOptionIndex((prev) =>
          prev === null || prev === 0 ? filteredOptions.length - 1 : prev - 1
        );
        break;
      case "Enter":
        if (focusedOptionIndex !== null) {
          handleOptionSelect(filteredOptions[focusedOptionIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setFocusedOptionIndex(null);
        break;
      default:
        break;
    }
  };

  return (
    <div className={`auto-complete ${isOpen ? "auto-complete--open" : ""}`}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type to search..."
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        role="combobox"
      />
      {isOpen && (
        <ul className="options" role="listbox">
          {filteredOptions.map((option, index) => (
            <AutoCompleteOption
              key={option.value}
              option={option}
              filterValue={inputValue}
              onSelect={() => handleOptionSelect(option)}
              isFocused={index === focusedOptionIndex}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
