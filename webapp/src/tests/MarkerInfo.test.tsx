import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import MarkerInfo from '../components/markerInfo/MarkerInfo';
import { Marker } from '../utils/marker';

describe('MarkerInfo', () => {
  const marker:Marker = {
    name: 'Marker Name',
    description: 'Marker Description',
    image: '',
    reviews: ['Review 1', 'Review 2'],
    ratings: 4,
    category: 'Restaurant',
    url: '',
    position: {
        lat: 0,
        lng: 0
    }

  };

  test('renders marker details', () => {
    render(<MarkerInfo marker={marker} onAddReview={jest.fn()} onDelete={jest.fn()} />);

    expect(screen.getByText(marker.name)).toBeInTheDocument();
    expect(screen.getByText(marker.description)).toBeInTheDocument();
    expect(screen.getByAltText('')).toBeInTheDocument();
    expect(screen.getByText('Review 1')).toBeInTheDocument();
    expect(screen.getByText('Review 2')).toBeInTheDocument();
    expect(screen.getByText(marker.category)).toBeInTheDocument();
  });

  test('calls onAddReview with the new review and rating', () => {
    const onAddReviewMock = jest.fn();
    render(<MarkerInfo marker={marker} onAddReview={onAddReviewMock} onDelete={jest.fn()} />);
    const reviewInput = screen.getByTestId('input');


    fireEvent.change(reviewInput, { target: { value: 'New Review' } });
    fireEvent.click(screen.getByDisplayValue('4'));
    fireEvent.click(screen.getByTestId('submit'));

    expect(onAddReviewMock).toHaveBeenCalledTimes(1);
    expect(onAddReviewMock).toHaveBeenCalledWith('New Review', 4);
  });

  test('calls onDelete with the current marker when delete button is clicked', () => {
    const onDeleteMock = jest.fn();
    render(<MarkerInfo marker={marker} onAddReview={jest.fn()} onDelete={onDeleteMock} />);
    const deleteButton = screen.getByTestId('delete');

    fireEvent.click(deleteButton);

    expect(onDeleteMock).toHaveBeenCalledTimes(1);
    expect(onDeleteMock).toHaveBeenCalledWith(marker);
  });
});
