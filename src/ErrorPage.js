// Error page component
import{ Link } from 'react-router-dom';

const ErrorPage = () => {
   return(
      <section className="errorSection">

         <h2>404 Page</h2>
         <p>Not all those who wander are lost, but you seem to be looking for a page that doesn't exist.</p>


         <Link to={`/`}>
            <button>Go Back Home 🏡</button>
         </Link>

      </section>
   )
}

export default ErrorPage;