 
type accessibilityType = 'locked' | 'public' | 'private' | 'hidden' | 'deleted'

type DirType = {
    id: string
    uploadedBy: string
    deletedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
    rootFolder: FolderType
    name: string 
    accessibility: accessibilityType
    index: number
}

type FileType = DirType & { 
    fileName: string 
    fileSize: number
    fileType: string
    filePath: string
    disk: string 
    url: string 
    bucket: string
    thumbnailUrl: string  
}  
type FolderType = DirType & { 
    files: FileType[]
    folders: FolderType[] 
    openedFolder: FolderType 
}
type Attachment = { 
    fileType: string
    url: string
    compressedUrl: string
    filename: string  
}

 

 




