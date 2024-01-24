

 

export const ChatTypes = `
    type Message {
        content: String
    }
`

export const ChatMutation = `
    send(message: String): Message!
`

export const ChatSubscription = `
    recieve: Message!
`