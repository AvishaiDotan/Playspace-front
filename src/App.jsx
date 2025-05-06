import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'

import './assets/style/main.scss'

import { store } from './store/store'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Admin } from './pages/Admin'
import { GameAdd } from './pages/GameAdd'
import { GameEdit } from './pages/GameEdit'
import { Game } from './pages/Game'
import { AdminPlayersScores } from './pages/AdminPlayersScores'
import { User } from './pages/User'
import { NavLinks } from './cmps/NavLinks'
import { Statistics } from './pages/Statistics'
import { Settings } from './pages/Settings'
import { BackgroundGlow } from './cmps/BackgroundGlow'

import { scrollService } from './services/scroll.service'
import { ScreenOpenContext } from './contexts/ScreenOpenConext'
import { useToggle } from './customHooks/useToggle'
import { AdminGroups } from './cmps/AdminGroups'
import { AdminPlayers } from './cmps/AdminPlayers'
import { UserMsg } from './cmps/UserMsg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isScreenOpen, setIsScreenOpen] = useToggle(false)

  function onOpenScreen() {
    setIsScreenOpen(true)
    scrollService.disableScroll()
  }

  function onCloseScreen() {
    setIsScreenOpen(false)
    scrollService.enableScroll()
  }
  return (
    <Provider store={store}>
      <Router>
        <ScreenOpenContext.Provider value={{ isScreenOpen, onOpenScreen, onCloseScreen }}>
          <section className={'main-layout ' + (isScreenOpen ? 'screen-open' : '')}>
            <BackgroundGlow />
            <section className="screen" onClick={onCloseScreen}></section>
            {/* <NavLinks /> */}
            <main>
              <UserMsg />
              <div className="main-container">
                <Routes>
                  <Route path="/" element={<Login />} />
                  {/* <Route path="/signup/:gameId/:groupId" element={<Signup />} /> */}
                  <Route path="/signup/:gameId/" element={<Signup />} />
                  <Route path="/game/add/" element={<GameAdd />} />
                  <Route path="/game/edit/:gameId?" element={<GameEdit />} />
                  <Route path="/game/:gameId" element={<Game />} />
                  <Route path="/admin" element={<Admin />} />
                  {/* <Route path="/admin/game/:gameId" element={<AdminGame />} /> */}

                  <Route path="/game/:gameId/scores/edit" element={<AdminPlayersScores />}   >
                    <Route path="/game/:gameId/scores/edit/groups" element={<AdminGroups />} />
                    <Route path="/game/:gameId/scores/edit/players" element={<AdminPlayers />} />
                  </Route>

                  <Route path="/user" element={<User />} />
                  <Route path="/statistics" element={<Statistics />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </div>
            </main>
            {/* <NavLinks /> */}
          </section>
          <ToastContainer />
        </ScreenOpenContext.Provider>
      </Router>
    </Provider >

  )
}

export default App
