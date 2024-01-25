

 

export const ChatTypes = `
    type Message {
        content: String!
        subject: String
        room: String!
    }
`

export const ChatMutation = `
    send(message: String!, to: String!, subject: String): Message!
`

export const ChatSubscription = `
    recieve(room: String!): Message!
`