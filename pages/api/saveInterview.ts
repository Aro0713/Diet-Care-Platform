import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Przykład: zapisz dane z wywiadu
    const data = req.body;
    console.log("Dane wywiadu:", data);
    // W przyszłości: zapis do bazy danych
    res.status(200).json({ message: "Wywiad zapisany pomyślnie." });
  } else {
    res.status(405).json({ message: "Metoda niedozwolona." });
  }
}
