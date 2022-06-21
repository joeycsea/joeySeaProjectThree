import './App.css';
import firebase from './firebase';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useEffect, useState } from 'react';
import Header from './Header';
import Form from './Form';
import Goals from './Goals';
import Footer from './Footer';

function App() {

  const [goals, setGoals] = useState([]);

  // On initial render/component mount/page load:
  useEffect (() => {

    const database = getDatabase(firebase)
    const dbRef = ref(database)
    
    onValue(dbRef, (response) => {
      // Creating a new variable to store the new state
      const newState = [];
      const data = response.val();

      // Data is an object, so we need to iterate through using a for-in loop to access each goal name and turn it into an array:
        for(let key in data) {
          newState.unshift(
            {
            id: key,
            goal: data[key].goal,
            date: data[key].date,
            goalImage: data[key].goalImage,
            goalImageText: data[key].goalImageText
            })
        }
        setGoals(newState);
    });
  }, []);


  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <Form />
        <Goals goalData={goals} />
      </div>
      <Footer />
    </div>
  );
}

export default App;