import { SearchIcon } from "../../utils/icon";
import { Input } from "../ui/input";

const SearchComponent = ({ value, handleSearch, placeholder }) => {
  const handleInputChange = (e) => {
    handleSearch(e.target.value);
  };

  return (
    <div className="w-full relative flex items-center justify-center">
      <Input
        type="search"
        value={value}
        onChange={handleInputChange}
        onInput={handleInputChange}
        placeholder={placeholder || "Enter job title, company, location"}
        className="appearance-none p-[12px] pl-[35px] rounded-[69px] border border-[#000] focus:border-[#6945ED] placeholder:text-sm placeholder:text-[#A3A3A3] focus:outline-none focus-visible:ring-0 focus:border-1"
      />
      <div className="absolute left-[12px] top-1/2 transform -translate-y-1/2">
        <SearchIcon className="h-[18px] w-[18px]" />
      </div>
    </div>
  );
};

export default SearchComponent;
