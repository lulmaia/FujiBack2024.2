import mongoose from 'mongoose';
import main from '../database/conn';

jest.mock('mongoose', () => ({
  set: jest.fn(),
  connect: jest.fn(),
}));

describe('Database Connection', () => {
  let consoleLog: jest.SpyInstance;

  beforeEach(() => {
    consoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.resetAllMocks();
    consoleLog.mockRestore();
  });

  test('should connect to the database successfully', async () => {

    (mongoose.connect as jest.Mock).mockResolvedValueOnce(undefined);

      await main();

    expect(mongoose.connect).toHaveBeenCalledWith("mongodb+srv://adm:nostradamus@clusterone.65tt0uq.mongodb.net/");
    expect(consoleLog).toHaveBeenCalledWith("Connected");
  });

  test('should handle connection error', async () => {

    const errorMessage = 'Connection failed';
    (mongoose.connect as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await main();

    expect(mongoose.connect).toHaveBeenCalledWith("mongodb+srv://adm:nostradamus@clusterone.65tt0uq.mongodb.net/");
    expect(consoleLog).toHaveBeenCalledWith(`erro: Error: ${errorMessage}`);
  });
});
