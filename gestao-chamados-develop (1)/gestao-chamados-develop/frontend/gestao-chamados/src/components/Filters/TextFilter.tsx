import React from "react";
import "./TextFilter.css"
import { traduzirNome } from "./traduzirNome";

interface FilterInputProps {
  column: string;
  type?: string | "text";
  onFilterChange: (value: string) => void;
}

const TextFilter: React.FC<FilterInputProps> = ({ column, onFilterChange, type}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange(event.target.value);
  };

  return (
    <div className="input-block">
      <label htmlFor="" className="title-input">{traduzirNome(column)}</label>
      <input
        className="form-control"
        type={type}
        placeholder={`Filtrar por ${traduzirNome(column).toLowerCase()}`}
        onBlur={handleInputChange}
      />
    </div>
  );
};

export default TextFilter;
