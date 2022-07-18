// Vacation Form component
import { useState } from 'react';
import firebase from './firebase';
import axios from 'axios';
import { getDatabase, ref, push } from 'firebase/database';


const VacationForm = () => {
   // user input state
   const [userVacationInput, setUserVacationInput] = useState('');

   // date variables
   const date = new Date();
   const dateFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
   const vacationDate = date.toLocaleDateString(undefined, dateFormat);

   // This event will handle when user types in the input box
   const handleInputChange = (event) => {
      // Equal to whatever is currently the value of the input field
      setUserVacationInput(event.target.value);
   };

   // This event will handle the user clicks "Let's make it happen!" button
   const handleSubmit = (event) => {
      event.preventDefault();

      fetchApiData();
   };

   // API call to Unsplash API
   const fetchApiData = () => {
      const database = getDatabase(firebase);
      // nesting the data in "Vacation" collection in Firebase
      const dbRef = ref(database, "/vacation");

      axios({
         baseURL: 'https://api.unsplash.com/',
         url: 'search/photos',
         method: "GET",
            params: {
            query: userVacationInput,
            client_id: "4JsHPbJdkTLplp8vd_anVo5PB3JaU14uwMZleFvA1f8",
            }

      }).then ((apiData) => {
         const vacationImage = (apiData.data.results[0].urls.thumb);
         const vacationImageText = (apiData.data.results[0].alt_description);

         // Push the values of: 'userVacationInput' state, current date, vacation image and vacation image text to the database
         push(dbRef, { vacation: userVacationInput, date: vacationDate, vacationImage: vacationImage, vacationImageText: vacationImageText } );
         
         // clear the input
         setUserVacationInput('');

      }).catch((error) => {
         const vacationPlaceholderImage = "https://joeysea-project-three.netlify.app/placeholder2.png";
         const vacationPlaceholderImageText = "Placeholder image";
         
         push(dbRef, { vacation: userVacationInput, date: vacationDate, vacationImage: vacationPlaceholderImage, vacationImageText: vacationPlaceholderImageText });

         setUserVacationInput('');
      });
   };

   return (
      <section>
         <div className="formContainer">
            <form action="submit" method="#" className="form" onSubmit={handleSubmit}>
               <label htmlFor="newVacation">I will travel to... </label>
               <input
                  placeholder="Where to next? ✈️"
                  required
                  type="text" 
                  id="newVacation"
                  maxLength="40" 
                  onChange={handleInputChange} 
                  value={userVacationInput}
               />
            <div>
               <button>Let's go on an adventure!</button>
            </div>
            </form>
         </div>
      </section>
   )
}

export default VacationForm;
