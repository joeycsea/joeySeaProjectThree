// Goals component
import firebase from './firebase';
import { getDatabase, ref, remove } from 'firebase/database';

const Goals = (props) => {

   // This function will take an argument, which is the ID of the goal we want to remove
   const handleRemoveGoal = (goalId) => {

      const database = getDatabase(firebase);
      const dbRef = ref(database, `/${goalId}`);

      remove(dbRef);
   }

   return (
      <div>
         <section className="goalContainer" key={props.goalData.id}>
            <div className="img">
               <img src={props.goalData.goalImage} alt={props.goalData.goalImageText} />
            </div>
            <div className="wordsFlex">
               <p className="goalText">{props.goalData.goal}</p>
               <p className="goalDate">{props.goalData.date}</p>
            </div>
            
            <button onClick={ () => handleRemoveGoal(props.goalData.id) }>𝗫</button>
         </section>
      </div>
   )
}

export default Goals;