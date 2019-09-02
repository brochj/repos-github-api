import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';

import { Form, SubmitButton, List } from './styles';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newRepo: '',
      repositories: [],
      loading: false,
      error: false,
    };
  }

  // Carregar o dados do localStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // Salvar os dados no localStorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newRepo, repositories } = this.state;

    try {
      if (newRepo === '')
        throw new Error('Você precisa indicar um repositório');

      const hasRepo = repositories.find(r => r.name === newRepo);

      if (hasRepo) throw new Error('Repositório duplicado');

      const response = await api.get(`repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
        error: false,
      });
    } catch {
      this.setState({
        error: true,
        loading: false,
      });
    }
  };

  render() {
    const { newRepo, loading, repositories, error } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>
        <Form onSubmit={this.handleSubmit} error={error}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>
        <List>
          {repositories.map(repo => (
            <li key={repo.name}>
              <span>{repo.name}</span>
              <Link to={`/repository/${encodeURIComponent(repo.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
