import { ObjectId } from 'mongodb';
import { LoginUser, UpdateUserInput, UserInput } from '../generated/graphql';
import { ApolloError } from 'apollo-server-core';
import { generateToken } from '../utils/auth';
import database from '../utils/database';
import bcrypt from 'bcrypt';

export class Users {
  async loginUser(body: LoginUser) {
    const db = await database();
    const verifyEmail = await db
      .collection('Users')
      .findOne({ email: body.email });

    if (!verifyEmail) {
      throw new ApolloError('Email! or password invalid');
    }

    if (!bcrypt.compareSync(body.password, verifyEmail.password)) {
      throw new ApolloError('Email or password! invalid');
    }

    const token = await generateToken(
      String(verifyEmail._id),
      verifyEmail.email
    );

    return token;
  }

  async findAllUsers() {
    const db = await database();
    const response = await db.collection('Users').find({}).toArray();

    return response;
  }

  async findOneUser(_id: string) {
    const db = await database();
    const response = await db
      .collection('Users')
      .findOne({ _id: new ObjectId(_id) });

    return response;
  }

  async createUser(body: UserInput) {
    const db = await database();
    body.password = bcrypt.hashSync(body.password, 12);
    const verifyEmail = await db
      .collection('Users')
      .findOne({ email: body.email });

    if (verifyEmail) {
      throw new Error('Email already registered');
    }

    await db.collection('Users').insertOne(body);

    return 'User was created successfully';
  }

  async updateUser(_id: string, body: UpdateUserInput) {
    const db = await database();
    await db.collection('Users').updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          name: body.name,
          lastname: body.lastname,
          email: body.email,
        },
      }
    );

    return 'User was updated successfully';
  }

  async deleteUser(_id: string) {
    const db = await database();
    await db.collection('Users').deleteOne({ _id: new ObjectId(_id) });

    return 'User was removed successfully';
  }
}
