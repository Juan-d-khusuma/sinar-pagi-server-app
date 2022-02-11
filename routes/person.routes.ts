import { Prisma } from "@prisma/client";
import { Router } from "express";
import parser from "../utils/argsParser";
import prisma from "../lib/prisma";

function generateArgs(
  select?: string,
  search?: string,
  take?: string,
  page?: string
): Prisma.PersonFindManyArgs {
  const selectArgs = select ? parser(select) : undefined;
  const searchArgs: Prisma.PersonWhereInput = search
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

const personRoutes = Router()
  .get("/", async (req, res) => {
    res.json(
      await prisma.person.findMany({
        ...generateArgs(
          req.query["select"] as string,
          req.query["search"] as string,
          req.query["take"] as string,
          req.query["page"] as string
        ),
        orderBy: {
          name: "asc",
        },
      })
    );
  })
  .post("/", async (req, res) => {
    res.json(
      await prisma.person.create({
        data: {
          ...req.body,
        },
      })
    );
  })
  .put("/:id", async (req, res) => {
    res.json(
      await prisma.person.update({
        where: {
          id: parseInt(req.params["id"]),
        },
        data: {
          ...req.body,
        },
      })
    );
  })
  .get("/:id", async (req, res) => {
    const args = generateArgs(req.query["select"] as string);
    res.json(
      await prisma.person.findUnique({
        where: {
          id: parseInt(req.params["id"]),
        },
        select: args.select,
      })
    );
  })
  .delete("/:id", async (req, res) => {
    res.json(
      await prisma.person.delete({
        where: {
          id: parseInt(req.params["id"]),
        },
      })
    );
  })
  .post("/:id/debts", async (req, res) => {
    res.json(
      await prisma.person.update({
        where: {
          id: parseInt(req.params["id"]),
        },
        data: {
          Debts: {
            create: {
              ...req.body,
            },
          },
        },
      })
    );
  })
  .put("/:id/debts/:debtId", async (req, res) => {
    res.json(
      await prisma.person.update({
        where: {
          id: parseInt(req.params["id"]),
        },
        data: {
          Debts: {
            update: {
              where: {
                id: parseInt(req.params["debtId"]),
              },
              data: {
                ...req.body,
              },
            },
          },
        },
      })
    );
  })
  .delete("/:id/debts/:debtId", async (req, res) => {
    res.json(
      await prisma.person.update({
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
      })
    );
  })
  .get("/:id/payments", async (req, res) => {
    res.json(
      await prisma.person.findUnique({
        where: {
          id: parseInt(req.params["id"]),
        },
        select: {
          Payments: true,
        },
      })
    );
  })
  .post("/:id/payments", async (req, res) => {
    res.json(
      await prisma.person.update({
        where: {
          id: parseInt(req.params["id"]),
        },
        data: {
          Payments: {
            create: {
              ...req.body,
            },
          },
        },
      })
    );
  })
  .put("/:id/payments/:paymentId", async (req, res) => {
    res.json(
      await prisma.person.update({
        where: {
          id: parseInt(req.params["id"]),
        },
        data: {
          Payments: {
            update: {
              where: {
                id: parseInt(req.params["paymentId"]),
              },
              data: {
                ...req.body,
              },
            },
          },
        },
      })
    );
  })
  .delete("/:id/payments/:paymentId", async (req, res) => {
    res.json(
      await prisma.person.update({
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
      })
    );
  });

export default personRoutes;
