import {ApolloServer} from 'apollo-server-koa';
import {
  ApolloServerPluginDrainHttpServer as apolloServerPluginDrainHttpServer,
  Config} from 'apollo-server-core';
import Koa from 'koa';
import http from 'http';

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
  server.applyMiddleware({app});
  httpServer.on('request', app.callback());
  await new Promise<void>(
      (resolve) => httpServer.listen({port: 4000}, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return {server, app};
}

export default startApolloServer;
