// Form component
import { useState } from 'react';
import firebase from './firebase';
import axios from 'axios';
import { getDatabase, ref, push } from 'firebase/database';

const Form = () => {

   const [userInput, setUserInput] = useState('');

   // date variables
   const date = new Date();
   const dateFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
   const goalDate = date.toLocaleDateString(undefined, dateFormat);

   // This event will handle when user types in the input box
   const handleInputChange = (event) => {
      // Equal to whatever is currently the value of the input field
      setUserInput(event.target.value);
   } 

   // This event will handle the user clicking "Let's Make it Happen!" button
   const handleSubmit = (event) => {
      event.preventDefault();

      // Error handling if user input is empty
      if (userInput == '') {
         alert("Please enter a goal!")
      } else {
         fetchApiData();
      }
   }

   // API call to Unsplash API
   const fetchApiData = () => {
      axios ({
         baseURL: 'https://api.unsplash.com/',
         url: 'search/photos',
         method: "GET",
            params: {
            query: userInput,
            client_id: "4JsHPbJdkTLplp8vd_anVo5PB3JaU14uwMZleFvA1f8",
            }

      }) .then ((apiData) => {
         
         const goalImage = (apiData.data.results[0].urls.thumb);
         const goalImageText = (apiData.data.results[0].alt_description);
         const database = getDatabase(firebase);
         const dbRef = ref(database);

         // Push the value of 'userInput' state and current date to the database
         push(dbRef, { goal: userInput, date: goalDate, goalImage: goalImage, goalImageText: goalImageText } );
         
         // clear the input
         setUserInput('');
      }) .catch((error) => {
         console.log(error);
         setUserInput('');
      });
   };

   return (
      <div>
         <form action="submit" method="#" className="form">
            <label htmlFor="newGoal">What do you dream of doing?</label>
            <input 
               type="text" 
               id="newGoal" 
               onChange={handleInputChange} 
               value={userInput}
            />

            <button onClick={handleSubmit}>Let's Make It Happen!</button>
         </form>
      </div>
   )
}

export default Form;