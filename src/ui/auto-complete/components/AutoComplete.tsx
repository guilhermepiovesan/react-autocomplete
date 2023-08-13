import "./AutoComplete.css";
import React, { useEffect, useRef, useState } from "react";
import type { Option } from "../types";
import AutoCompleteOption from "./AutoCompleteOption";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useKeyboardNavigation } from "../hooks/useKeyboardNavigation";
import { useAutocomplete } from "../hooks/useAutocomplete";

type AutoCompleteProps = {
  options: Option[];
  onSelect: (option: Option) => void;
};

const AutoComplete: React.FC<AutoCompleteProps> = ({ options, onSelect }) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const {
    inputValue,
    setInputValue,
    filteredOptions,
    isOpen,
    filterOptions,
    resetDropdown,
  } = useAutocomplete(options);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    filterOptions(value);
  };

  const handleOptionSelect = (option: Option) => {
    setInputValue(option.label);
    resetDropdown();
    onSelect(option);
  };

  useOutsideClick(dropdownRef, () => resetDropdown());

  const { handleKeyDown, focusedOptionIndex } = useKeyboardNavigation(
    filteredOptions,
    handleOptionSelect
  );

  return (
    <div
      className={`auto-complete ${isOpen ? "auto-complete--open" : ""}`}
      ref={dropdownRef}
    >
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
