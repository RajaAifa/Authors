import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'contactMessages.json');

export default function handler(req, res) {
  try {
    const messages = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    if (req.method === 'GET') {
      res.status(200).json(messages);
    } else if (req.method === 'DELETE') {
      const { id } = req.body;
      const updatedMessages = messages.filter((msg) => msg.id !== id);

      fs.writeFileSync(filePath, JSON.stringify(updatedMessages, null, 2), 'utf8');
      res.status(200).json({ message: 'Message supprimé avec succès.' });
    } else {
      res.status(405).json({ message: 'Méthode non autorisée' });
    }
  } catch (error) {
    console.error('Erreur lors de la gestion des messages:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}
