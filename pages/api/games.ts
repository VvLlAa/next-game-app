import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page = 1, page_size = 14 } = req.query;
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_KEY_GAME}/api/games`,
      {
        params: {
          key: process.env.NEXT_PUBLIC_API_KEY,
          page,
          page_size,
        },
      }
    );
    res.status(200).json(response.data.results);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Ошибка при получении данных', error: error });
  }
}
