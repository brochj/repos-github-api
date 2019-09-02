import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-self: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
    font-weight: bold;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.5;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;
    margin-top: 10px;
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #eee;
  }

  div {
    flex: 1;
    margin-left: 15px;

    strong {
      font-size: 16px;

      a {
        text-decoration: none;
        color: #333;

        &:hover {
          color: #7159c1;
        }
      }

      span {
        background: #eee;
        color: #333;
        border-radius: 2px;
        font-size: 12px;
        font-weight: 600;
        margin-left: 10px;
        height: 20px;
        line-height: 15px;
        padding: 3px 4px;
      }
    }

    p {
      margin-top: 5px;
      font-size: 12px;
      color: #999;
    }
  }
`;

export const FilterList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    margin-left: 10px;
    margin: 20px;
    background: #7159c1;
    border-style: none;
    color: #f2f2f2;
    font-size: 16px;
    padding: 5px 10px;
    border-radius: 5px;
    opacity: 0.5;
    &:nth-child(${props => props.active + 1}) {
      background: #7159c1;
      color: white;
      opacity: 1;
    }
  }
`;

export const Pages = styled.div`
  padding-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  button {
    transition: opacity 0.25s ease-out;
    border-radius: 5px;
    outline: 0;
    border: 0;
    padding: 8px 12px;
    background: #7159c1;
    color: #f2f2f2;
    &:disabled {
      cursor: not-allowed;
      opacity: 0.35;
    }
  }
`;
