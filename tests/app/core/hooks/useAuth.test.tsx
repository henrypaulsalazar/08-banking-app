import { renderHook, act } from '@testing-library/react';
import { vi, it, expect, describe, beforeEach } from 'vitest';
import { useAuth } from '../../../../src/app/core/hooks/useAuth';
import { AuthContext } from '../../../../src/app/core/state/AuthContext';
import { getUser } from '../../../../src/app/core/services/getUser.service';
import { createUser } from '../../../../src/app/core/services/createUser.service';
import { login, logout } from '../../../../src/app/core/state/auth/actions';

vi.mock('../../../../src/app/core/services/getUser.service');
vi.mock('../../../../src/app/core/services/createUser.service');
vi.mock('../../../../src/app/core/state/auth/actions');

describe('useAuth Hook', () => {
  // @ts-ignore
  let dispatchMock: vi.Mock;

  beforeEach(() => {
    dispatchMock = vi.fn();
    localStorage.clear();
  });

  it('should log in successfully and update state and localStorage', async () => {
    const mockResponse = {
      dinBody: {
        token: 'mock-token',
        roles: ['user'],
        cuentas: [{ number: 123, amount: 1000 }],
      },
    };

    // @ts-ignore
    getUser.mockResolvedValue(mockResponse);
    const mockState = { user: null, token: null };

    const wrapper = ({ children }: any) => (
      // @ts-ignore
      <AuthContext.Provider value={{ state: mockState, dispatch: dispatchMock }}>
        {children}
      </AuthContext.Provider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      const response = await result.current.loginFunction('username', 'password');
      expect(response).toBe(true);
    });

    expect(dispatchMock).toHaveBeenCalledWith(
      // @ts-ignore
      login({ username: 'username', role: 'user', token: 'mock-token' })
    );

    const storedCuenta1 = JSON.parse(localStorage.getItem('cuenta1') || '{}');
    expect(storedCuenta1).toEqual({
      accountNumber: '123',
      balance: 1000,
      customer: 'username',
    });
  });

  it('should fail login if no token is returned', async () => {
    const mockResponse = { dinBody: { token: null } };
    // @ts-ignore
    getUser.mockResolvedValue(mockResponse);
    const mockState = { user: null, token: null };

    const wrapper = ({ children }: any) => (
      // @ts-ignore
      <AuthContext.Provider value={{ state: mockState, dispatch: dispatchMock }}>
        {children}
      </AuthContext.Provider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      const response = await result.current.loginFunction('username', 'password');
      expect(response).toBe(false);
    });
  });

  it('should call logout function and dispatch logout action', async () => {
    const mockState = { user: { username: 'testuser' }, token: 'mock-token' };

    const wrapper = ({ children }: any) => (
      // @ts-ignore
      <AuthContext.Provider value={{ state: mockState, dispatch: dispatchMock }}>
        {children}
      </AuthContext.Provider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.logoutFunction();
    });

    expect(dispatchMock).toHaveBeenCalledWith(logout());
  });

  it('should sign up successfully and return true', async () => {
    const mockResponse = { ok: true };
    // @ts-ignore
    createUser.mockResolvedValue(mockResponse);

    const mockState = { user: null, token: null };

    const wrapper = ({ children }: any) => (
      // @ts-ignore
      <AuthContext.Provider value={{ state: mockState, dispatch: dispatchMock }}>
        {children}
      </AuthContext.Provider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      const response = await result.current.signUpFunction('newUser', 'password', 'mock-token');
      expect(response).toBe(true);
    });

    expect(createUser).toHaveBeenCalledWith('newUser', 'password', 'mock-token');
  });
});
