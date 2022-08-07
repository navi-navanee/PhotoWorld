import './message.css'
// import {format} from 'timeago.js'impor
import moment from 'moment'

const Message = ({message,own}) => {
    // console.log("replay",message, own);
  return (
    <div className={own ? "message own": "message"}>
        <div className="messageTop">
        <img
          className="messageImg"
          src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
          alt=""
        />
        <p className="messageText">
          {message.text}
          </p>
      </div>
      <div className="messageBottom">{moment(new Date(message.createdAt)).fromNow()}</div>
    </div>
  )
}

export default Message