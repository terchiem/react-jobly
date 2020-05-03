import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Auth from './Auth';

test('renders without crashing', () => {
  render(
    <MemoryRouter>
      <Auth />
    </MemoryRouter>
  );
});

test('matches snapshot', () => {
  const { asFragment } = render(
    <MemoryRouter>
      <Auth />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});