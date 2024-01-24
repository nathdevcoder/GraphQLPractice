export type FilterFn = (rootValue?: any, args?: any, context?: any, info?: any) => boolean;

export const withFilter = (asyncIteratorFn: () => AsyncIterableIterator<any>, filterFn: FilterFn) => {
  return (rootValue: any, args: any, context: any, info: any): AsyncIterator<any> => {
    const asyncIterator = asyncIteratorFn();

    // @ts-ignore
    const getNextPromise = () => {
      return asyncIterator
        .next()
        .then(payload => Promise.all([
          payload,
          Promise.resolve(filterFn(payload.value, args, context, info)).catch(() => false),
        ]))
        // @ts-ignore
        .then(([payload, filterResult]) => {
          if (filterResult === true) {
            return payload;
          } 
          // Skip the current value and wait for the next one
          return getNextPromise();
        });
    };

    return {
      next() {
        return getNextPromise();
      },
      return() {
        // @ts-ignore
        return asyncIterator.return();
      },
      throw(error: any) {
        // @ts-ignore
        return asyncIterator.throw(error);
      },
      [Symbol.asyncIterator]() {
        return this;
      },
    } as any;
  };
};