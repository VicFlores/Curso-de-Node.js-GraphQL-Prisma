import { ApolloError } from 'apollo-server-core';
import { verifyAuth } from '../../utils/auth';
import { Users } from '../../services/users.service';
import {
  MutationAddUserArgs,
  MutationDeleteUserArgs,
  MutationUpdateUserArgs,
  QueryFindOneUserArgs,
  QueryLoginUserArgs,
} from '../../generated/graphql';
import { TContext } from '../../interfaces/TContext';

const service = new Users();

export const usersResolvers = {
  Query: {
    findAllUsers: async (
      parents: unknown,
      args: unknown,
      context: TContext
    ) => {
      await verifyAuth(context.token);

      try {
        const response = await service.findAllUsers();
        return response;
      } catch (error) {
        throw new ApolloError(String(error));
      }
    },

    findOneUser: async (parent: unknown, { _id }: QueryFindOneUserArgs) => {
      try {
        const response = await service.findOneUser(_id);
        return response;
      } catch (error) {
        throw new ApolloError(String(error));
      }
    },

    LoginUser: async (parent: unknown, { input }: QueryLoginUserArgs) => {
      try {
        const response = await service.loginUser(input);
        return { token: response };
      } catch (error) {
        throw new ApolloError(String(error));
      }
    },
  },

  Mutation: {
    addUser: async (parent: unknown, { input }: MutationAddUserArgs) => {
      try {
        const response = await service.createUser(input);
        return response;
      } catch (error) {
        throw new ApolloError(String(error));
      }
    },

    updateUser: async (
      parent: unknown,
      { _id, input }: MutationUpdateUserArgs
    ) => {
      try {
        const response = await service.updateUser(_id, input);
        return response;
      } catch (error) {
        throw new ApolloError(String(error));
      }
    },

    deleteUser: async (parent: unknown, { _id }: MutationDeleteUserArgs) => {
      try {
        const response = await service.deleteUser(_id);
        return response;
      } catch (error) {
        throw new ApolloError(String(error));
      }
    },
  },
};
