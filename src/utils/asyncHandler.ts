// import { Request, Response, NextFunction } from "express";

// // Define an interface for the function arguments
// interface MyMiddlewareArgs {
//     req: Request;
//     res: Response;
//     next: NextFunction;
//   }

//   // Define the function signature using the custom interface
//   type MyMiddlewareFunction = (MyMiddlewareArgs) => void | Promise<void>;

// const asyncHandler = (passedFunction:MyMiddlewareFunction) => async (req:Request, res:Response, next:NextFunction) => {
//   try {
//     await passedFunction(req,res,next);
//   } catch (error) {
//     next();
//   }
// };
