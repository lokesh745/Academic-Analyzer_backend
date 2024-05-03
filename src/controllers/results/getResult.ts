import { Request, Response, NextFunction } from "express";
import errorHandler from "../../utils/errorHandler";
import { resultDetails } from "../../utils/resultData";


interface filter {
    sem: number,
}


export const getResult = async (req: Request<{}, {}, filter>, res: Response, next: NextFunction) => {
    try {
        let list:Array<{courseName:string,obtained:number,total:number}>=[]
        const { sem} = req.query;
        const email=req.uniqueIdentity;
        const user=await prisma.user.findUnique({
            where:{
                email:email
            },
            select:{
                rollNo:true
            }
        })
        const data = await prisma.result.findMany({
            where: {
                AND: [
                    { sem: Number(sem) },
                    { rollNo: String(user?.rollNo) }
                ]
            }
        });
        const stud = await prisma.user.findUnique({
            where: {
                rollNo: String(user?.rollNo)
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
        let totalCredits = 0;
        let totalScore = 0;

        if (data.length == enrollData.length) {
            for (const i of data)  {
                totalCredits = i.creditEarned + totalCredits;
                totalScore = i.total + totalScore;
                const d=await prisma.course.findUnique({
                    where:{
                        id:i.courseID
                    },
                    select:{
                        course_name:true
                    }
                });
                const courseName=d?.course_name;
                const obtained=i.ese+i.isa+i.mse;
                const res=resultDetails(i.courseID);
                const total=res.ese+res.isa+res.mse;
                list.push({
                    courseName:String(courseName),obtained,total
                });
            };
            const cgpa = totalScore / totalCredits;
            res.status(200).json({
                type: "Success",
                msg: "Approved",
                data,
                sgpa:cgpa,
                list
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

export const getResultGraphData = async (req: Request<{}, {}, {}>, res: Response, next: NextFunction) => {
    var array = [
        { sem: 1, sgpi: 0 },
        { sem: 2, sgpi: 0 },
        { sem: 3, sgpi: 0 },
        { sem: 4, sgpi: 0 },
        { sem: 5, sgpi: 0 },
        { sem: 6, sgpi: 0 },
        { sem: 7, sgpi: 0 },
        { sem: 8, sgpi: 0 },
    ];
    var list: Array<{ sem: number, sgpi: number }> = [];
    try {
        const email = req.uniqueIdentity;
        const user = await prisma.user.findUnique({
            where: { email: email },
            select: { rollNo: true }
        });
        const stud = await prisma.user.findUnique({
            where: { rollNo: String(user?.rollNo) },
            select: { id: true }
        });

        for (const item of array) {
            const data = await prisma.result.findMany({
                where: {
                    AND: [
                        { sem: Number(item.sem) },
                        { rollNo: String(user?.rollNo) }
                    ]
                }
            });

            const enrollData = await prisma.enrollment.findMany({
                where: {
                    AND: [
                        { sem: Number(item.sem) },
                        { user_id: stud?.id }
                    ]
                }
            });

            let totalCredits = 0;
            let totalScore = 0;

            if (data.length == enrollData.length) {
                data.forEach((i) => {
                    totalCredits += i.creditEarned;
                    totalScore += i.total;
                });
                const cgpa = totalScore / totalCredits;
                if (cgpa > 0) {
                    list.push({ sem: item.sem, sgpi: cgpa });
                } else {
                    list.push({ sem: item.sem, sgpi: 0 });
                }
            }
        }
        res.status(200).json({
            type: "Success",
            msg: "Approved",
            list
        });
    } catch (error) {
        return next(new errorHandler(500, "Internal Server Error"));
    }
}
