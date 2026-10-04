import * as yup from 'yup';
import { promises as fs } from 'fs';
import path from 'path';

// Définir le schéma de validation avec Yup
const contactSchema = yup.object().shape({
  name: yup.string().required("Le nom est obligatoire."),
  email: yup.string().email("Format d'email invalide.").required("L'email est obligatoire."),
  message: yup.string().min(10, "Le message doit contenir au moins 10 caractères.").required("Le message est obligatoire."),
});

// Définir le chemin du fichier JSON pour stocker les données
const dataFilePath = path.join(process.cwd(), 'data', 'contactMessages.json');

// Fonction pour lire les données existantes du fichier JSON
async function readData() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return []; // Si le fichier n'existe pas ou est vide, retourner un tableau vide
  }
}

// Fonction pour écrire de nouvelles données dans le fichier JSON
async function writeData(messages) {
  await fs.writeFile(dataFilePath, JSON.stringify(messages, null, 2));
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Valider les données du formulaire avec Yup
      await contactSchema.validate(req.body);

      const { name, email, message } = req.body;

      // Sauvegarder les données dans le fichier JSON
      const messages = await readData();
      const newMessage = { id: Date.now(), name, email, message, date: new Date().toISOString() };
      messages.push(newMessage); // Ajouter le nouveau message

      // Écrire les données mises à jour dans le fichier JSON
      await writeData(messages);

      console.log('Formulaire de contact reçu et validé :', { name, email, message });
      res.status(200).json({ message: 'Formulaire envoyé avec succès !' });

    } catch (error) {
      // Gestion des erreurs de validation
      console.error('Erreur de validation :', error);
      res.status(400).json({ message: error.message });
    }
  } else {
    // Gérer les méthodes non autorisées
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
