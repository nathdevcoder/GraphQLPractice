type chatRecieveType = {
    content: string
    room: string
    subject?: string
}

type chatSendType = {
    message: string
    to: string
    subject?:string
}

type notificationType = {
    message: string
    title: string
    image?: string
    link?: string
}