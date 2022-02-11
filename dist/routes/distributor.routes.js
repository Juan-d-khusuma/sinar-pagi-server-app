"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const argsParser_1 = __importDefault(require("../utils/argsParser"));
const prisma_1 = __importDefault(require("../lib/prisma"));
function generateArgs(select, search, take, page) {
    const selectArgs = select ? (0, argsParser_1.default)(select) : undefined;
    const searchArgs = search
        ? { name: { contains: search, mode: "insensitive" } }
        : {};
    const takeArgs = take ? parseInt(take) : undefined;
    const pageArgs = page ? parseInt(page) : 1;
    return {
        where: searchArgs,
        select: selectArgs,
        take: takeArgs,
        skip: takeArgs && pageArgs ? takeArgs * (pageArgs - 1) : undefined,
    };
}
const distributorRoutes = (0, express_1.Router)()
    .get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        data: yield prisma_1.default.distributor.findMany(Object.assign({}, generateArgs(req.query["select"], req.query["search"], req.query["take"], req.query["page"]))),
    });
}))
    .post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        data: yield prisma_1.default.distributor.create({
            data: Object.assign({}, req.body),
        }),
    });
}))
    .get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const args = generateArgs(req.query["select"]);
    return res.json({
        data: yield prisma_1.default.distributor.findUnique({
            where: {
                id: parseInt(req.params["id"]),
            },
            select: args.select,
        }),
    });
}))
    .put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        data: yield prisma_1.default.distributor.update({
            where: {
                id: parseInt(req.params["id"]),
            },
            data: Object.assign({}, req.body),
        }),
    });
}))
    .delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        data: yield prisma_1.default.distributor.delete({
            where: {
                id: parseInt(req.params["id"]),
            },
        }),
    });
}))
    .get("/:id/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const args = generateArgs(req.query["select"]);
    return res.json({
        data: yield prisma_1.default.product.findMany({
            where: {
                // @ts-ignore
                distributorId: parseInt(req.params["id"]),
            },
            select: args.select,
        }),
    });
}));
exports.default = distributorRoutes;
