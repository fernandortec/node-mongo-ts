import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import User from '../models/User';

export default {
  async index(request: Request, response: Response) {
    const user = await User.find();

    return response.json(user);
  },

  async show(request: Request, response: Response) {
    const { email } = request.params;
    const user = await User.findOne({ email });

    return response.json(user);
  },

  async create(request: Request, response: Response) {
    const { name, email, password, products } = request.body;

    if (await User.findOne({ email })) {
      return response.status(400).json({ error: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      products,
    });

    return response.json(user);
  },

  async update(request: Request, response: Response) {
    const { name, email, password, products } = request.body;

    const user = await User.findOne({ email });

    if (!user) {
      return response.status(400).json({ error: 'Could not find a user with the provided email' });
    }

    user.update({
      name,
      email,
      password,
      products,
    });

    return response.json({ message: 'User updated sucessfully' });
  },

  async delete(request: Request, response: Response) {
    const { email } = request.params;

    const userEmail = await User.findOne({ email });

    if (!userEmail) {
      return response.status(400).json({ error: 'Could not find a user with the provided email' });
    }

    await User.findOneAndDelete({ email });

    return response.json({ message: 'User deleted sucessfully' });
  },

  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    const user = await User.findOne({ email }).select('password');

    if (!user) {
      return response.status(400).json({ error: 'User not found' });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return response.status(400).json({ error: 'Invalid password' });
    }

    return response.json({ message: 'Logged in sucessfully' });
  },
};
