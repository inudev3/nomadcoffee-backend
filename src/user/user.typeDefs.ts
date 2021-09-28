import {gql} from "apollo-server";

export default gql`
    type User {
        id:Int!
        createdAt: String!
        updatedAt: String!
        username: String!
        email: String!
        password: String!
    }
`;