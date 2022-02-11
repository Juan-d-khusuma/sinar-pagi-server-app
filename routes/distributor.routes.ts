import { Prisma } from "@prisma/client";
import { Router } from "express";
import parser from "../utils/argsParser";
import prisma from "../lib/prisma";

function generateArgs(
  select?: string,
  search?: string,
  take?: string,
  page?: string
): Prisma.DistributorFindManyArgs {
  const selectArgs = select ? parser(select) : undefined;
  const searchArgs: Prisma.DistributorWhereInput = search
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

const distributorRoutes = Router()
  .get("/", async (req, res) => {
    return res.json({
      data: await prisma.distributor.findMany({
        ...generateArgs(
          req.query["select"] as string,
          req.query["search"] as string,
          req.query["take"] as string,
          req.query["page"] as string
        ),
      }),
    });
  })
  .post("/", async (req, res) => {
    return res.json({
      data: await prisma.distributor.create({
        data: {
          ...req.body,
        },
      }),
    });
  })
  .get("/:id", async (req, res) => {
    const args = generateArgs(req.query["select"] as string);
    return res.json({
      data: await prisma.distributor.findUnique({
        where: {
          id: parseInt(req.params["id"]),
        },
        select: args.select,
      }),
    });
  })
  .put("/:id", async (req, res) => {
    return res.json({
      data: await prisma.distributor.update({
        where: {
          id: parseInt(req.params["id"]),
        },
        data: {
          ...req.body,
        },
      }),
    });
  })
  .delete("/:id", async (req, res) => {
    return res.json({
      data: await prisma.distributor.delete({
        where: {
          id: parseInt(req.params["id"]),
        },
      }),
    });
  })
  .get("/:id/products", async (req, res) => {
    const args = generateArgs(req.query["select"] as string);
    return res.json({
      data: await prisma.product.findMany({
        where: {
          // @ts-ignore
          distributorId: parseInt(req.params["id"]),
        },
        select: args.select as any,
      }),
    });
  });

export default distributorRoutes;
