import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(res => {
      setRepositories(res.data);
    });
  }, []);

  async function handleAddRepository() {
    const res = await api.post('repositories', {
      title: 'Desafio ReactJS',
      url: "https://www.google.com.br",
      techs: "node,react"
    });

    const repository = res.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const res = await api.delete(`repositories/${id}`);
    if (res.status === 204) {
      setRepositories(repositories.filter(repository => repository.id !== id));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return <li key={repository.id}> {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
