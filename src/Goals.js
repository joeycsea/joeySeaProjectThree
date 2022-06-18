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
         <ul className="goalContainer" >
               {
                  props.goalData.map((goal) => {
                     console.log(goal);
                     return ( 
                        <li className="goalItem" key={goal.id}  >
                           <div>
                              <img src={goal.goalImage} alt={goal.goalImageText} />
                           </div>
                           <div className="wordsFlex">
                              <p className="goalText">{goal.goal}</p>
                              <p className="goalDate">{goal.date}</p>
                           </div>
                           <button onClick={ () => handleRemoveGoal(goal.id)}>𝗫</button>
                        </li>
                     )
                  })
               }
            </ul>
      </div>
   )
}

export default Goals;