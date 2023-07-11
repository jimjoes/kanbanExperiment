import { NextApiRequest, NextApiResponse } from "next";

// GET /api/user
export default function handler(_: NextApiRequest, res: NextApiResponse) {
  // In a proper implementation, this would authenticate the user and fetch their ID
  const userId = "ebf377b0-dea2-4af9-80f6-9c3634e5e8a4";
  res.status(200).json({ userId });
}
