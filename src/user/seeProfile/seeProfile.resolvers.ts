import {Resolvers} from "../../types";
import client from "../../client";
const resolvers:Resolvers={
    Query:{
        seeProfile:(_,{id})=> client.user.findUnique({where:{id}}),

    }
}