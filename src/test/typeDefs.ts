import {gql} from 'apollo-server-core';

const typeDefs = gql`
  type Query{
      testQuery: String!
  }
`;

export default typeDefs;
