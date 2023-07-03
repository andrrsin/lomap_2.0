import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Filters from '../components/filters/Filters';


  test('should render correctly', () => {
    render(
      <Filters
        selectedCategories={['Restaurant']}
        handleFilters={jest.fn()}
        clearFilters={jest.fn()}
        handleCategoryChange={jest.fn()}
      />
    );

    const filterTitle = screen.getByText('Filter');
    expect(filterTitle).toBeInTheDocument();

    const filterSelect = screen.getByTestId('combobox');
    expect(filterSelect).toBeInTheDocument();

    const applyButton = screen.getByText('Apply');
    expect(applyButton).toBeInTheDocument();

    const clearButton = screen.getByText('Clear');
    expect(clearButton).toBeInTheDocument();
  });

  test('should call handleFilters when Apply button is clicked', () => {
    let a = jest.fn();
    render(
        <Filters
          selectedCategories={['Restaurant']}
          handleFilters={a}
          clearFilters={jest.fn()}
          handleCategoryChange={jest.fn()}
        />
      );

    const applyButton = screen.getByText('Apply');
    fireEvent.click(applyButton);

    expect(a).toHaveBeenCalledTimes(1);
  });

  test('should call clearFilters when Clear button is clicked', () => {
    let a = jest.fn();
    render(
        <Filters
          selectedCategories={['Restaurant']}
          handleFilters={jest.fn()}
          clearFilters={a}
          handleCategoryChange={jest.fn()}
        />
      );

    const clearButton = screen.getByText('Clear');
    fireEvent.click(clearButton);

    expect(a).toHaveBeenCalledTimes(1);
  });

  test('should call handleCategoryChange when filter select value is changed', () => {
    let a = jest.fn();
    render(
        <Filters
          selectedCategories={['Restaurant']}
          handleFilters={jest.fn()}
          clearFilters={jest.fn()}
          handleCategoryChange={a}
        />
      );

    const filterSelect = screen.getByTestId('combobox');
    fireEvent.change(filterSelect, { target: { value: ['Restaurant', 'Park'] } });

    expect(a).toHaveBeenCalledTimes(1);
    
  });
