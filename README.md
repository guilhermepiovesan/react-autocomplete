# React AutoComplete

This is a simple auto-complete component implemented in React with TypeScript.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/guilhermepiovesan/react-autocomplete.git
   ```

2. Install the dependencies:

   ```bash
   cd react-autocomplete
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Open your browser and navigate to `http://localhost:5173/react-autocomplete/` to see the auto-complete component in action.

## Usage

To use the auto-complete component in your own project, follow these steps:

1. Import the `AutoComplete` component from the UI folder.
2. Pass the `options` prop with an array of options and the `onSelect` prop with a callback function to handle the selection of an option.

```tsx
import React from "react";
import { AutoComplete, type Option } from "../ui/auto-complete";

const MyComponent: React.FC = () => {
  const options: Option[] = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  const handleSelect = (option) => {
    console.log("Selected option:", option);
  };

  return (
    <div>
      <h1>My Component</h1>
      <AutoComplete options={options} onSelect={handleSelect} />
    </div>
  );
};

export default MyComponent;
```
