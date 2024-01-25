 
import { SubcriptionResolver, SubcriptionType } from "#Types/resolvers"
import { withFilter } from "graphql-subscriptions";



export const send:SubcriptionResolver<chatSendType, chatRecieveType> = (pubsub, KEY) => async (_, input) => {
    const {message: content,to:room, subject} = input
    pubsub.publish(KEY, {recieve: {content, room, subject}})
    return { content, room, subject }; 
}

export const recieve:SubcriptionType = (pubsub, MESSAGE) => withFilter(
    () => pubsub.asyncIterator(MESSAGE),
    (payload, variables) => payload.recieve.room === variables.room ,
  )