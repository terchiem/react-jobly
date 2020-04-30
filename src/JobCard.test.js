import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import JobCard from './JobCard';

test('renders without crashing', () => {
  render(
    <MemoryRouter>
      <JobCard />
    </MemoryRouter>
  );
});

test('matches snapshot', () => {
  const { asFragment } = render(
    <MemoryRouter>
      <JobCard />
    </MemoryRouter>
  );
  
  expect(asFragment()).toMatchSnapshot();
})