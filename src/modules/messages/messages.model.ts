import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { AutoMap } from '@automapper/classes';


@ObjectType()
export class Messages {
    @AutoMap()
    @Field()
    _id:string;

    @AutoMap()
    @Field()
    message:string;
}

@InputType()
export class CreateMessagesInput {
    @AutoMap()
    @Field({nullable:false})
    message: string;
    
}

@InputType()
class MessagesInput{
    @AutoMap()
    @Field({nullable:false})
    message:string;

}

@InputType()
export class QueryMessagesInput extends MessagesInput {}
