
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/constants';
import { Link, useLocation } from 'react-router-dom';



interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const location = useLocation();
  const hiddenPaths = ['/secured/v1/admin', '/secured/v1/login', '/s/client/dashboard'];

  if (hiddenPaths.includes(location.pathname)) return null;

  
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Welcome to ${COMPANY_INFO.name}! If you need help, simply reply to this message. We are online and ready to help.`,
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDcov0Iz3wslkb5_8vZXkxxq-xIZB7Knaw`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a customer service representative for ${COMPANY_INFO.name}, an indigenous Nigerian engineering and construction company. Here's key information about the company:

Company: ${COMPANY_INFO.name}
Services: Oil & Gas Services, Design & Planning, Mechanical & Structural Fabrication, Civil Engineering, Marine & Logistics, Mechanical Engineering
Founded: ${COMPANY_INFO.foundedYear}
Registration: RC ${COMPANY_INFO.registrationNumber}
Contact: ${COMPANY_INFO.phone}, ${COMPANY_INFO.email}
Address: ${COMPANY_INFO.address}

The company specializes in engineering construction needs in civil, mechanical and logistics sectors. They work with government agencies, top organizations and main contractors on road construction, building development, pipeline engineering/construction.

Please answer this customer question concisely and professionally: ${inputText}`
                }
              ]
            }
          ]
        })
      });

      const data = await response.json();
      const botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I apologize, but I'm having trouble responding right now. Please contact us directly at " + COMPANY_INFO.phone + " or " + COMPANY_INFO.email;

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `I apologize, but I'm having trouble connecting right now. Please contact us directly at ${COMPANY_INFO.phone} or ${COMPANY_INFO.email} for immediate assistance.`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg"
        size="sm"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 h-96 bg-white dark:bg-gray-800 rounded-sm shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col">
          {/* Header */}
          <div className="bg-primary text-white p-4 rounded-t-sm">
            <h3 className="font-semibold text-sm">Customer Support</h3>
            <p className="text-xs opacity-90">We typically reply in a few minutes</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.isUser
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 rounded-sm"
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                disabled={!inputText.trim() || isLoading}
                size="sm"
                className="bg-primary hover:bg-primary/90 rounded-sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
