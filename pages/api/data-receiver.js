export default function handler (req , res) {
    if (req.method === 'POST') {
    console.log('Donn ées reç ues en POST :', req.body );
    res.status(200).json({ message : 'Donn ées reçues et logg ées !'});
    } else {
    res.status(405).json({ message : 'Méthode non autorisée, utilisez POST.' });
    }
    }