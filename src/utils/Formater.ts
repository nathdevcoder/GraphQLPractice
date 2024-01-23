

export function camelToSnake(camelCase:string) {
    return camelCase.replace(/[A-Z]/g, match => `_${match.toLowerCase()}`);
}

export function snakeToCamel(snakeCase: string) {
    return snakeCase.replace(/_([a-z])/g, (_, match) => match.toUpperCase());
}