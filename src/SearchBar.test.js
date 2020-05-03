import React from 'react';
import { render } from '@testing-library/react';
import SearchBar from './SearchBar';

test('renders without crashing', () => {
  render(<SearchBar />);
});

test('matches snapshot', () => {
  const { asFragment } = render(<SearchBar />);
  expect(asFragment()).toMatchSnapshot();
});