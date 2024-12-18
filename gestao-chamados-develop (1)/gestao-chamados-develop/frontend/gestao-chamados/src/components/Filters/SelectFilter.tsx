import React from "react";
import "./SelectFilter.css"
import { traduzirNome } from "./traduzirNome";

interface FilterInputProps {
  column: string;
  onFilterChange: (value: string) => void;
}

const SelectFilter: React.FC<FilterInputProps> = ({ column, onFilterChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(event.target.value);
  };

  return (
    <div className="input-block">
      <label htmlFor={column} className="title-input">{traduzirNome(column)}</label>
      <select className="form-control" name="type" id={column} onChange={handleInputChange}>
        <option value="">Todas</option>
        <option value="0">Padrão</option>
        <option value="1">Receita</option>
      </select>
    </div>
  );
};

export default SelectFilter;
