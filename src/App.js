import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { render } from 'react-dom';

//Components
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shoppage.component.jsx';
import SignInSignUpPage from './pages/signin/signin-signout-page.jsx';
import Header from './components/header/header.component.jsx';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';


//app is being converted from a functional component to a class component so that access to state 
//can occur
//function App() { <==== no longer applies because this is a functional component
class App extends React.Component {
  //constructor and super give access to this.state of a prop, in this case currentUser
 
  unsubscribeFromAuth = null; 

  componentDidMount() {
    const {setCurrentUser} = this.props;
    //only want to know when the authentication state has changed without having to manually fetch
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //createUserProfileDocument(user); //load user data into Google Firestore Database

      //console.log(user);
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            });
          });
        }
       
        setCurrentUser(userAuth);
      
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    //return goes inside a render when using a class function
  return (
    <div>
      <Header/>
        <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/signin' render={() => this.props.currentUser ? 
          <Redirect to='/' />
          :
          <SignInSignUpPage/>
        }
        />
        </Switch>
    </div>
  );
}}



const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps )(App);


