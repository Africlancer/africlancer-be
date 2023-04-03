import { Resolver } from '@nestjs/graphql';
import { PUB_SUB } from 'src/pubsub/pubsub.module';
import { Person } from 'src/graphql';



@Resolver()
export class PersonResolver {
    AllSubscribers: Person[] = []
    constructor(inject(PUB_SUB))
}