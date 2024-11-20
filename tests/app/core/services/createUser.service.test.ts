import { createUser } from '../../../../src/app/core/services/createUser.service';
import { HTTP_METHODS } from '../../../../src/app/core/constants/httpMethods';
import { urlResources } from '../../../../src/app/core/constants/urlResources';
import { handleTryCatch } from '../../../../src/app/core/utils/handleTryCatch';
import { http } from '../../../../src/app/core/services/generals/http';
import { vi, it, expect, describe } from 'vitest';
import { v4 as uuidv4 } from 'uuid';

vi.mock('../../../../src/app/core/utils/handleTryCatch', () => ({
  handleTryCatch: vi.fn(),
}));

vi.mock('../../../../src/app/core/services/generals/http', () => ({
  http: vi.fn(),
}));

vi.mock('uuid', () => ({
  v4: vi.fn(),
}));

describe('createUser', () => {
  it('should return data when the request is successful', async () => {
    const mockResponse = { data: { user: 'newUser' } };
    // @ts-ignore
    handleTryCatch.mockResolvedValue([mockResponse, undefined]);
    // @ts-ignore
    http.mockResolvedValue(mockResponse);
    
    const token = 'mockToken';
    const result = await createUser('newUser', 'password123', token);
    expect(result).toEqual(mockResponse.data);
  });

  it('should return error when the request fails', async () => {
    const mockError = new Error('Request failed');
    // @ts-ignore
    handleTryCatch.mockResolvedValue([undefined, mockError]);
    // @ts-ignore
    http.mockResolvedValue([undefined, mockError]);

    const token = 'mockToken';
    const result = await createUser('newUser', 'password123', token);
    expect(result).toEqual(mockError);
  });

  it('should generate a new UUID for each call', async () => {
    const mockResponse = { data: { user: 'newUser' } };
    // @ts-ignore
    handleTryCatch.mockResolvedValue([mockResponse, undefined]);
    // @ts-ignore
    http.mockResolvedValue(mockResponse);
    const token = 'mockToken';

    const uuidMock = vi.fn().mockReturnValue('mocked-uuid');
    // @ts-ignore
    uuidv4.mockImplementation(uuidMock);

    await createUser('newUser', 'password123', token);

    expect(uuidMock).toHaveBeenCalled();
    expect(uuidv4()).toBe('mocked-uuid');
  });

  it('should handle empty username and password correctly', async () => {
    const mockResponse = { data: { user: 'newUser' } };
    // @ts-ignore
    handleTryCatch.mockResolvedValue([mockResponse, undefined]);
    // @ts-ignore
    http.mockResolvedValue(mockResponse);
    
    const token = 'mockToken';
    const result = await createUser('', '', token);
    expect(result).toEqual(mockResponse.data);
  });
});
