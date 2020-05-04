import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import PrivateRoute from './PrivateRoute';
import { UserProvider } from './testUtils';

test('renders without crashing', () => {
  render(
    <MemoryRouter>
      <UserProvider>
        <PrivateRoute />
      </UserProvider>
    </MemoryRouter>
  );
});

test('matches snapshot', () =>{
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <PrivateRoute />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

test('matches snapshot when logged out', () =>{
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider token={null}>
        <PrivateRoute />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});