import { http } from '../../../../../src/app/core/services/generals/http';
import axios, { AxiosResponse } from 'axios';
import { HTTP_METHODS } from '../../../../../src/app/core/constants/httpMethods';
import { vi, it, expect, describe, Mock } from 'vitest';

vi.mock('axios');

describe('http', () => {
  it('should make a GET request without token', async () => {
    const mockResponse: AxiosResponse = {
      data: { success: true },
      status: 200,
      statusText: 'OK',
      headers: {},
      //@ts-ignore
      config: {},
    };
    
    (axios.request as Mock).mockResolvedValue(mockResponse);

    const result = await http({
      method: HTTP_METHODS.GET,
      url: 'https://example.com/api',
    });

    expect(result).toEqual(mockResponse);
    expect(axios.request).toHaveBeenCalledWith({
      method: HTTP_METHODS.GET,
      url: 'https://example.com/api',
      headers: undefined,
    });
  });

  it('should make a POST request with token', async () => {
    const mockResponse: AxiosResponse = {
      data: { success: true },
      status: 200,
      statusText: 'OK',
      headers: {},
      //@ts-ignore
      config: {},
    };
    
    (axios.request as Mock).mockResolvedValue(mockResponse);

    const token = 'mocked-token';
    const requestData = { username: 'user', password: 'password' };

    const result = await http({
      method: HTTP_METHODS.POST,
      url: 'https://example.com/api',
      data: requestData,
      token,
    });

    expect(result).toEqual(mockResponse);
    expect(axios.request).toHaveBeenCalledWith({
      method: HTTP_METHODS.POST,
      url: 'https://example.com/api',
      data: JSON.stringify(requestData),
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    });
  });

  it('should call axios with correct headers when token is provided', async () => {
    const mockResponse: AxiosResponse = {
      data: { success: true },
      status: 200,
      statusText: 'OK',
      headers: {},
      //@ts-ignore
      config: {},
    };

    const token = 'mock-token';
    const requestData = { username: 'user', password: 'password' };

    (axios.request as Mock).mockResolvedValue(mockResponse);

    await http({
      method: HTTP_METHODS.POST,
      url: 'https://example.com/api',
      data: requestData,
      token,
    });

    expect(axios.request).toHaveBeenCalledWith({
      method: HTTP_METHODS.POST,
      url: 'https://example.com/api',
      data: JSON.stringify(requestData),
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  });

  it('should call axios without token when no token is provided', async () => {
    const mockResponse: AxiosResponse = {
      data: { success: true },
      status: 200,
      statusText: 'OK',
      headers: {},
      //@ts-ignore
      config: {},
    };

    const requestData = { username: 'user', password: 'password' };

    (axios.request as Mock).mockResolvedValue(mockResponse);

    await http({
      method: HTTP_METHODS.POST,
      url: 'https://example.com/api',
      data: requestData,
    });

    expect(axios.request).toHaveBeenCalledWith({
      method: HTTP_METHODS.POST,
      url: 'https://example.com/api',
      data: requestData,
      headers: undefined,
    });
  });

  it('should log token when token is provided', async () => {
    const mockResponse: AxiosResponse = {
      data: { success: true },
      status: 200,
      statusText: 'OK',
      headers: {},
      //@ts-ignore
      config: {},
    };
    
    const token = 'mocked-token';
    const requestData = { username: 'user', password: 'password' };
    
    (axios.request as Mock).mockResolvedValue(mockResponse);
    
    const consoleSpy = vi.spyOn(console, 'log');

    await http({
      method: HTTP_METHODS.POST,
      url: 'https://example.com/api',
      data: requestData,
      token,
    });

    expect(consoleSpy).toHaveBeenCalledWith('token', token);
    consoleSpy.mockRestore();
  });

  it('should handle errors correctly', async () => {
    const mockError = new Error('Network error');
    
    (axios.request as Mock).mockRejectedValue(mockError);

    try {
      await http({
        method: HTTP_METHODS.GET,
        url: 'https://example.com/api',
      });
    } catch (error) {
      expect(error).toEqual(mockError);
    }
  });
});
