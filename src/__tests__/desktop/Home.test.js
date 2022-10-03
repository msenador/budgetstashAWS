import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../../pages/Home';

describe('Desktop Home', () => {
  test('Renders Login and Contact Us buttons', () => {
    const { getByTestId } = render(<Home />);

    expect(getByTestId('login-btn')).toBeTruthy();
    expect(getByTestId('contactUs-btn')).toBeTruthy();
  });

  test('Renders demo button', () => {
    const { getByTestId } = render(<Home />);
    const expected = 'EXPLORE DEMO NOW';

    expect(getByTestId('demo-btn').textContent).toBe(expected);
  });
});
