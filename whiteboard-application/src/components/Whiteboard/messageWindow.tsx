import React, { FC, useState, ReactElement } from 'react';

type Message = {
  text: String;
}

interface SubmitProps {
  onSubmitMessage: (submitMessage: Message) => void;
}

const MessageForm = (props: SubmitProps): ReactElement => {
  const [newMessage, setNewMessage] = useState({text: ""});  

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (newMessage.text != "") {
      props.onSubmitMessage(newMessage);
      setNewMessage({text: ""});
    }
  }

  return (
    <div className="message-form">
      <form onSubmit={handleSubmit}>
        <input
            id="message-field"
            name="message-field"
            placeholder="Send a message"
            type="text"
            onChange={event => setNewMessage({text: event.target.value})}
            value={newMessage.text}
        />
      </form>
    </div>
  )
}

interface MessageProps {
  messages: Message[]
}

const MessageBox = (props: MessageProps): ReactElement => {
  const messagesList = props.messages.map((message, index) =>
    <li key={index}>{message.text}</li>
  )

  return (
    <div style={{overflowY: 'scroll', maxHeight: '95%', minHeight: '95%', overflow: 'auto', marginLeft: '2%'}}>
      <ul>{messagesList}</ul>
    </div>
  )
}

const MessageWindow = (): ReactElement => {
  const [messages, setMessages] = useState<Message[]>([{text: "Message1"}, {text: "Message2"}]);

  return(
    <div style={{marginTop: '3.2%', height: '103.2vh', borderRight: "solid", borderTop: 'solid', 
    borderBottom: 'solid', display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
      <MessageBox messages={messages} />
      <MessageForm 
        onSubmitMessage={(newMessage: Message) => {
          setMessages(current=> [...current, newMessage])
        }}
      />
    </div>
  );
}

const Container: FC = () => {
  return <MessageWindow />;
};

export default Container;