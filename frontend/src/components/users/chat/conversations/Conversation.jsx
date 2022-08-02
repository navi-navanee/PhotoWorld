import './conversation.css'

const Conversation = () => {
    return (
        <div className='conversation'>
            <img
                className="conversationImg"
                src={'https://scontent.fcok7-1.fna.fbcdn.net/v/t1.18169-9/21766748_1143762449057119_6112985010240599269_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=GpFw0R0RQ1YAX_ro0RE&_nc_ht=scontent.fcok7-1.fna&oh=00_AT8w9h2VIZW7L8KD_Mph1T_Y_XzL0xEX5n78n0cBteopSA&oe=630DDE5B'}
                alt="profile_picture"
            />
            <span className="conversationName">Navaneeth</span>
        </div>
    )
}

export default Conversation