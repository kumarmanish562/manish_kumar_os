import { useState } from 'react';

const API_URL = "http://127.0.0.1:5000/execute";

export const useTerminal = () => {
  const [history, setHistory] = useState([
    { type: 'text', content: 'Welcome to ManishOS v1.0. \nType "help" to see available commands.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const executeCommand = async () => {
    if (!input.trim()) return;

    const cmd = input;
    setInput(''); // Clear input box

    // 1. Add command to history immediately
    setHistory(prev => [...prev, { type: 'command', content: cmd }]);

    // 2. Handle client-side 'clear'
    if (cmd.toLowerCase() === 'clear') {
      setHistory([]);
      return;
    }

    setLoading(true);

    // 3. Fetch from Python Backend
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: cmd })
      });
      const data = await res.json();
      setHistory(prev => [...prev, data]);
    } catch (err) {
      setHistory(prev => [...prev, { type: 'error', content: 'Server connection failed.' }]);
    } finally {
      setLoading(false);
    }
  };

  return { history, input, setInput, executeCommand, loading };
};