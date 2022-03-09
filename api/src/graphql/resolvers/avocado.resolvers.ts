import { ApolloError } from 'apollo-server-core';
import { Avocado } from '../../services/avocado.service';

const service = new Avocado();

export const avocadoResolvers = {
  Query: {
    avos: async () => {
      try {
        const response = await service.findAllAvos();
        return response;
      } catch (error) {
        throw new ApolloError(String(error));
      }
    },
  },
};
