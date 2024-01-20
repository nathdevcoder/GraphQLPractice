type TableSchemaType = {
    recipe_name: string
    ingredients: string
    instructions: string
    prep_time: number
    cook_time: number
    total_time: number
    calories: number
    cuisine: 'Italian' | 'Indian' | 'Chinese' | 'Mexican'
    difficulty_level: 'Easy'  | 'Medium' | 'Hard'
    is_vegetarian: boolean
}

type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}` ? `${T}${Capitalize<SnakeToCamelCase<U>>}` : S

type TableDataType =  {[K in keyof (TableSchemaType&{id:string}) as SnakeToCamelCase<K>]: (TableSchemaType&{id:string})[K]}

type Order = 'asc' | 'desc';
type Operators = 'contains' | 'equals'; 

type TableStateType = {
    page: number;
    rowsPerPage: number;
    sort?:  {
        field: string
        order: Order
    };
    filter?: {
        field: keyof TableSchemaType
        operations: Operators
        query: string
    }[]
}
type TableOptionType = {
    sortable: string[]
    filterable: string[]
    selectable:  string[]
    densable: boolean
    count: number 
}

type TableResponseType = {
    data: TableDataType[]
    state: TableStateType
    options: TableOptionType
}

type TableQueryInputType = Omit<TableResponseType, 'data'>