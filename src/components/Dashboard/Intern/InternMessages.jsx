import React, { useEffect, useState } from 'react';

import './InternMessages.css';

import API from '../../../api/MainApi';

const InternMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user_id = localStorage.getItem('user_id')

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        
        // Sending the intern_id in the body of the POST request using fetch
        const response = await fetch(API.GET_INTERN_MESSAGES, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ intern_id: user_id }),
        });

        // Check if the response is OK (status 200-299)
        if (!response.ok) {
          throw new Error('Error fetching messages.');
        }

        const data = await response.json();
        setMessages(data.messages);  // Setting the response data (messages)
      } catch (err) {
        setError(err.message || 'Error fetching messages.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) {
    return <p>Loading messages...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

return (
  <div className="intern-messages-container">
    {messages.length === 0 ? (
      <p>💬 You currently have no messages.</p>
    ) : (
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <strong>
              {message.subject}
              <small>{new Date(message.sent_on).toLocaleString()}</small>
            </strong>
            <p>{message.body}</p>
          </li>
        ))}
      </ul>
    )}
  </div>
);
};

export default InternMessages;
