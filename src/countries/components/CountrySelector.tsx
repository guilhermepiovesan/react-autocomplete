import { AutoComplete, type Option } from "../../ui/auto-complete";
import { useEffect, useState } from "react";

type Country = {
  name: {
    common: string;
  };
  cca2: string;
};

function App() {
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleSelect = (option: Option) => {
    console.log("Selected country:", option);
  };

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,cca2")
      .then((response) => response.json())
      .then((data: Country[]) => {
        const countriesOptions: Option[] = data.map((country) => ({
          value: country.cca2,
          label: country.name.common,
        }));
        setOptions(countriesOptions);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="card">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <AutoComplete options={options} onSelect={handleSelect} />
      )}
    </div>
  );
}

export default App;
