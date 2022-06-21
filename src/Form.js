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

   // This event will handle the user clicking "Let's make it happen!" button
   const handleSubmit = (event) => {
      event.preventDefault();

      fetchApiData();
   }

   // API call to Unsplash API
   const fetchApiData = () => {
         
         const database = getDatabase(firebase);
         const dbRef = ref(database);

      axios({
         baseURL: 'https://api.unsplash.com/',
         url: 'search/photos',
         method: "GET",
            params: {
            query: userInput,
            client_id: "4JsHPbJdkTLplp8vd_anVo5PB3JaU14uwMZleFvA1f8",
            }

      }).then ((apiData) => {
         const goalImage = (apiData.data.results[0].urls.thumb);
         const goalImageText = (apiData.data.results[0].alt_description);

         // Push the values of: 'userInput' state, current date, goal image and goal image text to the database
         push(dbRef, { goal: userInput, date: goalDate, goalImage: goalImage, goalImageText: goalImageText } );
         
         // clear the input
         setUserInput('');

      }).catch((error) => {
         const goalImage = "https://joeysea-project-three.netlify.app/placeholder2.png";
         const goalImageText = "Placeholder image";
         
         push(dbRef, { goal: userInput, date: goalDate, goalImage: goalImage, goalImageText: goalImageText } );

         setUserInput('');
      });
   };

   return (
      <div className="formContainer">
         <form action="submit" method="#" className="form" onSubmit={handleSubmit}>
            <label htmlFor="newGoal" >I can and I will... </label>
            <input
               placeholder="Please enter your goal"
               required  
               type="text" 
               id="newGoal"
               maxLength="40" 
               onChange={handleInputChange} 
               value={userInput}
            />
         <div>
            <button>Let's make it happen!</button>
         </div>
         </form>
      </div>
   )
}

export default Form;