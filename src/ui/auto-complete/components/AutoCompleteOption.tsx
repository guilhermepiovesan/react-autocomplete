import "./AutoCompleteOption.css";
import React from "react";
import type { Option } from "../types";
import { decomposeLabel } from "../helpers/strings";

interface AutoCompleteOptionProps {
  option: Option;
  onSelect: (option: Option) => void;
  filterValue: string;
  isFocused: boolean;
}

const AutoCompleteOption: React.FC<AutoCompleteOptionProps> = ({
  option,
  onSelect,
  filterValue,
  isFocused,
}) => {
  const [prefix, match, suffix] = decomposeLabel(option.label, filterValue);

  const handleOptionSelect = () => {
    onSelect(option);
  };

  return (
    <li
      className="auto-complete-option"
      onClick={handleOptionSelect}
      role="option"
      aria-selected={isFocused}
    >
      {prefix}
      <span className="highlight">{match}</span>
      {suffix}
    </li>
  );
};

export default AutoCompleteOption;
