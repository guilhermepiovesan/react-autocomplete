import "./App.css";
import ClubSelector from "../clubs/components/ClubSelector";
import CountrySelector from "../clubs/components/CountrySelector";

function App() {
  return (
    <>
      <h1>React AutoComplete component</h1>

      <ClubSelector />

      <CountrySelector />
    </>
  );
}

export default App;
