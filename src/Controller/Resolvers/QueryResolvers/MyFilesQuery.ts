import ResolverType from "#Types/resolvers"



export const GetMyFiles:ResolverType<{id:string}, (FolderType | FileType)[]> = async (_,{id}) => {
    return [
        {
            id,
            uploadedBy: 'string',
            deletedBy: 'string', 
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: new Date(),
            rootFolder: 'root',
            name: 'string', 
            accessibility: 'public',
            index: 1,
            files: [],
            folders: [], 
            openedFolder: null, 
        },
        {
            id,
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
     ]
  }
   