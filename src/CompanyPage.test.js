import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import CompanyPage from './CompanyPage';
import { UserProvider } from './testUtils';

test('renders without crashing', () => {
  render(
    <MemoryRouter>
      <UserProvider>
        <CompanyPage />
      </UserProvider>
    </MemoryRouter>
  );
});

test('matches snapshot', () => {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <CompanyPage />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});