import React, { useEffect, useState } from 'react';
import { getGatheringId, getMessages } from './api';
import { Box, CircularProgress, Container, Typography, List, ListItem, ListItemText } from '@mui/material';

interface Message {
  id: string;
  gathering: string;
  body: string;
  sender: number;
  created_at: string;
}

interface MessageLog {
  id: string;
  messages: Message[];
}

const CustomChat: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const gatheringId = await getGatheringId();
        const messages = await getMessages(gatheringId);
        setMessages(messages);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch messages');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);


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
            <ListItem key={message.id}>
              <ListItemText primary={message.body} secondary={new Date(message.created_at).toLocaleString()} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default CustomChat;
