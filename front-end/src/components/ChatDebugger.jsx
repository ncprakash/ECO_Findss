import React, { useState, useEffect } from 'react';
import { socket } from '../socket.js';

const ChatDebugger = () => {
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [logs, setLogs] = useState([]);
  const [testMessage, setTestMessage] = useState('');
  const [roomId, setRoomId] = useState('test_room');
  const [messages, setMessages] = useState([]);

  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
    console.log(`[Chat Debug] ${message}`);
  };

  useEffect(() => {
    // Socket event listeners
    const handleConnect = () => {
      setConnectionStatus('Connected');
      addLog('✅ Socket connected successfully');
    };

    const handleDisconnect = () => {
      setConnectionStatus('Disconnected');
      addLog('❌ Socket disconnected');
    };

    const handleConnectError = (error) => {
      setConnectionStatus('Connection Error');
      addLog(`❌ Connection error: ${error.message}`);
    };

    const handleChatHistory = (history) => {
      addLog(`📜 Received chat history: ${JSON.stringify(history)}`);
      setMessages(history);
    };

    const handleNewMessage = (msg) => {
      addLog(`💬 New message: ${JSON.stringify(msg)}`);
      setMessages(prev => [...prev, msg]);
    };

    // Add event listeners
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('connect_error', handleConnectError);
    socket.on('chat-history', handleChatHistory);
    socket.on('new-message', handleNewMessage);

    // Check initial connection status
    if (socket.connected) {
      setConnectionStatus('Connected');
      addLog('✅ Socket already connected');
    } else {
      addLog('⚠️ Socket not connected, attempting to connect...');
      socket.connect();
    }

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('connect_error', handleConnectError);
      socket.off('chat-history', handleChatHistory);
      socket.off('new-message', handleNewMessage);
    };
  }, []);

  const connectSocket = () => {
    addLog('🔄 Attempting to connect socket...');
    socket.connect();
  };

  const disconnectSocket = () => {
    addLog('🔄 Disconnecting socket...');
    socket.disconnect();
  };

  const joinRoom = () => {
    if (!socket.connected) {
      addLog('❌ Cannot join room - socket not connected');
      return;
    }
    addLog(`🚪 Joining room: ${roomId}`);
    socket.emit('join-room', roomId);
  };

  const sendTestMessage = () => {
    if (!socket.connected) {
      addLog('❌ Cannot send message - socket not connected');
      return;
    }
    if (!testMessage.trim()) {
      addLog('❌ Cannot send empty message');
      return;
    }
    
    const messageData = {
      roomId,
      message: testMessage,
      senderId: 'debug_user'
    };
    
    addLog(`📤 Sending message: ${JSON.stringify(messageData)}`);
    socket.emit('private-message', messageData);
    setTestMessage('');
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div style={{ 
      padding: '20px', 
      border: '2px solid #ccc', 
      margin: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px'
    }}>
      <h2>🔧 Chat Debugger</h2>
      
      {/* Connection Status */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Connection Status: 
          <span style={{ 
            color: connectionStatus === 'Connected' ? 'green' : 'red',
            marginLeft: '10px'
          }}>
            {connectionStatus}
          </span>
        </h3>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button onClick={connectSocket} disabled={socket.connected}>
            Connect
          </button>
          <button onClick={disconnectSocket} disabled={!socket.connected}>
            Disconnect
          </button>
        </div>
      </div>

      {/* Room Management */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Room Management</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '10px' }}>
          <input
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Room ID"
            style={{ padding: '5px', width: '200px' }}
          />
          <button onClick={joinRoom} disabled={!socket.connected}>
            Join Room
          </button>
        </div>
      </div>

      {/* Message Testing */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Message Testing</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '10px' }}>
          <input
            value={testMessage}
            onChange={(e) => setTestMessage(e.target.value)}
            placeholder="Test message"
            style={{ padding: '5px', width: '300px' }}
            onKeyPress={(e) => e.key === 'Enter' && sendTestMessage()}
          />
          <button onClick={sendTestMessage} disabled={!socket.connected || !testMessage.trim()}>
            Send Message
          </button>
        </div>
      </div>

      {/* Messages Display */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Messages ({messages.length})</h3>
        <div style={{ 
          height: '150px', 
          overflowY: 'auto', 
          border: '1px solid #ddd', 
          padding: '10px',
          backgroundColor: 'white',
          marginTop: '10px'
        }}>
          {messages.length === 0 ? (
            <p style={{ color: '#666' }}>No messages yet</p>
          ) : (
            messages.map((msg, index) => (
              <div key={index} style={{ marginBottom: '5px', padding: '5px', backgroundColor: '#f0f0f0' }}>
                <strong>{msg.senderId}:</strong> {msg.message}
                <span style={{ color: '#666', fontSize: '12px', marginLeft: '10px' }}>
                  {msg.timestamp}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Debug Logs */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Debug Logs ({logs.length})</h3>
          <button onClick={clearLogs} style={{ padding: '5px 10px' }}>
            Clear Logs
          </button>
        </div>
        <div style={{ 
          height: '200px', 
          overflowY: 'auto', 
          border: '1px solid #ddd', 
          padding: '10px',
          backgroundColor: 'white',
          marginTop: '10px',
          fontFamily: 'monospace',
          fontSize: '12px'
        }}>
          {logs.length === 0 ? (
            <p style={{ color: '#666' }}>No logs yet</p>
          ) : (
            logs.map((log, index) => (
              <div key={index} style={{ marginBottom: '2px' }}>
                {log}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Socket Info */}
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e9e9e9', borderRadius: '4px' }}>
        <h4>Socket Info:</h4>
        <p><strong>Connected:</strong> {socket.connected ? 'Yes' : 'No'}</p>
        <p><strong>ID:</strong> {socket.id || 'Not connected'}</p>
        <p><strong>URL:</strong> {socket.io.uri}</p>
      </div>
    </div>
  );
};

export default ChatDebugger;
