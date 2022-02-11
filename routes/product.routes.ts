import { Prisma } from "@prisma/client";
import { Router } from "express";
import prisma from "../lib/prisma";
import parser from "../utils/argsParser";

function generateArgs(
  select?: string,
  search?: string,
  take?: string,
  page?: string
): Prisma.ProductFindManyArgs {
  const selectArgs = select ? parser(select) : undefined;
  const searchArgs: Prisma.ProductWhereInput = search
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
const productRoutes = Router()
  .get("/", async (req, res) => {
    return res.json({
      data: await prisma.product.findMany({
        ...generateArgs(
          req.query["select"] as string,
          req.query["search"] as string,
          req.query["take"] as string,
          req.query["page"] as string
        ),
        orderBy: {
          name: "asc",
        },
      }),
    });
  })
  .post("/", async (req, res) => {
    return res.json({
      data: await prisma.product.create({
        data: {
          ...req.body,
        },
      }),
    });
  })
  .get("/:id", async (req, res) => {
    const args = generateArgs(req.query["select"] as string);
    return res.json({
      data: await prisma.product.findUnique({
        where: {
          id: req.params["id"],
        },
        select: args.select,
      }),
    });
  })
  .put("/:id", async (req, res) => {
    return res.json({
      data: await prisma.product.update({
        where: {
          id: req.params["id"],
        },
        data: {
          ...req.body,
        },
      }),
    });
  })
  .delete("/:id", async (req, res) => {
    return res.json({
      data: await prisma.product.delete({
        where: {
          id: req.params["id"],
        },
      }),
    });
  })
  .post("/:id/selling-price", async (req, res) => {
    return res.json({
      data: await prisma.product.update({
        where: {
          id: req.params["id"],
        },
        data: {
          SellingPrices: {
            create: {
              ...req.body,
            },
          },
        },
      }),
    });
  })
  .get("/:id/selling-price/:id2", async (req, res) => {
    return res.json({
      data: await prisma.product.findUnique({
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
  })
  .put("/:id/selling-price/:id2", async (req, res) => {
    return res.json({
      data: await prisma.product.update({
        where: {
          id: req.params["id"],
        },
        data: {
          SellingPrices: {
            // @ts-ignore
            update: {
              where: {
                id: parseInt(req.params["id2"]) as any,
              },
              data: {
                ...req.body,
              },
            },
          },
        },
      }),
    });
  })
  .delete("/:id/selling-price/:id2", async (req, res) => {
    return res.json({
      data: await prisma.product.update({
        where: {
          id: req.params["id"],
        },
        data: {
          SellingPrices: {
            // @ts-ignore
            delete: {
              id: parseInt(req.params["id2"]) as any,
            },
          },
        },
      }),
    });
  })
  .post("/:id/buying-price", async (req, res) => {
    return res.json({
      data: await prisma.product.update({
        where: {
          id: req.params["id"],
        },
        data: {
          BuyingPrices: {
            create: {
              ...req.body,
            },
          },
        },
      }),
    });
  })
  .put("/:id/buying-price/:id2", async (req, res) => {
    return res.json({
      data: await prisma.product.update({
        where: {
          id: req.params["id"],
        },
        data: {
          BuyingPrices: {
            // @ts-ignore
            update: {
              where: {
                id: parseInt(req.params["id2"]) as any,
              },
              data: {
                ...req.body,
              },
            },
          },
        },
      }),
    });
  })
  .delete("/:id/buying-price/:id2", async (req, res) => {
    return res.json({
      data: await prisma.product.update({
        where: {
          id: req.params["id"],
        },
        data: {
          BuyingPrices: {
            // @ts-ignore
            delete: {
              id: parseInt(req.params["id2"]) as any,
            },
          },
        },
      }),
    });
  })
  .post("/:id/selling-discount", async (req, res) => {
    return res.json({
      data: await prisma.product.update({
        where: {
          id: req.params["id"],
        },
        data: {
          SellingDiscounts: {
            create: {
              ...req.body,
            },
          },
        },
      }),
    });
  })
  .put("/:id/selling-discount/:id2", async (req, res) => {
    return res.json({
      data: await prisma.product.update({
        where: {
          id: req.params["id"],
        },
        data: {
          SellingDiscounts: {
            // @ts-ignore
            update: {
              where: {
                id: parseInt(req.params["id2"]) as any,
              },
              data: {
                ...req.body,
              },
            },
          },
        },
      }),
    });
  })
  .delete("/:id/selling-discount/:id2", async (req, res) => {
    return res.json({
      data: await prisma.product.update({
        where: {
          id: req.params["id"],
        },
        data: {
          SellingDiscounts: {
            // @ts-ignore
            delete: {
              id: parseInt(req.params["id2"]) as any,
            },
          },
        },
      }),
    });
  })
  .post("/:id/buying-discount", async (req, res) => {
    return res.json({
      data: await prisma.product.update({
        where: {
          id: req.params["id"],
        },
        data: {
          BuyingDiscounts: {
            create: {
              ...req.body,
            },
          },
        },
      }),
    });
  })
  .put("/:id/buying-discount/:id2", async (req, res) => {
    return res.json({
      data: await prisma.product.update({
        where: {
          id: req.params["id"],
        },
        data: {
          BuyingDiscounts: {
            // @ts-ignore
            update: {
              where: {
                id: parseInt(req.params["id2"]) as any,
              },
              data: {
                ...req.body,
              },
            },
          },
        },
      }),
    });
  })
  .delete("/:id/buying-discount/:id2", async (req, res) => {
    return res.json({
      data: await prisma.product.update({
        where: {
          id: req.params["id"],
        },
        data: {
          BuyingDiscounts: {
            // @ts-ignore
            delete: {
              id: parseInt(req.params["id2"]) as any,
            },
          },
        },
      }),
    });
  });

export default productRoutes;
