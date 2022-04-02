import { Request, Response, Router } from "express";

const router: Router  = Router(); 

router.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello world from express",
  });
});

export { router };