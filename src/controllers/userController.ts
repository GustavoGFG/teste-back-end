// controllers/userController.ts
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { userService } from '../services/userService';
import { userSchema, updateUserSchema } from '../validators/userValidation';
import { z } from 'zod';
import { IUser } from '../models/User';
import bcrypt from 'bcrypt';
import { config } from '../config/env';

const userController = {
  signUp: async (req: Request, res: Response) => {
    try {
      const parsedData = userSchema.parse(req.body) as Omit<IUser, '_id'>;
      const existingUser = await userService.findUserByEmail(parsedData.email);
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: 'Email já existe' });
      }
      const user = await userService.createUser(parsedData);
      const token = jwt.sign({ id: user._id }, config.jwtSecret!, {
        expiresIn: '1h',
      });
      res.status(201).json({
        success: true,
        message: 'Usuário criado com sucesso',
        token,
        user,
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: error.errors[0].message,
          errors: error.errors,
        });
      }
      res.status(500).json({
        success: false,
        message: 'Erro ao criar o usuário',
        error: error.message,
      });
    }
  },

  signIn: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await userService.findUserByEmail(email);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res
          .status(401)
          .json({ success: false, message: 'Dados inválidos' });
      }

      const token = jwt.sign({ id: user._id }, config.jwtSecret!, {
        expiresIn: '1h',
      });
      res.json({ token, user });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Erro ao fazer o login',
        error: error.message,
      });
    }
  },

  updateUser: async (req: Request, res: Response) => {
    const userId = (req as Request & { user?: { id: string } }).user?.id; // Get user ID from the authenticated request
    const updates = req.body;

    try {
      if (userId) {
        const parsedUpdates = updateUserSchema.parse(updates);
        const updatedUser = await userService.updateUser(userId, parsedUpdates);
        res.json({
          success: true,
          message: 'Use atualizado com sucesso',
          user: updatedUser,
        });
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: error.errors[0].message,
          errors: error.errors,
        });
      }
      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar o usuário',
        error: error.message,
      });
    }
  },
};

export default userController;
