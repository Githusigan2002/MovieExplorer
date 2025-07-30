import './App.css'
import { Header, Footer } from './components'
import { Login, MovieList } from './pages'
import { AllRoutes } from './routes/AllRoutes'

function App() {

  return (
    <div>
      <Header />
      {/* <Login/> */}
      <AllRoutes />
      <Footer />
    </div >
  )
}

export default App
