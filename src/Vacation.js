// Vacation component
import firebase from './firebase';
import { getDatabase, ref, remove } from 'firebase/database';

const Vacation = (props) => {

   const { vacationData } = props
   
   // This function will take an argument, which is the ID of the vacation we want to remove
   const handleRemoveVacation = (vacationId) => {

      const database = getDatabase(firebase);
      const dbRef = ref(database, `/vacation/${vacationId}`);
      
      remove(dbRef);
   }

   return (
      <section>
         <ul className="goalContainer" >
            {
               vacationData.map((vacation) => {
                  return ( 
                     <li className="goalItem" key={vacation.id}>
                        <div>
                           <img src={vacation.vacationImage} alt={vacation.vacationImageText} />
                        </div>
                        <div className="wordsFlex">
                           <p className="goalText">{vacation.vacation}</p>
                           <p className="goalDate">{vacation.date}</p>
                        </div>
                        <button onClick={ () => handleRemoveVacation(vacation.id)}>x</button>
                     </li>
                  )
               })
            }
         </ul>
      </section>
   )
}

export default Vacation;
