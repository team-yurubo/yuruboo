// src/components/CustomChat.tsx
import React, { useEffect, useState, useRef } from 'react';
import { getGatheringId, getMessageLogs, sendMessage } from './api';
import { Box, Button, CircularProgress, Container, TextField, Typography, List, ListItem, ListItemText, Avatar, Paper, Snackbar, Alert } from '@mui/material';
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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [newMessageAlert, setNewMessageAlert] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<Message[]>([]); // UseRef to keep track of current messages

  const fetchMessages = async (id: string) => {
    try {
      const messageLog: MessageLog = await getMessageLogs(id);
      const newMessages = messageLog.messages.filter(msg => !messagesRef.current.some(existingMsg => existingMsg.id === msg.id));

      if (messagesRef.current.length > 0 && newMessages.some(msg => msg.sender.id !== user.id)) {
        setNewMessageAlert(true);
      }

      messagesRef.current = messageLog.messages; // Update the messagesRef with the new messages
      setMessages(messageLog.messages);
    } catch (err) {
      setError('Failed to fetch messages');
    }
  };

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const id = await getGatheringId(user.id);
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

  const handleSendMessage = async () => {
    if (newMessage.length > 1023) {
      setSnackbarOpen(true);
      return;
    }

    if (!newMessage.trim()) return;

    const message = {
      gathering: gatheringId!,
      body: newMessage,
      sender: user.id, // ログイン中のユーザIDを使用
    };

    try {
      const sentMessage = await sendMessage(message);
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, { ...sentMessage, sender: user }];
        messagesRef.current = updatedMessages; // Update the messagesRef with the new message
        return updatedMessages;
      });
      setNewMessage('');
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 0); // 自分のメッセージ送信時のみ自動スクロール
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

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleNewMessageAlertClose = () => {
    setNewMessageAlert(false);
  };

  const handleNewMessageAlertClick = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    setNewMessageAlert(false);
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
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          Message cannot exceed 1023 characters.
        </Alert>
      </Snackbar>
      <Snackbar open={newMessageAlert} autoHideDuration={3000} onClose={handleNewMessageAlertClose} onClick={handleNewMessageAlertClick}>
        <Alert onClose={handleNewMessageAlertClose} severity="info" sx={{ width: '100%' }}>
          New message received.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CustomChat;
