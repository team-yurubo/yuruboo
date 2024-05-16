// src/components/CustomChat.tsx
import React, { useEffect, useState, useRef } from 'react';
import { getGatheringId, getMessageLogs, sendMessage } from './api';
import { Box, Button, CircularProgress, Container, TextField, Typography, List, ListItem, ListItemText, Avatar, Paper } from '@mui/material';
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchMessages = async (id: string) => {
    try {
      const messageLog: MessageLog = await getMessageLogs(id);
      setMessages(messageLog.messages);
    } catch (err) {
      setError('Failed to fetch messages');
    }
  };

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const id = await getGatheringId();
        setGatheringId(id);
        await fetchMessages(id);
      } catch (err) {
        setError('Failed to initialize chat');
      } finally {
        setLoading(false);
      }
    };

    initializeChat();

    const interval = setInterval(() => {
      if (gatheringId) {
        fetchMessages(gatheringId);
      }
    }, 5000); // 5秒間隔でメッセージを同期

    return () => clearInterval(interval);
  }, [gatheringId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const message = {
      gathering: gatheringId!,
      body: newMessage,
      sender: user.id, // ログイン中のユーザIDを使用
    };

    try {
      const sentMessage = await sendMessage(message);
      setMessages((prevMessages) => [...prevMessages, { ...sentMessage, sender: user }]);
      setNewMessage('');
    } catch (err) {
      setError('Failed to send message');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      handleSendMessage();
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
          Chat Messages
        </Typography>
        <Paper style={{ height: '60vh', overflowY: 'auto', padding: '16px' }}>
          <List>
            {messages.map((message) => (
              <ListItem key={message.id} style={{ justifyContent: message.sender.id === user.id ? 'flex-end' : 'flex-start' }}>
                {message.sender.id !== user.id && (
                  <Avatar style={{ backgroundColor: message.sender.color, marginRight: 8 }}>
                    {message.sender.user_name[0]}
                  </Avatar>
                )}
                <ListItemText
                  primary={
                    <span style={{ whiteSpace: 'pre-wrap' }}>
                      {message.body}
                    </span>
                  }
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
            <div ref={messagesEndRef} />
          </List>
        </Paper>
        <Box display="flex" mt={2}>
          <TextField
            fullWidth
            variant="outlined"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here"
            multiline
            rows={4}
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
