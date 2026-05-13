import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send } from 'lucide-react';
import {
  COMPANY_INFO,
  SERVICES,
  PROJECTS,
  TEAM_MEMBERS,
  MACHINES,
  CERTIFICATIONS,
} from '@/lib/constants';
import { useLocation } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const location = useLocation();

  const hiddenPaths = [
    '/secured/v1/admin',
    '/secured/v1/login',
    '/s/client/dashboard'
  ];

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
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const COMPANY_CONTEXT = `
COMPANY INFORMATION

Company Name:
${COMPANY_INFO.name}

Tagline:
${COMPANY_INFO.tagline}

Founded:
${COMPANY_INFO.foundedYear}

Registration Number:
${COMPANY_INFO.registrationNumber}

Main Office:
${COMPANY_INFO.address}

USA Office:
${COMPANY_INFO.addressi}

Operational Yard:
${COMPANY_INFO.addressii}

Phone:
${COMPANY_INFO.phone}

Alternate Phone:
${COMPANY_INFO.alternatePhone}

Email:
${COMPANY_INFO.email}

SERVICES

${SERVICES.map(
  (service) => `
- ${service.title}: ${service.description}
`
).join('')}

TEAM MEMBERS

${TEAM_MEMBERS.map(
  (member) => `
- ${member.name} (${member.position})
  ${member.bio}
`
).join('')}

PROJECTS

${PROJECTS.map(
  (project) => `
- ${project.title}
  Location: ${project.location}
  Client: ${project.client || 'Confidential'}
`
).join('')}

CERTIFICATIONS

${CERTIFICATIONS.map(
  (cert) => `
- ${cert.title}
  Issuer: ${cert.issuer}
`
).join('')}

EQUIPMENT

${MACHINES.map(
  (machine) => `
- ${machine.name} (${machine.category})
`
).join('')}
`;

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const currentInput = inputText;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: currentInput,
      isUser: true,
      timestamp: new Date()
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer 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'
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',

            messages: [
              {
                role: 'system',
                content: `
                  You are the official AI customer support assistant for ${COMPANY_INFO.name}.

                  Your responsibility is to:
                  - answer questions about the company
                  - explain services
                  - discuss projects
                  - describe equipment
                  - provide company contact information
                  - help potential clients
                  - sound professional and knowledgeable

                  Rules:
                  - Be concise and professional
                  - Sound like a real company representative
                  - Keep responses conversational
                  - If asked about pricing or quotations, direct users to contact the company
                  - Never invent information not provided
                  - If unsure, politely say so

                  COMPANY KNOWLEDGE BASE:

                  ${COMPANY_CONTEXT}`
              },

              ...updatedMessages.map((msg) => ({
                role: msg.isUser ? 'user' : 'assistant',
                content: msg.text
              }))
            ],

            temperature: 0.7,
            max_tokens: 500
          })
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      const botResponse =
        data?.choices?.[0]?.message?.content ||
        'Sorry, I could not generate a response.';

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat API Error:', error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `I apologize, but I'm having trouble connecting right now. Please contact us directly at ${COMPANY_INFO.phone} or ${COMPANY_INFO.email}.`,
        isUser: false,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg"
        size="sm"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 h-96 bg-white dark:bg-gray-800 rounded-sm shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col">

          {/* Header */}
          <div className="bg-primary text-white p-4 rounded-t-sm">
            <h3 className="font-semibold text-sm">
              Customer Support
            </h3>

            <p className="text-xs opacity-90">
              We typically reply in a few minutes
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isUser
                    ? 'justify-end'
                    : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm whitespace-pre-wrap ${
                    message.isUser
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                  }`}
                >

                    <ReactMarkdown
                      components={{
                        strong: ({ children }) => (
                          <strong className="font-bold text-black dark:text-white">
                            {children}
                          </strong>
                        ),
                        p: ({ children }) => (
                          <p className="leading-relaxed">
                            {children}
                          </p>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc pl-5 space-y-1">
                            {children}
                          </ul>
                        ),
                        li: ({ children }) => (
                          <li>{children}</li>
                        ),
                      }}
                    >
                      {message.text}
                    </ReactMarkdown>

                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>

                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0.1s' }}
                    ></div>

                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    ></div>
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
                onChange={(e) =>
                  setInputText(e.target.value)
                }
                onKeyDown={handleKeyDown}
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