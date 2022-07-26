import './App.css';
import firebase from './firebase';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Form from './Form';
import Goals from './Goals';
import Vacation from './Vacation';
import VacationForm from './VacationForm';
import ErrorPage from './ErrorPage';
import Footer from './Footer';

function App() {
  //  ==============  Life Goals ==================
  const [goals, setGoals] = useState([]);

  // On initial render/component mount/page load:
  useEffect (() => {

    const database = getDatabase(firebase)
    const dbRef = ref(database, "/goals")
    
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


  // ==============  Vacation Goals ==================
  const [vacation, setVacation] = useState([]);

  // On initial render/component mount/page load:
  useEffect (() => {

    const database = getDatabase(firebase)
    const dbRef = ref(database, "/vacation")
    
    onValue(dbRef, (response) => {
      // Creating a new variable to store the new state
      const newVacationState = [];
      const data = response.val();

      // Data is an object, so we need to iterate through using a for-in loop to access each vacation name and turn it into an array:
        for(let key in data) {
          newVacationState.unshift(
            {
            id: key,
            vacation: data[key].vacation,
            date: data[key].date,
            vacationImage: data[key].vacationImage,
            vacationImageText: data[key].vacationImageText
            })
        }
        setVacation(newVacationState);
    });
  }, []);


  return (
    <div className="App">
      <div className="wrapper">

        <Routes>
          <Route path="/" element={  <Header /> } />

          <Route path="/goals" element={ 
            <>
              <Header />
              <Form /> 
              <Goals goalData={goals} />     
            </> }>
          </Route>

          <Route path="/vacation" element={
            <>
              <Header />
              <VacationForm />
              <Vacation vacationData={vacation} />
            </> }>
          </Route>

          <Route path='/*' element={<ErrorPage/>}/>
        </Routes>

      </div>
      <Footer />
    </div>
  );
}

export default App;