import { Document, Types } from "mongoose";
 

export type DBType<T> = Document<unknown, {}, T> & T & {
  _id: Types.ObjectId;
}

export function UserResponse(data:DBType<UserSchemaType>, token:Pick<UserType, 'accessToken' | 'refreshToken'>){
    return {
        name: data.name,
        email: data.email,  
        avatar: data.avatar, 
        description: data.description,
        dateCreated: data.dateCreated,
        role: data.role,
        id: data._id.toString(),
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        roles: data.roles
      }
}

export function TableResponse(datas:DBType<TableSchemaType>[] ): TableDataType[]{
  return datas.map(data=>({
    id: data._id.toString(),
    difficultyLevel: data.difficulty_level,
    calories: data.calories,
    cookTime: data.cook_time,
    cuisine: data.cuisine,
    ingredients: data.ingredients,
    instructions: data.ingredients,
    isVegetarian: data.is_vegetarian,
    prepTime: data.prep_time,
    totalTime: data.total_time,
    recipeName: data.recipe_name
  }))
}