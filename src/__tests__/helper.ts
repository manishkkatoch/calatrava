import { GenericCallBack } from '../events';

// assumes last argument is always the completion callback
const getCompletionResolver = (args: any[]): GenericCallBack => {
    const argsCopied = [...args];
    return argsCopied.pop();
};

// assumes last two arguments are Success<T> and Failure
const getPromiseResolvers = (args: any[]) => {
    const argsCopied = [...args];
    const failure: GenericCallBack = argsCopied.pop();
    const success: GenericCallBack = argsCopied.pop();
    return  {
        success, failure,
    };
};

export const completingCallback = (response: any) =>
    jest.fn((...args: any[]) => {
        getCompletionResolver(args)(response);
    });

export const resolvingFunc = (response: any) =>
    jest.fn((...args: any[]) => {
        getPromiseResolvers(args).success(response);
    });

export const rejectingFunc = (response: any) =>
    jest.fn((...args: any[]) => {
        getPromiseResolvers(args).failure(response);
    });
