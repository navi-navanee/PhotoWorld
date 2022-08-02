import './message.css'

const Message = ({message,own}) => {
    console.log("replay",message, own);
  return (
    <div className={own ? "message own": "message"}>
        <div className="messageTop">
        <img
          className="messageImg"
          src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
          alt=""
        />
        <p className="messageText">Lorem ipsum dolor sit amet consectetur adipisicing e</p>
      </div>
      <div className="messageBottom">1 hour ago</div>
    </div>
  )
}

export default Message