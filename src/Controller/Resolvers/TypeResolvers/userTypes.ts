import ResolverType from "#Types/resolvers";


export const image:ResolverType<{size: Size}, string> = async (parent, {size}) => { 
    function propertyChecker<T>(object: unknown, name: string): object is T {
        return object instanceof Object && object.hasOwnProperty(name)
    }
    if(propertyChecker<{avatar: string}>(parent, 'avatar')) { 
        if(size) return `${parent.avatar}?size=${size}`
        return parent.avatar
    }
    return ''
}