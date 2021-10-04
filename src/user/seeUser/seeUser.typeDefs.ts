import { gql } from "apollo-server";

export default gql`
  type User {
    following(username: String!, lastId: Int): [User]
    followers(username: String!, lastId: Int): [User]
  }
`;
