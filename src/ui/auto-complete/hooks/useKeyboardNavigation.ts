import { useState } from "react";
import { Option } from "../types";

export function useKeyboardNavigation(
  filteredOptions: Option[],
  handleOptionSelect: (option: Option) => void
) {
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number | null>(
    null
  );

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
        setFocusedOptionIndex(null);
        break;
      default:
        break;
    }
  };

  return {
    handleKeyDown,
    focusedOptionIndex,
  };
}
