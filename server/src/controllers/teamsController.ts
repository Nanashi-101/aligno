import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// GET /api/users
export const getTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    const teams = await prisma.team.findMany();
    const teamsWithUserName = await Promise.all(
        teams.map(async (team: any) =>{
            const productOwner = await prisma.user.findUnique({
                where: { userId: team.productOwnerUserId! },
                select: { username: true }
            });

            const projectManager = await prisma.user.findUnique({
                where: { userId: team.projectManagerUserId! },
                select: { username: true }
            });

            return{
                ...team,
                productOwnerUserName: productOwner?.username,
                projectManagerUserName: projectManager?.username,
            }
        })
    );
    res.json(teamsWithUserName);
  } catch (error: any) {
    res.status(500).json({
      message: `Error retrieving team details. Error Message: ${error.message}`,
    });
  }
};