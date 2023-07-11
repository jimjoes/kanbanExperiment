import { NextApiRequest, NextApiResponse } from "next";

// static data for the board - this would be replaced with a database in a proper implementation
export const data: Board[] = [
  {
    id: "ebf377b0-dea2-4af9-80f6-9c3634e5e8a4",
    title: "Deals",
    columns: [
      {
        id: "column-1",
        title: "Target",
        color: "pink",
        deals: [
          {
            id: "deal-1",
            title: "Index Ventures",
            logo: "/indexVentures.png",
            url: "https://www.indexventures.com",
            contacts: [
              {
                avatar: "/hannah_seal.png",
                name: "Hannah Seal",
              },
              {
                avatar: "/jack_kleeman.jpeg",
                name: "Jack Kleeman",
              },
            ],
            activities: [""],
            reminder: "",
            notes: [
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel pellentesque nunc. Morbi vitae nunc in dui commodo molestie. Fusce neque felis, fringilla non maximus sed, gravida lacinia magna. Curabitur in arcu at nulla vulputate laoreet. Sed non aliquam nulla. Morbi sit amet placerat ipsum, a convallis nibh. Nulla vulputate vulputate turpis ac imperdiet. Pellentesque dictum enim sit amet ultrices dictum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque convallis lobortis nibh, sed accumsan est. Proin id pellentesque mauris, sed feugiat lectus.",
            ],
          },
        ],
      },
      {
        id: "column-2",
        title: "Contacted",
        color: "cyan",
        deals: [
          {
            id: "deal-2",
            title: "Index Ventures",
            logo: "/indexVentures.png",
            url: "https://www.indexventures.com",
            contacts: [
              {
                avatar: "/hannah_seal.png",
                name: "Hannah Seal",
              },
              {
                avatar: "/jack_kleeman.jpeg",
                name: "Jack Kleeman",
              },
            ],
            activities: [""],
            reminder: "",
            notes: [
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel pellentesque nunc. Morbi vitae nunc in dui commodo molestie. Fusce neque felis, fringilla non maximus sed, gravida lacinia magna. Curabitur in arcu at nulla vulputate laoreet. Sed non aliquam nulla. Morbi sit amet placerat ipsum, a convallis nibh. Nulla vulputate vulputate turpis ac imperdiet. Pellentesque dictum enim sit amet ultrices dictum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque convallis lobortis nibh, sed accumsan est. Proin id pellentesque mauris, sed feugiat lectus.",
            ],
          },
          {
            id: "deal-3",
            title: "Index Ventures",
            logo: "/indexVentures.png",
            url: "https://www.indexventures.com",
            contacts: [
              {
                avatar: "/hannah_seal.png",
                name: "Hannah Seal",
              },
              {
                avatar: "/jack_kleeman.jpeg",
                name: "Jack Kleeman",
              },
            ],
            activities: [""],
            reminder: "",
            notes: [
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel pellentesque nunc. Morbi vitae nunc in dui commodo molestie. Fusce neque felis, fringilla non maximus sed, gravida lacinia magna. Curabitur in arcu at nulla vulputate laoreet. Sed non aliquam nulla. Morbi sit amet placerat ipsum, a convallis nibh. Nulla vulputate vulputate turpis ac imperdiet. Pellentesque dictum enim sit amet ultrices dictum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque convallis lobortis nibh, sed accumsan est. Proin id pellentesque mauris, sed feugiat lectus.",
            ],
          },
        ],
      },
      {
        id: "column-3",
        title: "First Meeting",
        color: "gray",
        deals: [
          {
            id: "deal-4",
            title: "Index Ventures",
            logo: "/indexVentures.png",
            url: "https://www.indexventures.com",
            contacts: [
              {
                avatar: "/hannah_seal.png",
                name: "Hannah Seal",
              },
              {
                avatar: "/jack_kleeman.jpeg",
                name: "Jack Kleeman",
              },
            ],
            activities: [""],
            reminder: "",
            notes: [
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel pellentesque nunc. Morbi vitae nunc in dui commodo molestie. Fusce neque felis, fringilla non maximus sed, gravida lacinia magna. Curabitur in arcu at nulla vulputate laoreet. Sed non aliquam nulla. Morbi sit amet placerat ipsum, a convallis nibh. Nulla vulputate vulputate turpis ac imperdiet. Pellentesque dictum enim sit amet ultrices dictum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque convallis lobortis nibh, sed accumsan est. Proin id pellentesque mauris, sed feugiat lectus.",
            ],
          },
        ],
      },
    ],
  },
];

// GET /api/boards/:boardId
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  const { boardId } = req.query;

  if (!boardId) {
    return res.status(400).json({ message: "boardId required" });
  }

  switch (method) {
    case "GET":
      // Find the board data with the given boardId
      const board = data.find((board) => board.id === boardId);

      if (!board) {
        return res.status(404).json({ message: "Board not found" });
      }

      // Return the board data
      res.status(200).json(board);
      break;
    case "PUT":
      // Find the index of the board with the given boardId
      const boardIndex = data.findIndex((board) => board.id === boardId);

      if (boardIndex === -1) {
        return res.status(404).json({ message: "Board not found" });
      }

      // Update the board data with the request body
      data[boardIndex] = req.body;
      res.status(200).json(data[boardIndex]);

      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
