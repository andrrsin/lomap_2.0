
import React from 'react';

interface FiltersProps {
    selectedCategories: string[];
    handleFilters: () => void;
    clearFilters: () => void;
    handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;

}

const Filters: React.FC<FiltersProps> = ({
    selectedCategories,
    handleFilters,
    clearFilters,
    handleCategoryChange

}) => {

    return (<div className="floating-div filter-div">
        <h3 className="filter-title">Filter</h3>
        <div className="filter-select-wrapper">
            <select data-testid="combobox" className="filter-select" multiple value={selectedCategories} onChange={handleCategoryChange}>
                <option value="Restaurant">Restaurant</option>
                <option value="Park">Park</option>
                <option value="Pub">Pub</option>
                <option value="Museum">Museum</option>
                <option value="Shop">Shop</option>
                <option value="Other">Other</option>
            </select>
            <div className="filter-select-icon">&#9662;</div>
        </div>
        <div className="filter-button-group">
            <button className="filter-button" onClick={handleFilters}>
                Apply
            </button>
            <button className="filter-button" onClick={clearFilters}>
                Clear
            </button>
        </div>
    </div>);
}

export default Filters;