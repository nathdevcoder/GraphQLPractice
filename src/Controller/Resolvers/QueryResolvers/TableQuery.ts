import { GetTableData } from "#Models/TableModel"
import { TableResolverType } from "#Types/resolvers"
import { TableResponse } from "#Utils/DBHelper"


export const gettabledata:TableResolverType<'get'> = async (_, {input}) => { 
    const result = await GetTableData(input)
    const data = TableResponse(result)
    return {
        data,
        options: {
            sortable: ['recipeName', 'isVegetarian', 'difficultyLevel'],
            filterable: ['recipeName'],
            selectable:  ['recipeName'],
            densable: true,
            count: data.length 
        },
        state: input
    } 
}