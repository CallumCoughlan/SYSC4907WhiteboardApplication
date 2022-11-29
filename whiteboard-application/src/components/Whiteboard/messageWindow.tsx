import React, { FC, useState, ReactElement } from 'react';
import { FabricCanvasContainer } from '../../containers';

type Message = {
  text: String;
}

interface FormProps {
  messages?: Message[];
  onSubmitMessage: (submitMessage: Message) => void;
}

const MessageForm = (props: FormProps): ReactElement => {
  //const [newMessage, setNewMessage] = useState<Message>({text: ""});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (event.currentTarget.value != "") {
      props.onSubmitMessage(event.currentTarget.value);
    }
  }

  /*const handleChange = (event : Message) => {
    setNewMessage(event);
  }*/

  return (
    <div className="message-form">
      <form onSubmit={handleSubmit}>
        <input
            name="message-field"
            placeholder="Send a message"
            //onChange={handleChange}
            //ref={node => (setNewMessage({text: node!.value}))} 
        />
      </form>
    </div>
  )
}

interface IProps {
  messages?: Message[]
}

const MessageBox = (props: IProps): ReactElement => {

  /*componentDidUpdate = () => {
    if (this.props.messagesList != prevProps.messagesList) {
      this.messageListEnd.scrollIntoView({ behavior: "smooth" });
    }
  }*/

  return (
    <div>
        
    </div>
  )
}

const MessageWindow = (): ReactElement => {
  const [messages, setMessages] = useState<Message[]>([{text: "Message1"}, {text: "Message2"}]);

  return(
    <div>
      <MessageBox messages={messages} />
      <MessageForm 
        messages={messages}
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