// src/components/CustomChat.tsx
import React, { useEffect, useState } from 'react';
import { getGatheringId, getMessageLogs, sendMessage } from './api';
import { Box, Button, CircularProgress, Container, TextField, Typography, List, ListItem, ListItemText, Avatar } from '@mui/material';
import { useAuthContext } from '../../auth/AuthContext';

interface User {
  id: number;
  email: string;
  user_name: string;
  is_staff: boolean;
  is_active: boolean;
  profile: string;
  color: string;
}

interface Message {
  id: string;
  gathering: string;
  body: string;
  sender: User;
  created_at: string;
}

interface MessageLog {
  id: string;
  messages: Message[];
}

const CustomChat: React.FC = () => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [gatheringId, setGatheringId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const id = await getGatheringId();
        setGatheringId(id);
        const messageLog: MessageLog = await getMessageLogs(id);
        setMessages(messageLog.messages);
      } catch (err) {
        setError('Failed to fetch messages');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  sendMessage ({gathering: "00000000-0000-0000-0000-000000000001", body: "Hello, World!", sender: 1});

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const message = {
      gathering: gatheringId!,
      body: newMessage,
      sender: user.id, // ログイン中のユーザIDを使用
    };

    try {
      const sentMessage = await sendMessage(message);
      setMessages((prevMessages) => [...prevMessages, sentMessage]);
      setNewMessage('');
    } catch (err) {
      setError('Failed to send message');
    }
  };

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          CustomChat Messages
        </Typography>
        <List>
          {messages.map((message) => (
            <ListItem key={message.id} style={{ justifyContent: message.sender.id === user.id ? 'flex-end' : 'flex-start' }}>
              {message.sender.id !== user.id && (
                <Avatar style={{ backgroundColor: message.sender.color, marginRight: 8 }}>
                  {message.sender.user_name[0]}
                </Avatar>
              )}
              <ListItemText
                primary={message.body}
                secondary={`${message.sender.user_name} - ${new Date(message.created_at).toLocaleString()}`}
                style={{ textAlign: message.sender.id === user.id ? 'right' : 'left' }}
              />
              {message.sender.id === user.id && (
                <Avatar style={{ backgroundColor: message.sender.color, marginLeft: 8 }}>
                  {message.sender.user_name[0]}
                </Avatar>
              )}
            </ListItem>
          ))}
        </List>
        <Box display="flex" mt={2}>
          <TextField
            fullWidth
            variant="outlined"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here"
          />
          <Button variant="contained" color="primary" onClick={handleSendMessage} disabled={!newMessage.trim()}>
            Send
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CustomChat;
