import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import MarkerForm from '../components/markerForm/MarkerForm';
import { Marker } from '../utils/marker';

describe('MarkerForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  const initialMarker:Marker = { 
            name: '',
            description: '',
            image: '',
            reviews: [],
            ratings: 0,
            category: 'Other',
            position: {
                lat: 0,
                lng: 0
            }


  };

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnCancel.mockClear();
  });

  test('renders form with initial values', () => {
    render(
      <MarkerForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        initialMarker={initialMarker}
      />
    );

    // Verify that form fields are rendered with initial values
    expect(screen.getByLabelText('Name:')).toHaveValue(initialMarker.name);
    expect(screen.getByLabelText('Description:')).toHaveValue(
      initialMarker.description
    );
    expect(screen.getByLabelText('Category:')).toHaveValue(
      initialMarker.category
    );
  });

  test('updates marker fields on input change', () => {
    render(
      <MarkerForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        initialMarker={initialMarker}
      />
    );

    // Change input values
    fireEvent.change(screen.getByLabelText('Name:'), {
      target: { value: 'Marker Name' },
    });
    fireEvent.change(screen.getByLabelText('Description:'), {
      target: { value: 'Marker Description' },
    });
    fireEvent.change(screen.getByLabelText('Category:'), {
      target: { value: 'Restaurant' },
    });

    // Verify that marker fields are updated
    expect(screen.getByLabelText('Name:')).toHaveValue('Marker Name');
    expect(screen.getByLabelText('Description:')).toHaveValue(
      'Marker Description'
    );
    expect(screen.getByLabelText('Category:')).toHaveValue('Restaurant');
  });

  test('calls onSubmit with marker data on form submission', () => {
    render(
      <MarkerForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        initialMarker={initialMarker}
      />
    );

    // Change input values
    fireEvent.change(screen.getByLabelText('Name:'), {
      target: { value: 'Marker Name' },
    });
    fireEvent.change(screen.getByLabelText('Description:'), {
      target: { value: 'Marker Description' },
    });
    fireEvent.change(screen.getByLabelText('Category:'), {
      target: { value: 'Restaurant' },
    });

    // Submit the form
    fireEvent.click(screen.getByText('Add Marker'));

    // Verify that onSubmit is called with the marker data
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'Marker Name',
      description: 'Marker Description',
      image: '',
      category: 'Restaurant',
      position: {
        lat: 0,
        lng: 0
      },
      reviews: [],
      ratings: 0
    });
  });

  test('resets form on successful form submission', () => {
    render(
      <MarkerForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        initialMarker={initialMarker}
      />
    );

    // Change input values
    fireEvent.change(screen.getByLabelText('Name:'), {
      target: { value: 'Marker Name' },
    });
    fireEvent.change(screen.getByLabelText('Description:'), {
      target: { value: 'Marker Description' },
    });

    // Submit the form
    fireEvent.click(screen.getByText('Add Marker'));

    // Verify that form fields are reset to initial values
    expect(screen.getByLabelText('Name:')).toHaveValue(initialMarker.name);
    expect(screen.getByLabelText('Description:')).toHaveValue(
      initialMarker.description
    );
  });
});