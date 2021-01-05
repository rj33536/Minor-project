
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import Home from './components/Home';
import Player from './components/Player';
import Category from "./components/Category";
import Header from './components/Header';
import Footer from './components/Footer';
import Upload from "./components/Upload"

import './App.css';
import firebase from "firebase";
import { app } from './utils/firebase';
import React, { createContext, useEffect } from 'react';
const UserContext = createContext({});
//TODO: context api value not updating


function App() {
  const [user, setUser] = React.useState({});
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const myUser = JSON.parse(loggedInUser);

      setUser(myUser);
    }

  }, [])


  const provider = new firebase.auth.GoogleAuthProvider()
  const authWithGoogle = () => {
    firebase.auth().signInWithPopup(provider).then((res) => {
      localStorage.setItem("user", JSON.stringify(res));
      setUser(res);

    }).catch((err) => {
      console.log(err)
    })
  }
  const Logout = () => {
    localStorage.clear();
    setUser(null);
  }
  return (
    <UserContext.Provider value={user}>
      <Router>
        <Header authWithGoogle={authWithGoogle} Logout={Logout} />
        <Switch>

          <Route exact path="/" component={Home}></Route>
          <Route exact path="/upload" component={Upload}></Route>
          <Route exact path="/categories/:category" component={Category}></Route>
          <Route path="/player/:id" component={Player}></Route>

        </Switch>
        <Footer />
      </Router>
    </UserContext.Provider>
  );
}
export default App;
export { UserContext };