import React from 'react'
import { Send } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

export function LiveChat() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const socket = useMemo(() => io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', { autoConnect: false }), []);

  useEffect(() => {
    if (!user) return;
    socket.connect();
    socket.emit('join', 'support');
    socket.on('chat:message', (item) => setMessages((prev) => [...prev, item]));
    api.get('/chat/messages?room=support').then((res) => setMessages(res.data)).catch(() => {});
    return () => socket.disconnect();
  }, [user, socket]);

  async function send() {
    if (!message.trim()) return;
    await api.post('/chat/send', { room: 'support', message });
    setMessage('');
  }

  if (!user) return null;
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open && <div className="mb-3 w-[min(360px,calc(100vw-2rem))] rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-700 dark:bg-slate-900">
        <div className="border-b border-slate-200 p-3 font-bold dark:border-slate-700">Live Support</div>
        <div className="h-72 space-y-2 overflow-y-auto p-3 text-sm">
          {messages.map((item, i) => <div key={item._id || i} className={`rounded-lg p-2 ${item.sender?._id === user._id || item.sender === user._id ? 'ml-8 bg-blue-600 text-white' : 'mr-8 bg-slate-100 dark:bg-slate-800'}`}>{item.message}</div>)}
        </div>
        <div className="flex gap-2 border-t border-slate-200 p-3 dark:border-slate-700"><input className="input" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} /><button className="btn-primary px-3" onClick={send}><Send size={16} /></button></div>
      </div>}
      <button className="btn-primary shadow-soft" onClick={() => setOpen((v) => !v)}>Chat Support</button>
    </div>
  );
}
