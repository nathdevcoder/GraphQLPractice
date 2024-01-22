

export const DirEnums = `
    enum accessibitity {
        locked
        public
        private
        hidden
        deleted
    }
`

export const DirTypes = `
    interface Dir {
        id: String!
        uploadedBy: String!
        deletedBy: string
        createdAt: Date
        updatedAt: Date
        deletedAt: Date
        rootFolder: String
        name: String 
        accessibility: accessibitity!
        index: Int!
    }
    type Folder implements Dir {
        id: String!
        uploadedBy: String!
        deletedBy: string
        createdAt: Date
        updatedAt: Date
        deletedAt: Date
        rootFolder: String
        name: String 
        accessibility: accessibitity!
        index: Int!
        files: [File]
        folders: [Folder] 
        openedFolder: Folder
    }
    type File implements Dir {
        id: String!
        uploadedBy: String!
        deletedBy: string
        createdAt: Date
        updatedAt: Date
        deletedAt: Date
        rootFolder: String
        name: String 
        accessibility: accessibitity!
        index: Int!
        fileName: String!
        fileSize: Int
        fileType: String!
        filePath: String!
        disk: String
        url: Url!
        bucket: String
        thumbnailUrl: String  
    }
`

export const DirInputs = `
    input FolderInput {
        name: String!
        index: Int
        rootFolder: String!
    }
    input FileInput {
        file: Upload!
        index: Int 
    } 
`

export const DirQueries = `
    getmyfiles(id: String): [Dir]!
`

export const DirMutations = `
    addfolder(input: FolderInput): Folder
    addfile(input: FileInput): File
`