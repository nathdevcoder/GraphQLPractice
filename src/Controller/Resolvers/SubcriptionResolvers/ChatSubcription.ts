 
import { SubcriptionResolver } from "#Types/resolvers"



export const send:SubcriptionResolver<{message: string}, {content: string}> = (pubsub, KEY) => async (_, {message}) => {
    pubsub.publish(KEY, {recieve: {content: message}})
    return {
        content: message
    }; 
}