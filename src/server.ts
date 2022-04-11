import {DocumentNode} from 'graphql';
import startApolloServer from './app';
import testTypeDefs from './test/typeDefs';
import testResolvers from './test/resolvers';
const typeDefs:DocumentNode[] = [testTypeDefs];
const resolvers = {
  Query: {
    ...testResolvers.Query,
  },
};

startApolloServer({typeDefs, resolvers});
