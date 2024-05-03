import { Request, Response, NextFunction } from "express";
import errorHandler from "../../utils/errorHandler";


interface filter {
    sem: number,
    rollNumber: string,
    department: string
}


export const approveResult = async (req: Request<{}, {}, filter>, res: Response, next: NextFunction) => {
    try {
        const { sem, rollNo, department } = req.query;
        const data = await prisma.result.findMany({
            where: {
                AND: [
                    { sem: Number(sem) },
                    { rollNo: String(rollNo) }
                ]
            }
        });
        const stud = await prisma.user.findUnique({
            where: {
                rollNo: String(rollNo)
            },
            select: {
                id: true
            }
        })
        const enrollData = await prisma.enrollment.findMany({
            where: {
                AND: [
                    { sem: Number(sem) },
                    { user_id: stud?.id }
                ]
            }
        });
        const fullData = await prisma.result.findMany({
            where: {
                AND: {
                    sem: Number(sem),
                    departmentId: String(department)

                }
            }
        });
        let totalCredits = 0;
        let totalScore = 0;

        if (data.length == enrollData.length) {
            data.forEach((i) => {
                totalCredits = i.creditEarned + totalCredits;
                totalScore = i.total + totalScore;
            });
            const cgpa = totalScore / totalCredits;
            res.status(200).json({
                type: "Success",
                msg: "Approved",
                data,
                sgpa:cgpa
            });
        }
        else{
            res.status(200).json({
                type:"Success",
                msg:"Result Yet To Be Decleared !"

            })
        }

    } catch (error) {
        return next(new errorHandler(500, "Internal Server Error"));
    }
}