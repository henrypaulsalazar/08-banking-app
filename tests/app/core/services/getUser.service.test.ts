import { getUser } from '../../../../src/app/core/services/getUser.service';
import { handleTryCatch } from '../../../../src/app/core/utils/handleTryCatch';
import { vi, it, expect, describe } from 'vitest';

vi.mock('../../../../src/app/core/utils/handleTryCatch', () => ({
  handleTryCatch: vi.fn(),
}));

vi.mock('../../../../src/app/core/services/generals/http', () => ({
  http: vi.fn(),
}));

describe('getUser', () => {
  it('should return data when the request is successful', async () => {
    const mockResponse = { data: { user: 'testUser' } };
    // @ts-ignore
    handleTryCatch.mockResolvedValue([mockResponse, undefined]);

    const result = await getUser('testUser', 'password');
    expect(result).toEqual(mockResponse.data);
  });

  it('should return error when the request fails', async () => {
    const mockError = new Error('Request failed');
    // @ts-ignore
    handleTryCatch.mockResolvedValue([undefined, mockError]);

    const result = await getUser('testUser', 'password');
    expect(result).toEqual(mockError);
  });

  it('should handle empty username and password correctly', async () => {
    const mockResponse = { data: { user: 'testUser' } };
    // @ts-ignore
    handleTryCatch.mockResolvedValue([mockResponse, undefined]);

    const result = await getUser('', '');
    expect(result).toEqual(mockResponse.data);
  });
});
