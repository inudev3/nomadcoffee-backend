import {Resolvers} from "../../types";
import client from "../../client";

const resolvers:Resolvers = {
    Mutation: {
        editProfile: async (_, {id, email, username, password}) => {
            const user = await client.user.findUnique({where: {id}, select: {id: true}});
            if (!user) {
                return {
                    ok: false,
                    error: "user does not exists."
                }
            }
            await client.user.update({where: {id}, data: {email, username, password}});
            return {
                ok: true
            }
        }
    }
}
export default resolvers;