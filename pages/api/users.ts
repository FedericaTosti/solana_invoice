import type { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "mydatabase",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const [rows, fields] = await connection.execute("SELECT * FROM users");
      res.status(200).json(rows);
    } catch (error) {
      console.error("Errore durante il recupero degli utenti:", error);
      res
        .status(500)
        .json({ message: "Errore durante il recupero degli utenti" });
    }
  } else if (req.method === "POST") {
    const { name } = req.body;
    try {
      const [result] = await connection.execute(
        "INSERT INTO users (name) VALUES (?)",
        [name]
      );
      res.status(201).json({
        message: "Utente creato con successo",
        insertedId: result.insertId,
      });
    } catch (error) {
      console.error("Errore durante la creazione dell'utente:", error);
      res
        .status(500)
        .json({ message: "Errore durante la creazione dell'utente" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
