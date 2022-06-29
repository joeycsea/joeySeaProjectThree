// Goals component
import firebase from './firebase';
import { getDatabase, ref, remove } from 'firebase/database';

const Goals = (props) => {

   const { goalData } = props
   
   // This function will take an argument, which is the ID of the goal we want to remove
   const handleRemoveGoal = (goalId) => {

      const database = getDatabase(firebase);
      const dbRef = ref(database, `/goals/${goalId}`);
      
      remove(dbRef);
   }


   return (
      <section>
         <ul className="goalContainer" >
            {
               goalData.map((goal) => {
                  return ( 
                     <li className="goalItem" key={goal.id}>
                        <div>
                           <img src={goal.goalImage} alt={goal.goalImageText} />
                        </div>
                        <div className="wordsFlex">
                           <p className="goalText">{goal.goal}</p>
                           <p className="goalDate">{goal.date}</p>
                        </div>
                        <button onClick={ () => handleRemoveGoal(goal.id)}>x</button>
                     </li>
                  )
               })
            }
         </ul>
      </section>
   )
}

export default Goals;