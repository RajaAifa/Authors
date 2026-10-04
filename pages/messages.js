import React, { useState, useEffect } from 'react';
import styles from './messages.module.css';
import Header from '../Components/Header';

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await fetch('/api/messages');
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Erreur lors du chargement des messages', error);
      }
    }
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch('/api/messages', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setMessages(messages.filter((message) => message.id !== id));
      } else {
        console.error('Erreur lors de la suppression du message');
      }
    } catch (error) {
      console.error('Erreur de connexion au serveur', error);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1>Messages des Clients</h1>
        {messages.length === 0 ? (
          <p>Aucun message pour le moment.</p>
        ) : (
          <ul className={styles.messageList}>
            {messages.map((msg) => (
              <li key={msg.id} className={styles.messageItem}>
                <p><strong>Nom:</strong> {msg.name}</p>
                <p><strong>Email:</strong> {msg.email}</p>
                <p><strong>Message:</strong> {msg.message}</p>
                <button onClick={() => handleDelete(msg.id)} className={styles.deleteButton}>Supprimer</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default MessagesPage;
