import React, {useState} from 'react';

export const Chat = () => {
    const [messageValue, setMessageValue] = useState('')
    return (
        <div className="chat">
            <div className="chat-users">
                <b>Online (1):</b>
            <ul>
                <li>Test User</li>
            </ul>
            </div>
            <div  className="chat-message">
                <div className="messages">
                    <div className="message">
                        <p>Lorem ipsum dolor sit amet</p>
                        <div>
                            <span>Test User</span>
                        </div>
                    </div>
                    <div className="message">
                        <p>Lorem ipsum dolor sit amet</p>
                        <div>
                            <span>Test User</span>
                        </div>
                    </div>
                </div>
                <form>
                    <textarea
                    value={messageValue}
                    onChange={(e) => setMessageValue(e.target.value)}
                    className="form-control"
                    rows="3"
                    ></textarea>
                    <button type="button">Send</button>
                </form>
            </div>
        </div>
    );
};

