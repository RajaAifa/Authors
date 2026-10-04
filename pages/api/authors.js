import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'authors.json');

async function readAuthorsData() {
  const data = await fs.readFile(dataFilePath, 'utf8');
  return JSON.parse(data);
}

async function writeAuthorsData(authors) {
  await fs.writeFile(dataFilePath, JSON.stringify(authors, null, 2));
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const authors = await readAuthorsData();
      res.status(200).json(authors);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur lors de la lecture des auteurs." });
    }
  } 
  
  else if (req.method === 'POST') {
    const { name } = req.body;
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ message: "Le nom de l'auteur est obligatoire." });
    }

    try {
      const authors = await readAuthorsData();
      const newAuthor = { id: Date.now(), name };
      authors.push(newAuthor);
      await writeAuthorsData(authors);
      res.status(201).json(newAuthor);
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'auteur :", error);
      res.status(500).json({ message: "Erreur serveur lors de l'ajout de l'auteur." });
    }
  } 
  
  else if (req.method === 'PUT') {
    const { id, name } = req.body;
    if (!id || !name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ message: "ID et nom obligatoires." });
    }

    try {
      const authors = await readAuthorsData();
      const index = authors.findIndex(author => author.id === id);
      
      if (index === -1) {
        return res.status(404).json({ message: "Auteur non trouvé." });
      }

      authors[index].name = name;
      await writeAuthorsData(authors);
      res.status(200).json(authors[index]);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'auteur :", error);
      res.status(500).json({ message: "Erreur serveur lors de la mise à jour." });
    }
  } 
  
  else if (req.method === 'DELETE') {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "L'ID de l'auteur est obligatoire." });
    }

    try {
      let authors = await readAuthorsData();
      const filteredAuthors = authors.filter(author => author.id !== id);

      if (authors.length === filteredAuthors.length) {
        return res.status(404).json({ message: "Auteur non trouvé." });
      }

      await writeAuthorsData(filteredAuthors);
      res.status(200).json({ message: "Auteur supprimé avec succès." });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'auteur :", error);
      res.status(500).json({ message: "Erreur serveur lors de la suppression." });
    }
  } 
  
  else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
