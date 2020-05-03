import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import NavBar from './NavBar';
import { UserProvider } from './testUtils';

test('renders without crashing', () => {
  render(
    <MemoryRouter>
      <UserProvider>
        <NavBar />
      </UserProvider>
    </MemoryRouter>
  );
});

test('matches snapshot', () =>{
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <NavBar />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

test('matches snapshot when logged out', () =>{
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider token={null} >
        <NavBar />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});