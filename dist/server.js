"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const distributor_routes_1 = __importDefault(require("./routes/distributor.routes"));
const bp = __importStar(require("body-parser"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const person_routes_1 = __importDefault(require("./routes/person.routes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.use((0, morgan_1.default)("dev"));
app.use(bp.json());
app.use("/distributors", distributor_routes_1.default);
app.use("/products", product_routes_1.default);
app.use("/persons", person_routes_1.default);
app.listen(port, () => console.log(`Server started on port ${port}`));
