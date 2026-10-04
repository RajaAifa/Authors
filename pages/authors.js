import React, { useState, useEffect } from 'react';
import styles from './authors.module.css';
import Header from '../Components/Header';
import { useForm } from 'react-hook-form';

const AuthorsPage = () => {

const [authors, setAuthors] = useState([]);
const { register, handleSubmit, reset, setValue } = useForm();
const [addAuthorError, setAddAuthorError] = useState(null);
const [editingAuthor, setEditingAuthor] = useState(null); // État pour gérer l'édition

useEffect(() => {
  async function fetchAuthors() {
    try {
      const response = await fetch('/api/authors');
      const data = await response.json();
      setAuthors(data);
    } catch (e) {
      console.error('Error fetching authors', e);
    }
  }
  fetchAuthors();
}, []);

// Ajouter un nouvel auteur
const handleAddAuthor = async (data) => {
  setAddAuthorError(null);
  try {
    const response = await fetch('/api/authors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const newAuthor = await response.json();
      setAuthors((prevAuthors) => [...prevAuthors, newAuthor]);
      reset(); // Réinitialise l'input
    } else {
      const errorData = await response.json();
      setAddAuthorError(errorData.message || 'Erreur lors de l\'ajout de l\'auteur.');
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'auteur:', error);
    setAddAuthorError('Erreur de connexion au serveur.');
  }
};

// Modifier un auteur
const handleUpdateAuthor = async (data) => {
  if (!editingAuthor) return;

  try {
    const response = await fetch('/api/authors', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: editingAuthor.id, name: data.name }),
    });

    if (response.ok) {
      const updatedAuthor = await response.json();
      setAuthors((prevAuthors) =>
        prevAuthors.map((author) =>
          author.id === updatedAuthor.id ? updatedAuthor : author
        )
      );
      setEditingAuthor(null); // Réinitialise l'édition
      reset(); // Réinitialise le formulaire
    } else {
      const errorData = await response.json();
      setAddAuthorError(errorData.message || 'Erreur lors de la mise à jour de l\'auteur.');
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'auteur:', error);
    setAddAuthorError('Erreur de connexion au serveur.');
  }
};

// Supprimer un auteur
const handleDeleteAuthor = async (id) => {
  try {
    const response = await fetch('/api/authors', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      setAuthors((prevAuthors) => prevAuthors.filter((author) => author.id !== id));
    } else {
      const errorData = await response.json();
      setAddAuthorError(errorData.message || 'Erreur lors de la suppression de l\'auteur.');
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'auteur:', error);
    setAddAuthorError('Erreur de connexion au serveur.');
  }
};

// Gérer le formulaire de modification
const handleEditAuthor = (author) => {
  setEditingAuthor(author);
  setValue('name', author.name); // Remplir le formulaire avec les données de l'auteur
};


    return(
        <>
        <Header />
        {/* Liste des auteurs */}
        {authors.length > 0 && (
            <div className={styles.authors}>
              Auteurs :
              {authors.map((author) => (
                <div key={author.id} className={styles.authorItem}>
                  <span>{author.name}</span>
                  <button onClick={() => handleEditAuthor(author)} className={styles.editButton}>
                    Modifier
                  </button>
                  <button onClick={() => handleDeleteAuthor(author.id)} className={styles.deleteButton}>
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          )}
  
          {/* Formulaire d'ajout ou de modification d'auteur */}
          <form
            onSubmit={handleSubmit(editingAuthor ? handleUpdateAuthor : handleAddAuthor)}
            className={styles.addAuthorForm}
          >
            <input
              type="text"
              {...register('name')}
              placeholder="Nom de l’auteur"
              className={styles.authorInput}
            />
            <button type="submit" className={styles.addAuthorButton}>
              {editingAuthor ? 'Mettre à jour l\'auteur' : 'Ajouter Auteur'}
            </button>
          </form>
  
          {addAuthorError && <p className={styles.addAuthorError}>{addAuthorError}</p>} {/* Affichage des erreurs */}
          </>
    )
        };

export default AuthorsPage;
