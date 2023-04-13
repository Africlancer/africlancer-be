import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { AutoMap } from '@automapper/classes';


@ObjectType()
export class Message {
    @AutoMap()
    @Field()
    message:strin
}

@InputType()
export class CreateMessageInput {
    @AutoMap()
    @Field({nullable:false})
    message: string;
    
}

@InputType()
class MessageInput{
    @AutoMap()
    @Field({nullable:false})
    message:string;

}

@InputType()
export class QueryMessageInput extends MessageInput {}