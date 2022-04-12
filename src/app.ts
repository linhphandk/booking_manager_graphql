import {ApolloServer} from 'apollo-server-koa';
import {
  ApolloServerPluginDrainHttpServer as apolloServerPluginDrainHttpServer,
  Config} from 'apollo-server-core';
import Koa from 'koa';
import http from 'http';
import cors from '@koa/cors';


/**
 *
 * @param {Config} param0
 * @return {{ApolloServer,Koa}}
 */
async function startApolloServer({typeDefs, resolvers}:Config) {
  const httpServer = http.createServer();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [apolloServerPluginDrainHttpServer({httpServer})],
  });

  await server.start();
  const app = new Koa();

  app.use(cors());
  server.applyMiddleware({app});
  httpServer.on('request', app.callback());
  await new Promise<void>(
      (resolve) => httpServer.listen({host: '0.0.0.0', port: 4000}, resolve));
  console.log(`🚀 Server ready at http://0.0.0.0:4000${server.graphqlPath}`);
  return {server, app};
}

export default startApolloServer;
