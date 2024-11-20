import { depositFromExternal } from '../../../../../src/app/core/services/user/depositFromExternal.service';
import { encryptAES } from '../../../../../src/app/core/utils/crypto';
import { handleTryCatch } from '../../../../../src/app/core/utils/handleTryCatch';
import { http } from '../../../../../src/app/core/services/generals/http';
import { vi, it, expect, describe, Mock } from 'vitest';

vi.mock('../../../../../src/app/core/utils/crypto', () => ({
  encryptAES: vi.fn(),
  llaveSimetrica: 'mocked-key',
  vectorInicializacion: 'mocked-iv',
}));

vi.mock('../../../../../src/app/core/utils/handleTryCatch', () => ({
  handleTryCatch: vi.fn(),
}));

vi.mock('../../../../../src/app/core/services/generals/http', () => ({
  http: vi.fn(),
}));


describe('depositFromBranch', () => {
  it('should handle errors when deposit from branch fails', async () => {
    const mockError = new Error('Request failed');
    const mockToken = 'mocked-token';
    
    // @ts-ignore
    handleTryCatch.mockResolvedValue([undefined, mockError]);
    // @ts-ignore
    http.mockResolvedValue([undefined, mockError]);
    // @ts-ignore
    encryptAES.mockResolvedValue('encrypted-value');
    
    const result = await depositFromExternal(1000, '12345', 'customer1', '67890', mockToken);
    
    expect(result).toEqual(mockError);
  });

  it('should call encryptAES for account numbers and customer correctly', async () => {
    const mockResponse = { data: { success: true } };
    const mockToken = 'mocked-token';
    
    // @ts-ignore
    handleTryCatch.mockResolvedValue([mockResponse, undefined]);
    // @ts-ignore
    http.mockResolvedValue(mockResponse);
    // @ts-ignore
    encryptAES.mockResolvedValue('encrypted-value');
    
    await depositFromExternal(1000, '12345', 'customer1', '67890', mockToken);
    
    expect(encryptAES).toHaveBeenCalledWith('12345');
    expect(encryptAES).toHaveBeenCalledWith('67890');
    expect(encryptAES).toHaveBeenCalledWith('customer1');
  });

  it('should log error when encryptAES fails', async () => {
    const mockError = new Error('Encryption failed');
    const mockToken = 'mocked-token';
    
    // @ts-ignore
    encryptAES.mockRejectedValue(mockError);
    
    try {
      await depositFromExternal(1000, '12345', 'customer1', '67890', mockToken);
    } catch (error) {
      expect(error).toEqual(mockError);
    }
  });
});
