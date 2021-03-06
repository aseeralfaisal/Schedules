import '../styles/styles.css'
import '../styles/about.css'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../redux/slice'
import Sidebar from './Sidebar'
import * as React from 'react'
import themes from './Themes'
// import Loader from "react-loader-spinner";

const List = ({ type }) => {
  const [openSidebar, setOpenSidebar] = React.useState(false)

  const currentTheme = useSelector((state) => state.theme)
  const dispatch = useDispatch()

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth)
    })
    if (windowWidth > 900) setOpenSidebar(false)
  }, [windowWidth])

  // const [loaded, setLoaded] = React.useState(false)

    // const imgLoad = () => {
    //   setLoaded(true)
    // }

  return (
    <>
      {/* {!loaded && <div style={{ background: '#000', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', paddingTop: '25vh' }}>
        <Loader
          type="Puff"
          color="#0055FF"
          height={100}
          width={100}
          timeout={0}
        />
      </div>} */}
      {<div className='bg'>
        <div style={{ opacity: windowWidth > 900 ? 1 : 0 }}>
          <Sidebar />
        </div>
        <div style={{ opacity: openSidebar ? 1 : 0 }}>
          <Sidebar />
        </div>
        <div className='bg-img'>
          <img src={currentTheme} alt='' style={{ width: '100%', height: '110vh', position: 'absolute', top: 0, left: 0, objectFit: 'cover' }} />
        </div>
        <div className='elem-type'>
          <span className='material-icons' onClick={() => setOpenSidebar(!openSidebar)}>
            {openSidebar ? 'menu_open' : 'menu'}
          </span>
        </div>
        <div className='date-view'>
          <h1 style={{ color: 'white' }}>Change theme</h1>
        </div>
        <div className='themes-gallery'>
          {themes.map((theme) => (
            <img
              className='thumbs'
              src={theme}
              alt=''
              style={{
                border: currentTheme === `${theme.slice(0, 4)}.jpg` && '5px solid rgba(255, 255, 255, 0.8)',
              }}
              onClick={() => {
                const skin = `${theme.slice(0, 4)}.jpg`
                dispatch(actions.setTheme(skin))
                console.log(skin)
              }}
            />
          ))}
        </div>
      </div>}
    </>
  )
}

export default List
