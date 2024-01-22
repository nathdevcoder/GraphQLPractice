

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
        deletedBy: String
        createdAt: Date
        updatedAt: Date
        deletedAt: Date
        rootFolder: String
        name: String 
        accessibility: accessibitity!
        index: Float!
    }
    type Folder implements Dir {
        id: String!
        uploadedBy: String!
        deletedBy: String
        createdAt: Date
        updatedAt: Date
        deletedAt: Date
        rootFolder: String
        name: String 
        accessibility: accessibitity!
        index: Float!
        files: [File]
        folders: [Folder] 
        openedFolder: Folder
    }
    type File implements Dir {
        id: String!
        uploadedBy: String!
        deletedBy: String
        createdAt: Date
        updatedAt: Date
        deletedAt: Date
        rootFolder: String
        name: String 
        accessibility: accessibitity!
        index: Float!
        fileName: String!
        fileSize: Float
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
        index: Float
        rootFolder: String!
    }
    input FileInput {
        file: String!
        index: Float 
    } 
`

export const DirQueries = `
    getmyfiles(id: String): [Dir]!
`

export const DirMutations = `
    addfolder(input: FolderInput): Folder
    addfile(input: FileInput): File
`