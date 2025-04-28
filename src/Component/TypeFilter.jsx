import React from "react";

const TypeFilter = ({ selectedType, setSelectedType }) => {
  return (
    <div className="mb-4 flex justify-center gap-4">
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className="px-4 py-2 border rounded-md text-black"
      >
        <option value="">Filter by type</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="grass">Grass</option>
        <option value="electric">Electric</option>
        <option value="bug">Bug</option>
        <option value="normal">Normal</option>
        <option value="poison">Poison</option>
        <option value="fairy">Fairy</option>
      </select>
    </div>
  );
};

export default TypeFilter;