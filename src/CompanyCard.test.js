import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import CompanyCard from './CompanyCard';

test('renders without crashing', () => {
  render(
    <MemoryRouter>
      <CompanyCard />
    </MemoryRouter>
  );
});

test('matches snapshot', () => {
  const { asFragment } = render(
    <MemoryRouter>
      <CompanyCard />
    </MemoryRouter>
  );
  
  expect(asFragment()).toMatchSnapshot();
})