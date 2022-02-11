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
const personRoutes = (0, express_1.Router)()
    .get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield prisma_1.default.person.findMany(Object.assign(Object.assign({}, generateArgs(req.query["select"], req.query["search"], req.query["take"], req.query["page"])), { orderBy: {
            name: "asc",
        } })));
}))
    .post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield prisma_1.default.person.create({
        data: Object.assign({}, req.body),
    }));
}))
    .put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield prisma_1.default.person.update({
        where: {
            id: parseInt(req.params["id"]),
        },
        data: Object.assign({}, req.body),
    }));
}))
    .get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const args = generateArgs(req.query["select"]);
    res.json(yield prisma_1.default.person.findUnique({
        where: {
            id: parseInt(req.params["id"]),
        },
        select: args.select,
    }));
}))
    .delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield prisma_1.default.person.delete({
        where: {
            id: parseInt(req.params["id"]),
        },
    }));
}))
    .post("/:id/debts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield prisma_1.default.person.update({
        where: {
            id: parseInt(req.params["id"]),
        },
        data: {
            Debts: {
                create: Object.assign({}, req.body),
            },
        },
    }));
}))
    .put("/:id/debts/:debtId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield prisma_1.default.person.update({
        where: {
            id: parseInt(req.params["id"]),
        },
        data: {
            Debts: {
                update: {
                    where: {
                        id: parseInt(req.params["debtId"]),
                    },
                    data: Object.assign({}, req.body),
                },
            },
        },
    }));
}))
    .delete("/:id/debts/:debtId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield prisma_1.default.person.update({
        where: {
            id: parseInt(req.params["id"]),
        },
        data: {
            Debts: {
                delete: {
                    id: parseInt(req.params["debtId"]),
                },
            },
        },
    }));
}))
    .get("/:id/payments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield prisma_1.default.person.findUnique({
        where: {
            id: parseInt(req.params["id"]),
        },
        select: {
            Payments: true,
        },
    }));
}))
    .post("/:id/payments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield prisma_1.default.person.update({
        where: {
            id: parseInt(req.params["id"]),
        },
        data: {
            Payments: {
                create: Object.assign({}, req.body),
            },
        },
    }));
}))
    .put("/:id/payments/:paymentId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield prisma_1.default.person.update({
        where: {
            id: parseInt(req.params["id"]),
        },
        data: {
            Payments: {
                update: {
                    where: {
                        id: parseInt(req.params["paymentId"]),
                    },
                    data: Object.assign({}, req.body),
                },
            },
        },
    }));
}))
    .delete("/:id/payments/:paymentId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield prisma_1.default.person.update({
        where: {
            id: parseInt(req.params["id"]),
        },
        data: {
            Payments: {
                delete: {
                    id: parseInt(req.params["paymentId"]),
                },
            },
        },
    }));
}));
exports.default = personRoutes;
