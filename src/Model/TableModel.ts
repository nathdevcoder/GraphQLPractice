import mongoose, { Types } from "mongoose";  

const Schema = mongoose.Schema;

const tableSchema = new Schema<TableSchemaType>({
  recipe_name: {
    type: String,
    required: true
  }, 
  ingredients: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  prep_time: {
    type: Number,
    required: true
  },
  cook_time:  {
    type: Number,
    required: true
  },
  total_time: {
    type: Number,
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  cuisine: {
    type: String,
    enum: ['Italian', 'Mexican', 'Chinese', 'Indian'],
    default: 'Italian',
  },
  difficulty_level:{
    type: String,
    enum: ['Medium', 'Hard', 'Easy'], 
    require: false
  },
  is_vegetarian: {
    type: Boolean,
    required: true
  }
} );

const Table = mongoose.model<TableSchemaType>("Table", tableSchema);
 

export async function GetTableData(input: TableQueryInputType): Promise<TableResponseType<Types.ObjectId>> {
    const {state, options} = input
    const {page, rowsPerPage, filter, sort} = state
    let query: any = {}
    let sortQuery: undefined | {[k:string]: Order} = undefined 
    if(filter) {
        filter.forEach(ft=>{ 
            if(ft.operations === 'equals') query[ft.field] =  ft.query
            if(ft.operations === 'contains') query[ft.field] =  {$regex: ft.query}
        })
    }
    if(sort) {
        sortQuery = {}
        sortQuery[sort.field] = sort.order
    }
    const data = await Table.find(query).sort(sortQuery).skip(page*rowsPerPage).limit(rowsPerPage).exec()
    return { data, state, options }
  } 