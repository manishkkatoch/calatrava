export class RouteRedefineError extends Error {

    private static makeMessage = (key: string) => {
        return `route already defined for key ${key}`;
    }

    constructor(key: string) {
        super(RouteRedefineError.makeMessage(key));
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}

export class RouteNotFoundError extends Error {

        private static makeMessage = (key: string) => {
            return `route not found for key ${key}`;
        }

        constructor(key: string) {
            super(RouteNotFoundError.makeMessage(key));
            Object.setPrototypeOf(this, new.target.prototype);
            Error.captureStackTrace(this, this.constructor);
        }
    }
