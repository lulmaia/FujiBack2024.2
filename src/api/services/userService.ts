import { User, IUser } from '../models/userModel';

export const createUser = async (email: string, password: string, cep: string): Promise<IUser> => {
  try {
    const newUser = new User({ email, password, cep });
    return await newUser.save();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Error creating user: ' + error.message);
    } else {
      throw new Error('Unknown error occurred while creating user');
    }
  }
};

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Error retrieving user by email: ' + error.message);
    } else {
      throw new Error('Unknown error occurred while retrieving user by email');
    }
  }
};
