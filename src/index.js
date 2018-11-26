import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { ApolloProvider, Query } from "react-apollo";

import "./styles.css";

const client = new ApolloClient({
  uri: "https://api-useast.graphcms.com/v1/cjoyhfbw65np501dgnvekr8ew/master"
});

client
  .query({
    query: gql`
      {
        userses {
          username
          posts {
            title
            body
          }
        }
      }
    `
  })
  .then(result => console.log(result));

const Users = () => (
  <Query
    query={gql`
      {
        userses {
          username
          posts {
            title
            body
          }
        }
      }
    `}>
    {({ loading, err, data }) => {
      if (loading) return <p>Loading...</p>;
      if (err) return <p>Error :(</p>;

      return data.userses.map(user => {
        return (
          <div>
            <p>{user.username}</p>
            <p>
              {user.posts.map(post => {
                return (
                  <div>
                    <p>{post.title}</p>
                    <p>{post.body}</p>
                  </div>
                );
              })}
            </p>
          </div>
        );
      });
    }}
  </Query>
);

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <Users />
    </div>
  </ApolloProvider>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
