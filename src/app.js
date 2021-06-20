import React from 'react';
import Header from './header';
import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';
import MyFavoriteBooks from './myFavoriteBooks';
import Profile from './profile';
import Login from './login';

class App extends React.Component {

  render() {
    const { isAuthenticated } = this.props.auth0;

    

    // console.log('app', this.props)
    return(
      <>
        <Router>
          {/* <IsLoadingAndError> */}
            <Header />
              <Switch>
                <Route exact path="/">
                  {/* TODO: if the user is logged in, render the `MyFavoriteBooks` component, if they are not, render the `Login` component */}
                  {(isAuthenticated?<MyFavoriteBooks/>:<Login/>)}
                </Route >
                <Route exact path="/profile">
                {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
                 <Profile/> 
                </Route >

              </Switch>
            <Footer />
          {/* </IsLoadingAndError> */}
        </Router>
      </>
    )
  }
}

export default withAuth0(App);
