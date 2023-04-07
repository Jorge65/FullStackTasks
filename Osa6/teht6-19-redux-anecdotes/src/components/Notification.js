import { useSelector } from 'react-redux'

const Notification = ( ) => {
  const notification = useSelector(({ anecdotes, filter, notification }) => {
    return notification
  })

  const style = {
    color: 'green',
    fontSize: "20px",
    background: 'lightgrey',
    border: 'solid',
    padding: 10,
    borderWidth: 1
 }
  if (notification  === '') {
    return
  }
  return (
    <div style={style}>
      {notification}
    </div>
)
}

export default Notification