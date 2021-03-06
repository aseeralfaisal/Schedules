import '../styles/styles.css'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../redux/slice'
import Sidebar from './Sidebar'
import * as React from 'react'
import Calendar from 'react-calendar'
import '../styles/calendar.css'
import { useLocation, useHistory } from 'react-router'
import Loader from "react-loader-spinner";

const List = ({ type }) => {
  const [todo, setTodo] = React.useState('')
  const [openSidebar, setOpenSidebar] = React.useState(false)

  const todoInputRef = React.useRef()
  const location = useLocation().pathname
  const history = useHistory()

  const todos = useSelector((state) => state.todosList)
  const completedTodos = useSelector((state) => state.completed)
  const searchInput = useSelector((state) => state.searchInput)
  const dispatch = useDispatch()
  const date = new Date()
  const currentTheme = useSelector((state) => state.theme)

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const [showCalendar, setShowCalendar] = React.useState(false)
  const [dateVal, setDateVal] = React.useState(date)

  const day = dateVal.getDay()
  const dt = dateVal.getDate()
  const month = dateVal.getMonth()
  const year = dateVal.getFullYear()

  const dateValue = [{ day, month, dt, year }]
  // const WrapperRef = React.useRef(null);

  // console.log(dateValue)

  // React.useEffect(() => {
  //   window.addEventListener('click', (e) => {
  //     if (e.target.getAttribute('data') !== 'calendar-icon') {
  //       if (e.target.className !== 'calendar' || '') {
  //         setShowCalendar(false)
  //       } else setShowCalendar(true)
  //     }
  //   })
  // }, [])

  // React.useEffect(() => {
  //   window.addEventListener('click', (e) => {
  //     if (e.target.className !== 'calendar-icon') {
  //       console.log(!WrapperRef.current.contains(e.target)) 
  //     }
  //   })
  // }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    setShowCalendar(false)
    const itodo = { todo: todo, date: dateValue[0] }
    todo !== '' && dispatch(actions.pushTodo(itodo))
    setTodo('')
    setDateVal(new Date())
  }
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth)
    })
    if (windowWidth > 900) setOpenSidebar(false)
  }, [windowWidth])

  React.useEffect(() => {
    if (location === '/') {
      todoInputRef?.current.focus()
    }
  }, [location])

  const [bgloaded, setBgloaded] = React.useState(true)

  return (
    <>
      {!bgloaded && <div style={{ background: '#000', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', paddingTop: '25vh' }}>
        <Loader
          type="Puff"
          color="#0055FF"
          height={100}
          width={100}
          timeout={0} //3 secs
        />
      </div>}
      {bgloaded && <div className='bg'>
        {(
          <div className='calendar' style={{ display: showCalendar ? 'flex' : 'none' }}>
            <Calendar onChange={setDateVal} value={dateVal} onClickDay={(day) => {
              setShowCalendar(false)
            }} />
          </div>
        )}
        <div style={{ display: windowWidth > 1026 ? 'flex' : 'none' }}>
          <Sidebar />
        </div>
        <div style={{ display: openSidebar ? 'flex' : 'none' }}>
          <Sidebar />
        </div>
        <div className='bg-img'>
          <img onLoad={() => setBgloaded(true)} src={currentTheme} alt='' style={{ width: '100vw', objectFit: 'cover', height: '110vh', position: 'absolute', top: 0, left: 0 }} />
        </div>
        <div className='elem-type'>
          <span className='material-icons' onClick={() => setOpenSidebar(!openSidebar)} >
            {openSidebar ? 'menu_open' : 'sort'}
          </span>
        </div>
        <div className='date-view'>
          <h1 style={{ color: 'white' }}>{`${dayNames[date.getDay()]}, ${date.toDateString().slice(4, 11)}`}</h1>
        </div>
        {type !== 'completed' ? (
          <div className='todo-list-parent'>
            {todos
              ?.filter((todo) =>
                searchInput !== '' ? todo.todo.toLowerCase().includes(searchInput.toLowerCase()) : todo
              )
              .map((todo, idx) => {
                return (
                  <div
                    key={idx}
                    className='todo-list-child'
                    onClick={() => {
                      dispatch(actions.pushCompleted(todo))
                      dispatch(actions.completedTodo(todo))
                    }}>
                    <span className='material-icons'></span>
                    <div className='todo-list'>
                      <h4 style={{ textTransform: 'capitalize', marginLeft: 14 }}>{todo.todo}</h4>
                      <div className='calendar-icon'>
                        <span
                          className='material-icons'
                          style={{
                            color:
                              todo.date.month < date.getMonth() ||
                                todo.date.dt < date.getDate() ||
                                todo.date.year < date.getFullYear()
                                ? '#FF3F00'
                                : 'white',
                          }}></span>
                      </div>
                      <label
                        style={{
                          fontSize: 12,
                          marginLeft: 70,
                          color:
                            todo.date.month < date.getMonth() ||
                              todo.date.dt < date.getDate() ||
                              todo.date.year < date.getFullYear()
                              ? '#FF3F00'
                              : 'white',
                          fontWeight:
                            todo.date.month < date.getMonth() ||
                              todo.date.dt < date.getDate() ||
                              todo.date.year < date.getFullYear()
                              ? 'bold'
                              : '500',
                        }}>
                        {dayNames[todo.date.day].slice(0, 3)}, {monthNames[todo.date.month].slice(0, 3)} {todo.date.dt},{' '}
                        {todo.date.year}
                      </label>
                    </div>
                  </div>
                )
              })}
          </div>
        ) : (
          <div className='todo-list-parent'>
            {completedTodos ? (
              completedTodos
                .filter((todo) =>
                  searchInput !== '' ? todo.todo.toLowerCase().includes(searchInput.toLowerCase()) : todo
                )
                .map((todo, idx) => {
                  return (
                    <div
                      key={idx}
                      className='todo-list-child'
                      onClick={() => {
                        console.log(todo)
                      }}>
                      {type !== 'completed' ? (
                        <span className='material-icons'></span>
                      ) : (
                        <div className='completed-task'>
                          <span className='material-icons'></span>
                        </div>
                      )}
                      <div className='todo-list'>
                        <h4
                          style={{
                            textTransform: 'capitalize',
                            marginLeft: 14,
                          }}>
                          {todo.todo}
                        </h4>
                        <div className='calendar-icon'>
                          <span className='material-icons'></span>
                        </div>
                        <label style={{ fontSize: 12, marginLeft: 70 }}>
                          {dayNames[todo.date.day].slice(0, 3)}, {monthNames[todo.date.month].slice(0, 3)}{' '}
                          {todo.date.dt}, {todo.date.year}
                        </label>
                      </div>
                    </div>
                  )
                })
            ) : (
              <></>
            )}
          </div>
        )}

        {type !== 'completed' && (
          <div>
            {todos.length < 1 && (
              <div className='showcase' style={{ opacity: todos.length < 1 ? 1 : 0, transition: 'ease-in-out 0.2s' }}>
                <div className='showcase-middle'>
                  <img src='/showcase.png' alt='' />
                  <h1>Add task to your day</h1>
                </div>
              </div>
            )}
          </div>
        )}

        {type !== 'completed' ? (
          <form className='textbox' onSubmit={(e) => onSubmit(e)}>

            <span
              data='calendar-icon'
              className='material-icons'
              onClick={() => (!showCalendar ? setShowCalendar(true) : setShowCalendar(false))}>
              event_available
            </span>

            <input
              className='todo-input'
              type='text'
              placeholder=' + Add a task'
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              ref={todoInputRef}
            />
          </form>
        ) : (
          <form className='textbox' onSubmit={(e) => onSubmit(e)}>
            <span
              data='calendar-icon'
              className='material-icons'
              onClick={() => (!showCalendar ? setShowCalendar(true) : setShowCalendar(false))}>
              event_available
            </span>

            <input
              className='todo-input'
              type='text'
              placeholder=' + Add a task'
              value={todo}
              // onChange={(e) => setTodo(e.target.value)}
              onClick={() => history.push('/')}
            />
          </form>
        )}
      </div>
      }
    </>
  )
}

export default List
