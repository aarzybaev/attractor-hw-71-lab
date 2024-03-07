import Layout from './components/Layout/Layout';
import {Route, Routes} from 'react-router-dom';
import Dishes from './components/Dishes/Dishes';
import Orders from './containers/Orders';
import Admin from './containers/Admin';
import DishNew from './containers/DishNew';
import DishEdit from './containers/DishEdit';


const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/admin" element={(<Admin />)} />
          <Route path="/admin/dishes" element={(<Dishes />)} />
          <Route path="/admin/dishes/new-dish" element={(<DishNew />)} />
          <Route path="/admin/dishes/edit/:id" element={(<DishEdit />)} />
          <Route path="/admin/orders" element={(<Orders />)} />
          <Route path="*" element={<h4>Oops! Page not found...</h4>}/>
        </Routes>
      </Layout>
    </>
  );
};

export default App;
