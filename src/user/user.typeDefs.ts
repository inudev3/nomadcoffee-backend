import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    createdAt: String!
    updatedAt: String!
    username: String!
    email: String!
    password: String!
    name: String
    location: String
    avatarURL: String
    githubUsername: String
    following: [User]
    followers: [User]
  }
`;
