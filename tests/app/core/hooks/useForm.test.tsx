import { renderHook, act } from '@testing-library/react';
import { useForm } from '../../../../src/app/core/hooks/useForm';
import { vi } from 'vitest';

describe('useForm Hook', () => {
  let setError;

  beforeEach(() => {
    setError = vi.fn();
  });

  it('should initialize with the provided initial state', () => {
    const initialState = { name: 'John', email: 'john@example.com' };
    const { result } = renderHook(() => useForm(initialState, setError));

    // @ts-ignore
    expect(result.current.name).toBe('John');
    // @ts-ignore
    expect(result.current.email).toBe('john@example.com');
  });

  it('should update form state when handleChange is called', () => {
    const initialState = { name: '', email: '' };
    const { result } = renderHook(() => useForm(initialState, setError));

    act(() => {
      // @ts-ignore
      result.current.handleChange({ target: { name: 'name', value: 'Jane' } });
    });

    // @ts-ignore
    expect(result.current.name).toBe('Jane');
    // @ts-ignore
    expect(result.current.email).toBe('');
    expect(setError).toHaveBeenCalledWith('');
  });

  it('should reset the error state when handleChange is called', () => {
    const initialState = { name: '', email: '' };
    const { result } = renderHook(() => useForm(initialState, setError));

    act(() => {
      // @ts-ignore
      result.current.handleChange({ target: { name: 'email', value: 'jane@example.com' } });
    });

    expect(setError).toHaveBeenCalledWith('');
  });

  it('should not submit the form when checkSubmit is called', () => {
    const initialState = { name: '', email: '' };
    const { result } = renderHook(() => useForm(initialState, setError));

    const mockEvent = { preventDefault: vi.fn() };

    act(() => {
      // @ts-ignore
      result.current.checkSubmit(mockEvent);
    });

    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });
});
