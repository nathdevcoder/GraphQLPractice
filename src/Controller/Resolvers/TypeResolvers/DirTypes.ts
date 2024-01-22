import ResolverType from "#Types/resolvers";


export const DirResolve:ResolverType<undefined, 'Folder' | 'File'> = async (parent) => { 
    function propertyChecker<T>(object: unknown, name: string): object is T {
        return object instanceof Object && object.hasOwnProperty(name)
    }
    if(propertyChecker<FileType>(parent, 'url')) {  
        return 'File'
    } else return 'Folder'
}