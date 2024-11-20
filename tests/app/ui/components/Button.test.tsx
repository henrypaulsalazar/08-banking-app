import { render, screen, fireEvent } from '@testing-library/react';
import { Button, ButtonType } from '../../../../src/app/ui/components/Button/index';
import { vi } from 'vitest';
import React from 'react';

describe('Button Component', () => {
  it('should render button with provided text', () => {
    render(<Button onClick={vi.fn()} isLoading={false} isDisabled={false} text="Click me" type={ButtonType.BUTTON} />);

    // @ts-ignore
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should show loading spinner when isLoading is true', () => {
    render(<Button onClick={vi.fn()} isLoading={true} isDisabled={false} text="Click me" type={ButtonType.BUTTON} />);

    // @ts-ignore
    expect(screen.queryByText('Click me')).not.toBeInTheDocument();
    // @ts-ignore
    expect(screen.getByRole('button')).toContainHTML('<svg class="actionContainer__button-spinner"');
  });

  it('should apply disabled class and disable button when isDisabled is true', () => {
    render(<Button onClick={vi.fn()} isLoading={false} isDisabled={true} text="Click me" type={ButtonType.BUTTON} />);

    const button = screen.getByRole('button');
    // @ts-ignore
    expect(button).toHaveClass('actionContainer__button--disabled');
    
    // @ts-ignore
    expect(button).toBeDisabled();
  });

  it('should apply loading class and disable button when isLoading is true', () => {
    render(<Button onClick={vi.fn()} isLoading={true} isDisabled={false} text="Click me" type={ButtonType.BUTTON} />);

    const button = screen.getByRole('button');
    // @ts-ignore
    expect(button).toHaveClass('actionContainer__button--loading');
    
    // @ts-ignore
    expect(button).toBeDisabled();
  });

  it('should trigger onClick function when not disabled or loading', () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick} isLoading={false} isDisabled={false} text="Click me" type={ButtonType.BUTTON} />);

    fireEvent.click(screen.getByText('Click me'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not trigger onClick function when disabled', () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick} isLoading={false} isDisabled={true} text="Click me" type={ButtonType.BUTTON} />);

    fireEvent.click(screen.getByText('Click me'));

    expect(handleClick).not.toHaveBeenCalled();
  });
});
