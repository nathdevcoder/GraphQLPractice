

export const TableTypes = `
    type Table {
        recipeName: String
        ingredients: String
        instructions: String
        prepTime: Int
        cookTime: Int
        totalTime: Int
        calories: Int
        cuisine: Cuisine
        difficultyLevel: Level
        isVegetarian: Boolean
    } 

    type TableOptions {
        sortable: [String]
        filterable: [String]
        selectable:  [String]
        densable: Boolean
        count: Int 
    }
`

export const TableInputs = `
    input SortInput  {
        field: String
        order: Order
    }
    input FilterInput {
        field: String
        operations: Operators
        query: string
    }
    input TableStateInput {
        page: Int!;
        rowsPerPage: Int!;
        sort: SortInput;
        filter: [FilterInput]
    }
    input TableInput {
        recipeName: String
        ingredients: String
        instructions: String
        prepTime: Int
        cookTime: Int
        totalTime: Int
        calories: Int
        cuisine: Cuisine
        difficultyLevel: Level
        isVegetarian: Boolean
    }
`

export const TableQueries = `
    gettabledata(input: TableStateInput): [Table]!
`

export const TableMutations = `
    addtabledata(input: TableInput ): Table! 
`