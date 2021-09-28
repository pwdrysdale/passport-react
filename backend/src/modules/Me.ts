import { User } from "../entities/Use";
import { Ctx, Query, Resolver } from "type-graphql";

@Resolver()
export class Me {
    @Query(() => User, { nullable: true })
    async me(@Ctx() { req, res, user }: any): Promise<User | null> {
        console.log("In me trying to get user");
        console.log(req.user);

        try {
            if (req.user) {
                return req.user;
            } else {
                return null;
            }
        } catch {
            return null;
        }
    }
}
