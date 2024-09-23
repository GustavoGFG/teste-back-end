// services/userService.js
import User, { IUser } from '../models/User';
import bcrypt from 'bcrypt';

export const userService = {
  createUser: async (userData: Omit<IUser, '_id'>): Promise<IUser> => {
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);

    const user = new User(userData);
    return await user.save();
  },

  findUserByEmail: async (email: string): Promise<IUser | null> => {
    return await User.findOne({ email });
  },

  updateUser: async (
    userId: string,
    updates: Partial<IUser>
  ): Promise<IUser | null> => {
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }
    return await User.findByIdAndUpdate(userId, updates, { new: true });
  },
};
