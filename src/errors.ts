export class RouteRedefineError extends Error {

    private static makeMessage(key: string): string {
        return `route already defined for key ${key}`;
    }

    public name: string;
    public message: string;
    public stack?: string;

    constructor(key: string) {
       const message = RouteRedefineError.makeMessage(key);
       super(message);
       this.message = message;
       this.name = "RouteRedefineError";
       Object.setPrototypeOf(this, new.target.prototype);
    }
}
