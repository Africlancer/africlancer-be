import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { AutoMap } from '@automapper/classes';


@ObjectType()
export class Messages {
    @AutoMap()
    @Field()
    _id:string;

    @AutoMap()
    @Field()
    messages:string;
}

@InputType()
export class CreateMessagesInput {
    @AutoMap()
    @Field({nullable:false})
    messages: string;
    
}

@InputType()
class MessagesInput{
    @AutoMap()
    @Field({nullable:false})
    messages:string;

}

@InputType()
export class QueryMessagesInput extends MessagesInput {}