import { renderHook, act } from '@testing-library/react';
import { useUser } from '../../../../src/app/core/hooks/useUser';
import { UserContext } from '../../../../src/app/core/state/UserContext';
import { AuthContext } from '../../../../src/app/core/state/AuthContext';
import * as depositFromATMService from '../../../../src/app/core/services/user/depositFromATM.service';
import * as withdrawalFromATMService from '../../../../src/app/core/services/user/withdrawalFromATM.service';
import * as depositFromBranchService from '../../../../src/app/core/services/user/depositFromBranch.service';
import * as depositFromExternalService from '../../../../src/app/core/services/user/depositFromExternal.service';
import * as purchaseInStoreService from '../../../../src/app/core/services/user/purchaseInStore.service'; 
import * as purchaseInWebService from '../../../../src/app/core/services/user/purchaseInWeb.service';
import { vi } from 'vitest';

// Mock data
const mockDispatch = vi.fn();
const mockUserState = { balance: 100, accountNumber: '123456', customer: 'John Doe' };
const mockAuthState = { token: 'mock-token' };

// Mocks for services
vi.mock('../services/user/depositFromATM.service');
vi.mock('../services/user/withdrawalFromATM.service');
vi.mock('../services/user/depositFromBranch.service');
vi.mock('../services/user/depositFromExternal.service');
vi.mock('../services/user/purchaseInStore.service');
vi.mock('../services/user/purchaseInWeb.service');

// Mock the Context Providers
const wrapper = ({ children }) => (
  // @ts-ignore
  <UserContext.Provider value={{ state: mockUserState, dispatch: mockDispatch }}>
    {
      // @ts-ignore
      <AuthContext.Provider value={{ state: mockAuthState }}>
      {children}
    </AuthContext.Provider>
    }
  </UserContext.Provider>
);

describe('useUser Hook', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    vi.clearAllMocks();
  });

  it('should return initial user data', () => {
    const { result } = renderHook(() => useUser(), { wrapper });

    expect(result.current.balance).toBe(100);
    expect(result.current.accountNumber).toBe('123456');
    expect(result.current.customer).toBe('John Doe');
  });
});
