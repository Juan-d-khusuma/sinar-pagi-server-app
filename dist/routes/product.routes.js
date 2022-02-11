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
const prisma_1 = __importDefault(require("../lib/prisma"));
const argsParser_1 = __importDefault(require("../utils/argsParser"));
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
const productRoutes = (0, express_1.Router)()
    .get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        data: yield prisma_1.default.product.findMany(Object.assign(Object.assign({}, generateArgs(req.query["select"], req.query["search"], req.query["take"], req.query["page"])), { orderBy: {
                name: "asc",
            } })),
    });
}))
    .post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        data: yield prisma_1.default.product.create({
            data: Object.assign({}, req.body),
        }),
    });
}))
    .get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const args = generateArgs(req.query["select"]);
    return res.json({
        data: yield prisma_1.default.product.findUnique({
            where: {
                id: req.params["id"],
            },
            select: args.select,
        }),
    });
}))
    .put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        data: yield prisma_1.default.product.update({
            where: {
                id: req.params["id"],
            },
            data: Object.assign({}, req.body),
        }),
    });
}))
    .delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        data: yield prisma_1.default.product.delete({
            where: {
                id: req.params["id"],
            },
        }),
    });
}))
    .post("/:id/selling-price", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        data: yield prisma_1.default.product.update({
            where: {
                id: req.params["id"],
            },
            data: {
                SellingPrices: {
                    create: Object.assign({}, req.body),
                },
            },
        }),
    });
}))
    .get("/:id/selling-price/:id2", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        data: yield prisma_1.default.product.findUnique({
            where: {
                id: req.params["id"],
            },
            select: {
                SellingPrices: {
                    where: {
                        id: {
                            equals: parseInt(req.params["id2"]),
                        },
                    },
                },
            },
        }),
    });
}))
    .put("/:id/selling-price/:id2", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        data: yield prisma_1.default.product.update({
            where: {
                id: req.params["id"],
            },
            data: {
                SellingPrices: {
                    // @ts-ignore
                    update: {
                        where: {
                            id: parseInt(req.params["id2"]),
                        },
                        data: Object.assign({}, req.body),
                    },
                },
            },
        }),
    });
}))
    .delete("/:id/selling-price/:id2", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        data: yield prisma_1.default.product.update({
            where: {
                id: req.params["id"],
            },
            data: {
                SellingPrices: {
                    // @ts-ignore
                    delete: {
                        id: parseInt(req.params["id2"]),
                    },
                },
            },
        }),
    });
}))
    .post("/:id/buying-price", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        data: yield prisma_1.default.product.update({
            where: {
                id: req.params["id"],
            },
            data: {
                BuyingPrices: {
                    create: Object.assign({}, req.body),
                },
            },
        }),
    });
}))
    .put("/:id/buying-price/:id2", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        data: yield prisma_1.default.product.update({
            where: {
                id: req.params["id"],
            },
            data: {
                BuyingPrices: {
                    // @ts-ignore
                    update: {
                        where: {
                            id: parseInt(req.params["id2"]),
                        },
                        data: Object.assign({}, req.body),
                    },
                },
            },
        }),
    });
}))
    .delete("/:id/buying-price/:id2", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        data: yield prisma_1.default.product.update({
            where: {
                id: req.params["id"],
            },
            data: {
                BuyingPrices: {
                    // @ts-ignore
                    delete: {
                        id: parseInt(req.params["id2"]),
                    },
                },
            },
        }),
    });
}))
    .post("/:id/selling-discount", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        data: yield prisma_1.default.product.update({
            where: {
                id: req.params["id"],
            },
            data: {
                SellingDiscounts: {
                    create: Object.assign({}, req.body),
                },
            },
        }),
    });
}))
    .put("/:id/selling-discount/:id2", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        data: yield prisma_1.default.product.update({
            where: {
                id: req.params["id"],
            },
            data: {
                SellingDiscounts: {
                    // @ts-ignore
                    update: {
                        where: {
                            id: parseInt(req.params["id2"]),
                        },
                        data: Object.assign({}, req.body),
                    },
                },
            },
        }),
    });
}))
    .delete("/:id/selling-discount/:id2", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        data: yield prisma_1.default.product.update({
            where: {
                id: req.params["id"],
            },
            data: {
                SellingDiscounts: {
                    // @ts-ignore
                    delete: {
                        id: parseInt(req.params["id2"]),
                    },
                },
            },
        }),
    });
}))
    .post("/:id/buying-discount", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        data: yield prisma_1.default.product.update({
            where: {
                id: req.params["id"],
            },
            data: {
                BuyingDiscounts: {
                    create: Object.assign({}, req.body),
                },
            },
        }),
    });
}))
    .put("/:id/buying-discount/:id2", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        data: yield prisma_1.default.product.update({
            where: {
                id: req.params["id"],
            },
            data: {
                BuyingDiscounts: {
                    // @ts-ignore
                    update: {
                        where: {
                            id: parseInt(req.params["id2"]),
                        },
                        data: Object.assign({}, req.body),
                    },
                },
            },
        }),
    });
}))
    .delete("/:id/buying-discount/:id2", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        data: yield prisma_1.default.product.update({
            where: {
                id: req.params["id"],
            },
            data: {
                BuyingDiscounts: {
                    // @ts-ignore
                    delete: {
                        id: parseInt(req.params["id2"]),
                    },
                },
            },
        }),
    });
}));
exports.default = productRoutes;
