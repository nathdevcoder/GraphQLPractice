

export const TableEnums = `
    enum Cuisine {
        Italian
        Indian
        Chinese
        Mexican
    }
    enum Level {
        Easy
        Medium
        Hard
    }
    enum Order {
        asc
        desc
    }
    enum Operators {
        contains
        equals
    }
`

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
        id: String
    } 

    type TableOptions {
        sortable: [String]
        filterable: [String]
        selectable:  [String]
        densable: Boolean
        count: Int 
    }
    type TableFilter {
        field: String
        operations: Operators
        query: String
    }
    type TableSort {
        field: String
        order: Order
    }
    type TableState {
        page: Int!
        rowsPerPage: Int!
        sort: TableSort
        filter: [TableFilter]
    }

    type TableResponse {
        data: [Table]!
        options: TableOptions
        state: TableState
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
        query: String
    }
    input TableStateInput {
        page: Int!
        rowsPerPage: Int!
        sort: SortInput
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
    gettabledata(input: TableStateInput): TableResponse!
`

export const TableMutations = `
    addtabledata(input: TableInput ): Table! 
`