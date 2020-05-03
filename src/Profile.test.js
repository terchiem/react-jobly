import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Profile from './Profile';
import { UserProvider } from './testUtils';

test('renders without crashing', () => {
  render(
    <MemoryRouter>
      <UserProvider>
        <Profile />
      </UserProvider>
    </MemoryRouter>
  );
});

test('matches snapshot', () => {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <Profile />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
