import React from "react";
import { Input } from "antd";
import { type } from "os";

const { Search } = Input;

type SearchBarProps = {
  searchKeyword: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: (value: string) => void;
  placeholder: string;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  searchKeyword,
  handleSearchChange,
  handleSearch,
  placeholder,
}) => {
  return (
    <div className="mb-6">
      <Search
        placeholder={placeholder}
        enterButton
        onSearch={handleSearch}
        value={searchKeyword}
        onChange={handleSearchChange}
        allowClear
      />
    </div>
  );
};
