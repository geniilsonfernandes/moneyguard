import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Button from '.';

const mock = {
  children: 'btn'
};

describe('Button', () => {
  it('renders headline', () => {
    render(<Button {...mock} />);

    const headline = screen.getByText(mock.children);

    expect(headline).toBeInTheDocument();
  });
});
