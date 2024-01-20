import { TableResponse } from "#Utils/DBHelper";
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
 

export async function GetTableData(state: TableStateType) { 
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
    if(!data) return []
    return data
  } 

  export async function AddTableData(input: Omit<TableDataType, 'id'>) {  
    const newTableData = new Table<TableSchemaType >({
        difficulty_level: input.difficultyLevel,
        calories: input.calories,
        cook_time: input.cookTime,
        cuisine: input.cuisine,
        ingredients: input.ingredients,
        instructions: input.ingredients,
        is_vegetarian: input.isVegetarian,
        prep_time: input.prepTime,
        total_time: input.totalTime,
        recipe_name: input.recipeName
      });
      const data = await newTableData.save();
      return data;
  } 