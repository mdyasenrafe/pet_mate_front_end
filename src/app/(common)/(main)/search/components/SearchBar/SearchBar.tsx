import React from "react";
import { Input } from "antd";
import { type } from "os";

const { Search } = Input;

type SearchBarProps = {
  searchKeyword: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: (value: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  searchKeyword,
  handleSearchChange,
  handleSearch,
}) => {
  return (
    <div className="mb-6">
      <Search
        placeholder="Search by title or content"
        enterButton
        onSearch={handleSearch}
        value={searchKeyword}
        onChange={handleSearchChange}
      />
    </div>
  );
};
