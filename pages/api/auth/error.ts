import { NextApiRequest, NextApiResponse } from "next";

const errorHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(404).json({ error: "Not Found" });
};

export default errorHandler;
