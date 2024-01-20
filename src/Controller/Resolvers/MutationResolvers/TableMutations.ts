import { AddTableData } from "#Models/TableModel";
import { TableResolverType } from "#Types/resolvers";
import { SingleTableResponse } from "#Utils/DBHelper";



export const addtabledata:TableResolverType<'add'> = async (_, {input}) => {
    const data = await AddTableData(input) 
    return  SingleTableResponse(data) 
} 