import {Resolvers} from "../../types";
import bcrypt from "bcrypt";
const resolvers:Resolvers={
    Mutation:{
        createAccount: async(_,args ,{client})=>{
            const existingUser = await client.user.findFirst({where:{
                OR:[{username:args.username}, {email:args.email}]
                }});
            if(existingUser){
                return{
                    ok:false,
                    error:"the user already exists"
                }
            }
            const uglyPassword = await bcrypt.hash(args.password, 10);
            await client.user.create({
                data:{
                   ...args,
                    password:uglyPassword,
                }
            });
            return{
                ok:true,
            }
        }
    }
}
export default resolvers;