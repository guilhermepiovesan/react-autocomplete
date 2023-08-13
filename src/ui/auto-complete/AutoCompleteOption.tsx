import React from "react";
import type { Option } from "./types";

interface AutoCompleteOptionProps {
  option: Option;
  onSelect: (option: Option) => void;
}

const AutoCompleteOption: React.FC<AutoCompleteOptionProps> = ({
  option,
  onSelect,
}) => {
  const handleOptionSelect = () => {
    onSelect(option);
  };

  return (
    <li className="option" onClick={handleOptionSelect}>
      {option.label}
    </li>
  );
};

export default AutoCompleteOption;
