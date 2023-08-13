import "./App.css";
import { data as options } from "./mock";
import AutoComplete, { type Option } from "../ui/auto-complete/Autocomplete";

function App() {
  const handleSelect = (option: Option) => {
    console.log("Selected option:", option);
  };

  return (
    <>
      <h1>React AutoComplete component</h1>

      <div className="card">
        <AutoComplete options={options} onSelect={handleSelect} />
      </div>
    </>
  );
}

export default App;
