// Header component
import{ Link, Outlet } from 'react-router-dom';

const Header = () => {
   return (
      <header>
         <h1 className="lineUp">#Life-Goals</h1>
         <h2 className="lineUp">what do you dream of accomplishing?</h2> 

      <div className="buttonFlex">
         <Link to="/goals"><button>Things I want to do!  🙌 </button></Link>
         <Link to="/vacation"><button>Places I want to go!  🌎 </button></Link>
      </div>
      <Outlet />
      </header>
   )
}

export default Header;