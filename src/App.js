import './App.css';
import firebase from './firebase';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useEffect, useState } from 'react';
import Header from './Header';
import Form from './Form';
import Goals from './Goals';

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
          newState.push(
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
        <Header />
      <div className="wrapper">
        <Form />
        <section>
          { goals.map((goal) => {
            console.log(goal);
              return ( 
                <Goals goalData={goal} key={goal.id}/>
              )
            }) }
        </section>

        <footer>
          <p>Created with  by Joey Sea at <a href="https://junocollege.com"> Juno College of Technology</a></p>
        </footer>
      </div>
    </div>
  );
}

export default App;