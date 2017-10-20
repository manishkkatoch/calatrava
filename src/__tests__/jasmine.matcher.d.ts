declare namespace jasmine {
    interface Matchers<T> {
        toBeInstanceOf(expectedType: any): jasmine.CustomMatcher;
    }
    interface CustomMatcherResult {
        pass: boolean;
        message?: () => string;
    }
}