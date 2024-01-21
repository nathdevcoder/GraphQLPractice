import mongoose from "mongoose";


type ID = mongoose.Schema.Types.ObjectId
type FileSchemaType = Omit<FileType, 'id' | 'uploadedBy' | 'deletedBy' | 'rootFolder'> & {
    uploadedBy: ID
    deletedBy: ID
    rootFolder: ID
}
type FolderSchemaType = Omit<DirType, 'id' | 'uploadedBy' | 'deletedBy' | 'rootFolder'> & {
    uploadedBy: ID
    deletedBy: ID
    files: ID[]
    folders: ID[]
    rootFolder: ID
    openedFolder: ID
}

const Schema = mongoose.Schema;

const fileSchema = new Schema<FileSchemaType>({
    index: { type: Number, required: true },
    fileName: { type: String, required: true },
    filePath: { type: String, required: true },
    fileSize: { type: Number, required: true },
    fileType: { type: String, required: true },
    disk: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    deletedBy: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'User' },
    deletedAt: { type: Date, required: false },
    createdAt: { type: Date, required: false },
    updatedAt: { type: Date, required: false },
    url: { type: String, required: true },
    bucket: { type: String, required: false },
    thumbnailUrl: { type: String, required: false },
    name: { type: String, required: true },
    accessibility: {
        type: String,
        enum: ['locked', 'public', 'private', 'hidden', 'deleted'],
        default: 'public',
    },
    rootFolder: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Folder' }
});

const folderSchema = new Schema<FolderSchemaType>({
    index: { type: Number, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    deletedBy: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'User' },
    deletedAt: { type: Date, required: false },
    createdAt: { type: Date, required: false },
    updatedAt: { type: Date, required: false },
    name: { type: String, required: true },
    accessibility: {
        type: String,
        enum: ['locked', 'public', 'private', 'hidden', 'deleted'],
        default: 'public',
    },
    files: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'File' }],
    folders: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Folder' }],
    openedFolder: { type: mongoose.Schema.Types.ObjectId, required: false, default: null, ref: 'Folder' },
    rootFolder: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Folder' }
})

const Files = mongoose.model<FileSchemaType>("File", fileSchema);
const Folders = mongoose.model<FolderSchemaType>("Folder", folderSchema);


