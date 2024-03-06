import Layout from './components/Layout/Layout';
import {Route, Routes} from 'react-router-dom';


const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/admin" element={(<h2>Admin</h2>)} />
          <Route path="*" element={<h4>Oops! Page not found...</h4>}/>
        </Routes>
      </Layout>
    </>
  );
};

export default App;
