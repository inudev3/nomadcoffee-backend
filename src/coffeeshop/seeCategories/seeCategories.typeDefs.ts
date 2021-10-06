import { gql } from "apollo-server";

export default gql`
  type Query {
    seeCategories(shopId: Int!, lastId: Int): [Category]
  }
`;
