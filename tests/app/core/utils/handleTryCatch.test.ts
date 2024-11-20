import { handleTryCatch } from '../../../../src/app/core/utils/handleTryCatch';
import { AxiosError } from 'axios';

describe('handleTryCatch', () => {

  it('should return the result when the promise is resolved', async () => {
    const mockPromise = async () => 42;
    const result = await handleTryCatch(mockPromise);

    expect(result).toEqual([42, undefined]);
  });

  it('should return an error when the promise throws a generic error', async () => {
    const mockError = new Error('Generic error message');
    const mockPromise = async () => { throw mockError };
    const result = await handleTryCatch(mockPromise);

    expect(result[0]).toBeUndefined();
    expect(result[1]).toBe(mockError);
  });

  it('should handle a function returning a value directly', async () => {
    const mockFunction = () => 50;
    const result = await handleTryCatch(mockFunction);

    expect(result).toEqual([50, undefined]);
  });

});
