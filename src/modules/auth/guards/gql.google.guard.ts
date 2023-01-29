import { ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";


@Injectable()
export class GqlGoogleGuard extends AuthGuard("google"){
    constructor(){
        super()
    }

    async getRequest(context:ExecutionContext){
        const graphqlContext = GqlExecutionContext.create(context);
        const request = graphqlContext.getContext().req;
        return request;
    }

}