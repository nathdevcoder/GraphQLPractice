 
import { SubcriptionResolver, SubcriptionType } from "#Types/resolvers" 



export const notify:SubcriptionResolver<{input: notificationType}, notificationType> = (pubsub, KEY) => async (_, {input}) => {
    const {message, title, image, link} = input
    pubsub.publish(KEY, {notification: {message, title, image, link}})
    return {message, title, image, link}; 
}

export const notification:SubcriptionType = (pubsub, NOTIFY) => () => pubsub.asyncIterator(NOTIFY)
  