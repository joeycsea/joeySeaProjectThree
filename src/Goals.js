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
         <li key={props.goalData.id} className="goalContainer">
            <p className="goalText">{props.goalData.goal}</p>
            <p className="goalDate">{props.goalData.date}</p>
            <img src={props.goalData.goalImage} alt={props.goalData.goalImageText} />
            <button onClick={ () => handleRemoveGoal(props.goalData.id) }>Remove Goal</button>
         </li>
      </div>
   )
}

export default Goals;