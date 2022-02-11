"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parse(args) {
    // coverts a comma separated string to a object with key and the value of true
    return args.split(",").reduce((acc, curr) => {
        if (curr.trim() === "BuyingDiscounts" ||
            curr.trim() === "SellingDiscounts" ||
            curr.trim() === "BuyingPrices" ||
            curr.trim() === "SellingPrices") {
            // @ts-ignore
            acc[curr.trim()] = { orderBy: { description: "asc" } };
        }
        else {
            // @ts-ignore
            acc[curr.trim()] = true;
        }
        return acc;
    }, {});
}
exports.default = parse;
