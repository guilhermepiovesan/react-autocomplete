import { useState } from "react";
import { Option } from "../types";
import { normalizeString } from "../helpers/strings";

export function useAutocomplete(options: Option[]) {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const filterOptions = async (value: string) => {
    const normalizedValue = normalizeString(value);
    const filteredOptions = options.filter(
      (option) =>
        normalizeString(option.label).includes(normalizedValue) ||
        normalizeString(option.value).includes(normalizedValue)
    );
    setFilteredOptions(filteredOptions);
    setIsOpen(true);
  };

  const resetDropdown = () => {
    setFilteredOptions([]);
    setIsOpen(false);
  };

  return {
    inputValue,
    setInputValue,
    filteredOptions,
    isOpen,
    filterOptions,
    resetDropdown,
  };
}
