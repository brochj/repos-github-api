import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Container from '../../components/Container';
import api from '../../services/api';

import { Loading, Owner, IssueList, FilterList, Pages } from './styles';

export default class Repository extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repository: {},
      issues: [],
      loading: true,
      page: 1,
      filters: [
        { state: 'all', label: 'All issues', active: true },
        { state: 'open', label: 'open issues', active: false },
        { state: 'closed', label: 'closed issues', active: false },
      ],
      filterIndex: 0,
    };
  }

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),

      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  handleFilterClick = async filterIndex => {
    await this.setState({ filterIndex });
    this.loadIssues();
  };

  loadIssues = async () => {
    const { match } = this.props;
    const { filters, filterIndex, page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const response = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filters[filterIndex].state,
        per_page: 5,
        page,
      },
    });

    this.setState({ issues: response.data });
  };

  handlePage = async action => {
    const { page } = this.state;
    await this.setState({
      page: action === 'back' ? page - 1 : page + 1,
    });
    this.loadIssues();
  };

  render() {
    const {
      repository,
      issues,
      loading,
      filters,
      page,
      filterIndex,
    } = this.state;

    if (loading) {
      return <Loading> Loading </Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueList>
          <FilterList active={filterIndex}>
            {filters.map((filter, index) => (
              <button
                key={filter.state}
                type="button"
                onClick={() => this.handleFilterClick(index)}
              >
                {filter.label}
              </button>
            ))}
          </FilterList>

          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>

        <Pages>
          <button
            type="button"
            disabled={page === 1}
            onClick={() => this.handlePage('back')}
          >
            Previous
          </button>
          <span>Page {page}</span>
          <button type="button" onClick={() => this.handlePage('next')}>
            Next
          </button>
        </Pages>
      </Container>
    );
  }
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
    }),
  }).isRequired,
};
