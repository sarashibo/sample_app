import logo from './logo.svg';
import './App.css';
import React, { useEffect } from "react";
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from "@aws-amplify/ui-react";

Amplify.configure(awsconfig);

function App() {
  const [currentUserName, setCurrentUserName] = React.useState("");
  useEffect(() => {
    const init = async () => {
      const currentUser = await Auth.currentAuthenticatedUser();
      setCurrentUserName(currentUser.username);
    }
    init()
  }, []);

  const signOut = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
    document.location.reload();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {currentUserName} login
        </p>
        <button onClick={signOut}>サインアウト</button>
      </header>
    </div>
  );
}

export default withAuthenticator(App);