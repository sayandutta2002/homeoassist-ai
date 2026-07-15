import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, Info, ChevronDown, Bot, UserCircle, User, Mic, Send, CheckCircle2
} from 'lucide-react';

export default function TriageChat() {
  const [messages, setMessages] = useState([
    { role: 'model', content: 'Hello, I am your HomeoAssist AI. Please describe your symptoms in detail...' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [summary, setSummary] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading || isComplete) return;
    
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    
    try {
      const response = await fetch('/triage/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, language: 'en' })
      });
      const data = await response.json();
      
      setMessages([...newMessages, { role: 'model', content: data.response }]);
      if (data.is_complete) {
        setIsComplete(true);
        if (data.primary_complaint) {
            setSummary(data.primary_complaint);
        }
      }
    } catch (error) {
      setMessages([...newMessages, { role: 'model', content: 'Sorry, I encountered an error connecting to the server.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-surface text-on-background font-body-md min-h-screen flex flex-col">
      {/* TopNavBar */}
      <nav className="bg-surface dark:bg-inverse-surface w-full z-50 docked full-width top-0 border-b border-outline-variant dark:border-outline flat no shadows hidden md:flex">
        <div className="flex justify-between items-center w-full px-margin py-base max-w-max-width mx-auto">
          <div className="flex items-center gap-md">
            <span className="text-title-lg font-title-lg font-bold text-primary dark:text-primary-fixed">HomeoAssist AI</span>
            <div className="hidden md:flex gap-md ml-lg">
              <Link className="text-on-surface-variant dark:text-on-secondary-fixed-variant hover:text-primary dark:hover:text-primary-fixed transition-colors text-label-md font-label-md py-2" to="#">Consult</Link>
              <Link className="text-primary dark:text-primary-fixed border-b-2 border-primary dark:border-primary-fixed pb-1 opacity-80 transition-opacity text-label-md font-label-md py-2" to="/triage">AI Triage</Link>
              <Link className="text-on-surface-variant dark:text-on-secondary-fixed-variant hover:text-primary dark:hover:text-primary-fixed transition-colors text-label-md font-label-md py-2" to="/checkout">Order</Link>
              <Link className="text-on-surface-variant dark:text-on-secondary-fixed-variant hover:text-primary dark:hover:text-primary-fixed transition-colors text-label-md font-label-md py-2" to="#">Library</Link>
            </div>
          </div>
          <div className="flex items-center gap-sm">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-outline-variant text-primary hover:bg-surface-variant transition-colors text-label-md font-label-md">
              <Globe className="w-5 h-5" />
              Language
            </button>
            <Link to="/login" className="px-6 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-colors text-label-md font-label-md inline-block">
              Login
            </Link>
          </div>
        </div>
      </nav>
      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center w-full max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-6 h-[calc(100vh-140px)]">
        {/* Action Banner */}
        <div className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-sm mb-md flex items-center justify-center gap-sm shadow-sm shadow-[0px_4px_12px_rgba(15,23,42,0.05)]">
          <Info className="text-primary w-5 h-5 fill-primary text-surface-container-lowest" />
          <p className="text-body-sm font-body-sm text-on-surface">Once triage is complete, your assigned doctor will review this chat.</p>
        </div>
        {/* Chat Header Area */}
        <div className="w-full flex justify-between items-center mb-md pb-sm border-b border-outline-variant">
          <div>
            <h1 className="text-headline-md font-headline-md text-primary">Symptom Triage</h1>
            <p className="text-body-sm font-body-sm text-on-surface-variant">Describe your symptoms to the AI assistant</p>
          </div>
          <div className="relative">
            <select className="appearance-none bg-surface border border-outline-variant text-on-surface text-label-md font-label-md py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer shadow-sm focus:shadow-[0_0_0_2px_rgba(0,104,95,0.1)]">
              <option value="en">English</option>
              <option value="bn">Bengali (বাংলা)</option>
              <option value="hi">Hindi (हिंदी)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-on-surface-variant">
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>
        </div>
        {/* Chat Interface */}
        <div className="w-full flex-grow bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm flex flex-col overflow-hidden relative">
          
          {isComplete && (
            <div className="absolute top-0 left-0 right-0 bg-green-50 text-green-800 p-3 flex items-center justify-center gap-2 text-sm font-medium z-20 border-b border-green-200 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Triage Complete. {summary && `Primary complaint: ${summary}.`} A doctor will review your case shortly.
            </div>
          )}

          {/* Chat Messages Area */}
          <div className={`chat-container flex-grow overflow-y-auto p-md flex flex-col gap-md ${isComplete ? 'pt-14' : ''}`}>
            
            {messages.map((msg, idx) => (
                <div key={idx} className={`flex items-start gap-sm max-w-[85%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-surface-variant' : 'bg-primary-container'}`}>
                    {msg.role === 'user' ? (
                        <UserCircle className="text-on-surface w-6 h-6" />
                    ) : (
                        <Bot className="text-on-primary-container w-6 h-6" />
                    )}
                  </div>
                  <div className={`${msg.role === 'user' ? 'bg-primary text-on-primary rounded-tr-sm shadow-[0px_4px_12px_rgba(15,23,42,0.05)]' : 'bg-surface-container-low text-on-surface rounded-tl-sm shadow-[0px_4px_12px_rgba(15,23,42,0.02)] border border-outline-variant/30'} p-sm rounded-2xl`}>
                    <p className="text-body-md font-body-md whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
            ))}

            {isLoading && (
                <div className="flex items-start gap-sm max-w-[85%] opacity-50">
                  <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0">
                    <Bot className="text-on-primary-container w-4 h-4" />
                  </div>
                  <div className="bg-surface text-on-surface px-4 py-3 rounded-2xl rounded-tl-sm border border-outline-variant flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-outline rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-1.5 h-1.5 bg-outline rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1.5 h-1.5 bg-outline rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Area */}
          <div className="bg-surface-container-lowest p-sm border-t border-outline-variant flex items-end gap-sm z-10 shadow-[0px_-4px_12px_rgba(15,23,42,0.02)]">
            <button className="p-2 md:p-3 rounded-full bg-surface hover:bg-surface-variant text-primary border border-outline-variant transition-colors flex-shrink-0 shadow-sm disabled:opacity-50" title="Voice Input" disabled={isComplete}>
              <Mic className="w-6 h-6" />
            </button>
            <div className="flex-grow relative">
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading || isComplete}
                className="w-full bg-surface border border-outline-variant rounded-lg py-3 px-4 text-body-md font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-[0_0_0_2px_rgba(0,104,95,0.1)] resize-none disabled:bg-surface-variant disabled:text-on-surface-variant" 
                placeholder={isComplete ? "Triage is complete." : "Type your symptoms here... (Press Enter to send)"}
                rows={1} 
                style={{ minHeight: '48px', maxHeight: '120px' }}>
              </textarea>
            </div>
            <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim() || isComplete}
                className="p-2 md:p-3 rounded-full bg-primary text-on-primary hover:bg-primary-container transition-colors flex-shrink-0 shadow-[0px_4px_12px_rgba(15,23,42,0.05)] disabled:opacity-50" 
                title="Send Message"
            >
              <Send className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
