import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import SignUpForm from './SignUpForm';

test('renders without crashing', () => {
  render(
    <MemoryRouter>
      <SignUpForm />
    </MemoryRouter>
  );
});

test('matches snapshot', () => {
  const { asFragment } = render(
    <MemoryRouter>
      <SignUpForm />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});