export type EventHandler = (...args: any[]) => void;
export type Success<T> = (data: T) => void;
export type Failure = (error: Error) => void;
export type GenericCallBack = (...args: any[]) => void;
export type Resolver<T> = (success: Success<T>, failure: Failure) => void;

export function makePromise<T>(resolver: Resolver<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        resolver(
            (data: T) =>  resolve(data),
            (error: Error) => reject(error),
        );
    });
}
