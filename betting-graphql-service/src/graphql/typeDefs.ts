import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Betting {
    id: ID
    userId: String
    characterName: String
    realm: String
    region: String
    amount: Int
  }

  type Query {
    bettings: [Betting]
  }

  type Mutation {
    createBetting(userId: String, characterName: String, realm: String, region: String, amount: Int): Betting
  }
`;
