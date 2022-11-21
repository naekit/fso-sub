import { useSelector, useDispatch } from 'react-redux'
import { resetNotification } from '../reducers/notificationReducer'
import { useEffect } from 'react'

const Notification = () => {
  const notification = useSelector(state => state.notifications)
  const dispatch = useDispatch()

  useEffect(() => {
    const resetTime = setTimeout(() => dispatch(resetNotification()), 5000)
    return () => clearTimeout(resetTime)
  }, [dispatch])
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification