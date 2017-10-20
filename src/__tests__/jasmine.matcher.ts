// tslint:disable-next-line:no-reference
/// <reference path="./jasmine.matcher.d.ts" />
import {} from "jasmine";

const toBeInstanceOf = (expectedType: any): jasmine.CustomMatcher => {
    const identify = (obj): string => {
        return obj.name ? obj.name : obj.constructor.name;
    };
    return {
        compare: (actual: any, expected: any): jasmine.CustomMatcherResult => {
            const isPositive: boolean = actual instanceof expected;
            let report = "";
            if ( !isPositive ) {
                report = `expected actual to be instance of ${expected.name}` +
                    ` found ${identify(actual)} instead.`;
            }
            const result: jasmine.CustomMatcherResult = {
                pass: isPositive,
                message: () => report,
            };
            return result;
        },
    };
};

const customMatchers: jasmine.CustomMatcherFactories = {
    toBeInstanceOf,
   };
// tslint:disable-next-line:max-line-length
export { toBeInstanceOf, customMatchers };
