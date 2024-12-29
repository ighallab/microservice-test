import {JwtService} from "../../services/authService/jwt.service";
import {inject, injectable} from "inversify";

@injectable()
class AuthController{

    constructor(@inject(JwtService) private jwtService: JwtService){}

    public login(username:string, password:string):string | null{

        if(username == 'admin@mail.com'){
            let payload: {} = {
                username:username,
                data:{
                    age:27,
                    gender:'male'
                }
            };
            console.log('Received Password:   ',password);

            return this.jwtService.createToken(payload);
        }

        return  null;
    }

    public register(){

    }
}

export {AuthController};