import React from "react";
import Stories from "./pages/stories";
import Products from "./pages/products";
import { ApolloClient } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { KeystoneProvider } from '@keystonejs/apollo-helpers';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:3000/admin/api'}),
  cache: new InMemoryCache(),
});


export default function App() {
  return (
    <ApolloProvider client={client}>
      <KeystoneProvider>
        <Router>
          <div>
            <Navbar bg="dark" variant="dark">
              <Navbar.Brand href="/">Nav</Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/stories">Stories</Nav.Link>
                <Nav.Link href="/topics">Topics</Nav.Link>
                <Nav.Link href="/products">Products</Nav.Link>
                <LinkContainer to="/about"><NavItem>About</NavItem></LinkContainer>
              </Nav>
            </Navbar>

            <Switch>
              <Route path="/stories">
                <Stories />
              </Route>
              <Route path="/products">
                <Products />
              </Route>
              <Route path="/topics">
                <Topics />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      </KeystoneProvider>
    </ApolloProvider>
  );
}

function Home() {
  return <h1>HOME</h1>
}

function Topics() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}