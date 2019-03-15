import {User} from '../../entity/smsauto/User';
import {
    Resolver,
    Query,
    Arg,
    FieldResolver,
    Root,
    Mutation,
} from 'type-graphql';
import {HistoSMS} from '../../entity/smsauto/HistoSMS';
import {getConnection} from 'typeorm';
//import * as bcrypt from 'bcryptjs';

@Resolver(of => User)
export class UserAppsResolver {
    private userCollection : User[] = [];
    private user : User | undefined;

    @Query(returns => [User], {nullable: true})
    async listAllUsers() {
        const userRepository = getConnection("smsauto").getRepository(User);
        this.userCollection = await userRepository.find();
        return this.userCollection;
    }

    @Query(returns => User, {nullable: true})
    async getUser(@Arg("username", type => String, {nullable: true})username?: string) {
        const userRepository = getConnection("smsauto").getRepository(User);
        if (!username) {
            return null;
        } else {
            this.user = await userRepository.findOne({username});
            return this.user
                ? this.user
                : null;
        }

    }
    

    @Mutation(returns => User)
    async addUser(@Arg("username", type => String)username : string, @Arg("password", type => String)password : string, @Arg("direction", type => String, {nullable: true})direction
        ?
        : string) {
        const userRepository = getConnection("smsauto").getRepository(User);
        const foundInDB = await userRepository.findOne({where: {
                username
            }});

        if (foundInDB) 
            return null;
        await userRepository.save({username, password, textPassword: password, direction});
        this.user = await userRepository.findOne({where: {
                username
            }});

        return this.user;
    }
    @Mutation(returns => User)
    async updateUser(@Arg("userId", type => String)userId : string, @Arg("username", type => String, {nullable: true})username
        ?
        : string, @Arg("password", type => String, {nullable: true})password
        ?
        : string, @Arg("direction", type => String, {nullable: true})direction?: string) {
        const userRepository = getConnection("smsauto").getRepository(User);
        const foundInDB = await userRepository.findOne({
            where: {
                id: userId
            }
        });

        if (foundInDB) {
            await userRepository.update(userId, {
                username: username
                    ? username
                    : foundInDB.username,
                password: password
                    ? password
                    : foundInDB.password,
                textPassword: password
                    ? password
                    : foundInDB.textPassword
            });
            this.user = await userRepository.findOne({where: {
                    username
                }});

            return this.user;
        } else 
            return null;

        }
        @Mutation(returns => User, {nullable: true})
        async loginUser(@Arg("username", type => String)username: string,@Arg("password", type => String)password: string) {

            const userRepository = getConnection("smsauto").getRepository(User);
            
                this.user = await userRepository.findOne({where: {
                    username
                }});
                if(!this.user){
                    return null;
                }else{
                    console.dir(this.user);
                    //const isValidPassword = await bcrypt.compare(password, this.user.password);
                    const isValidTextPassword= password === this.user.password? true:false
                    if (!isValidTextPassword) {
                        return null;
                    }else{
                        return this.user;
                    }
                
                    
                }
                
            
    
        }
    @FieldResolver()
    async historique(@Root()user : User) {
        return await getConnection("smsauto")
            .getRepository(HistoSMS)
            .find({
                where: {
                    from: user.id
                },
                cache: 1000
            })
    }
}
