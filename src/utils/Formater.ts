

export function camelToSnake(camelCase:string) {
    return camelCase.replace(/[A-Z]/g, match => `_${match.toLowerCase()}`);
}