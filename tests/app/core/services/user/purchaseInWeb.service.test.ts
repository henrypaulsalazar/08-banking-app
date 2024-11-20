import { purchaseInWeb } from '../../../../../src/app/core/services/user/purchaseInWeb.service';
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

describe('purchaseInStore', () => {
  it('should handle errors when purchase in store fails', async () => {
    const mockError = new Error('Request failed');
    const mockToken = 'mocked-token';
    
    //@ts-ignore
    handleTryCatch.mockResolvedValue([undefined, mockError]);
    //@ts-ignore
    http.mockResolvedValue([undefined, mockError]);
    //@ts-ignore
    encryptAES.mockResolvedValue('encrypted-value');
    
    const result = await purchaseInWeb(1000, '12345', 'customer1', mockToken);
    
    expect(result).toEqual(mockError);
  });

  it('should call encryptAES for account number and customer correctly', async () => {
    const mockResponse = { data: { success: true } };
    const mockToken = 'mocked-token';
    
    //@ts-ignore
    handleTryCatch.mockResolvedValue([mockResponse, undefined]);
    //@ts-ignore
    http.mockResolvedValue(mockResponse);
    //@ts-ignore
    encryptAES.mockResolvedValue('encrypted-value');
    
    await purchaseInWeb(1000, '12345', 'customer1', mockToken);
    
    expect(encryptAES).toHaveBeenCalledWith('12345');
    expect(encryptAES).toHaveBeenCalledWith('customer1');
  });

  it('should log error when encryptAES fails', async () => {
    const mockError = new Error('Encryption failed');
    const mockToken = 'mocked-token';
    
    //@ts-ignore
    encryptAES.mockRejectedValue(mockError);
    
    try {
      await purchaseInWeb(1000, '12345', 'customer1', mockToken);
    } catch (error) {
      expect(error).toEqual(mockError);
    }
  });
});
