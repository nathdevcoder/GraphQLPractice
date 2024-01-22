import ResolverType from "#Types/resolvers"


type folderInput = {
    name: string
    index: number
    rootFolder: string
}
type fileInput = {
    file: any
    index: number
}

export const addFolder:ResolverType<{input: folderInput}, FolderType> = async (_, {input}) => {
    return  {
        id: 'id',
        uploadedBy: 'string',
        deletedBy: 'string', 
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
        rootFolder: input.rootFolder,
        name: input.name, 
        accessibility: 'public',
        index: input.index,
        files: [],
        folders: [], 
        openedFolder: null, 
    }
} 

export const addFile:ResolverType<{input: fileInput}, FileType> = async (_, {input}) => {
    console.log(input);
    
    return  {
        id: 'id',
        uploadedBy: 'string',
        deletedBy: 'string', 
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
        rootFolder: 'root',
        name: 'string', 
        accessibility: 'public',
        index: 1,
        fileName: 'string' ,
        fileSize: 12,
        fileType: 'image',
        filePath: 'images',
        disk: 's3' ,
        url: 'http://test.png' ,
        bucket: 'img',
        thumbnailUrl: 'http://test.png'   
    }
} 