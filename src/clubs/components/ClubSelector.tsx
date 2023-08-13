import { data as brazilianClubsOptions } from "../mocks/brazilian-clubs";
import { AutoComplete, type Option } from "../../ui/auto-complete";

function ClubSelector() {
  const handleSelect = (option: Option) => {
    console.log("Selected club:", option);
  };

  return (
    <div className="card">
      <AutoComplete options={brazilianClubsOptions} onSelect={handleSelect} />
    </div>
  );
}

export default ClubSelector;
