

 

export const NotifyTypes = `
    type Notification {
        message: String!
        title: String!
        image: Url
        link: Url
    }
`

export const NotifyInputs = `
    input notifyInput {
        message: String!
        title: String!
        image: Url
        link: Url
    }
`

export const NotifyMutation = `
    notify(input: notifyInput!): Notification!
`

export const NotifySubscription = `
    notification: Notification!
`