import { MutationCreateAvoArgs, QueryAvoArgs } from '../../generated/graphql';
import { ApolloError } from 'apollo-server-core';
import { Avo } from '../../services/avocado.service';

const service = new Avo();

export const avocadoResolvers = {
  Query: {
    avos: async (parent: unknown, args: { skip?: number; limit?: number }) => {
      try {
        const response = await service.findAllAvos(args.skip, args.limit);
        return response;
      } catch (error) {
        throw new ApolloError(String(error));
      }
    },

    avo: async (parent: unknown, { _id }: QueryAvoArgs) => {
      try {
        const response = await service.findOneAvo({ _id });
        return response;
      } catch (error) {
        throw new ApolloError(String(error));
      }
    },
  },

  Mutation: {
    createAvo: async (parent: unknown, { data }: MutationCreateAvoArgs) => {
      try {
        const response = await service.createAvo(data);
        return response;
      } catch (error) {
        throw new ApolloError(String(error));
      }
    },
  },
};
