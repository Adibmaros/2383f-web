"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Bot, User, Maximize2, Minimize2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
    role: 'user' | 'assistant';
    content: string;
    id: string;
};

const predefinedPrompts = [
    { label: "Visi Misi Kelas", prompt: "Apa visi dan misi dari kelas 2383F?" },
    { label: "Karya Terbaru", prompt: "Bisa sebutkan karya terbaru dari anggota kelas?" }
];

const parseMarkdown = (text: string) => {
    // Basic Markdown parser for Chat responses
    let html = text
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br />')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/### (.*?)(<br \/>|<\/p>)/g, '<h3>$1</h3>$2')
        .replace(/!\[([^\]]+)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="w-full max-w-[200px] h-auto rounded-lg my-2 shadow-sm border border-gray-200 dark:border-gray-700" loading="lazy" />')
        .replace(/- (.*?)(<br \/>|<\/p>)/g, '<li>$1</li>$2');

    // Handle unordered lists structure
    if (html.includes('<li>')) {
        html = html.replace(/(<li>[\s\S]*<\/li>)/, '<ul>$1</ul>');
    }

    // Add wrapping p tags if needed
    if (!html.startsWith('<') || html.startsWith('<strong>') || html.startsWith('<em>')) {
        html = '<p>' + html + '</p>';
    }

    return { __html: html };
};

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    // Sembunyikan widget di halaman admin/dashboard, tapi BUKAN di halaman publik yang ada di dalam (roles)
    const adminRoutes = ['/admin-kelas', '/login'];
    // Dashboard is generally hidden, EXCEPT for specific public pages
    const publicDashboardRoutes = ['/dashboard/profile', '/dashboard/karya-anggota'];

    const isHidden =
        adminRoutes.some(route => pathname.startsWith(route)) ||
        (pathname.startsWith('/dashboard') && !publicDashboardRoutes.some(route => pathname.startsWith(route)));

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    if (isHidden) return null;

    const handleSend = async (text: string, isPrompt = false) => {
        if (!text.trim()) return;

        const userMessage: Message = { role: 'user', content: text, id: Date.now().toString() };
        setMessages((prev) => [...prev, userMessage]);
        if (!isPrompt) setInputValue("");
        setIsLoading(true);

        try {
            const apiMessages = [...messages, userMessage].map((m) => ({
                role: m.role,
                content: m.content,
            }));

            const response = await fetch('/api/Chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: apiMessages }),
            });

            if (!response.ok) throw new Error('Failed to fetch response');

            const data = await response.json();
            const aiMessage: Message = {
                role: 'assistant',
                content: data.reply,
                id: (Date.now() + 1).toString()
            };

            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            console.error("Chat error:", error);
            const errorMessage: Message = {
                role: 'assistant',
                content: "Maaf, terjadi kesalahan saat menghubungi server. Silakan coba lagi.",
                id: (Date.now() + 1).toString()
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ ease: "easeOut", duration: 0.2 }}
                        className={`bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden mb-4 flex flex-col ${isExpanded ? 'w-[85vw] md:w-[60vw] h-[80vh]' : 'w-[350px] sm:w-[400px] h-[550px]'
                            } transition-all duration-300`}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex items-center justify-between text-white">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-white/20 rounded-full">
                                    <Bot className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold leading-none">Asisten 2383F</h3>
                                    <p className="text-xs text-blue-100 mt-1">AI Representative</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-1">
                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="p-2 hover:bg-white/20 rounded-lg transition-colors hidden sm:block delay-75"
                                    aria-label="Toggle Expand"
                                >
                                    {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                    aria-label="Close Chat"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50 dark:bg-gray-900/50">
                            {messages.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 px-4">
                                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-2">
                                        <Bot className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                        Halo! 👋
                                    </h4>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm max-w-[250px]">
                                        Tanyakan apa saja seputar Kelas 2383F, dan saya akan menjawabnya!
                                    </p>

                                    <div className="flex flex-col gap-2 w-full mt-6">
                                        {predefinedPrompts.map((prompt, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleSend(prompt.prompt, true)}
                                                className="px-4 py-2.5 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700 hover:border-blue-200 dark:hover:border-blue-500 transition-all text-left truncate flex items-center space-x-2"
                                            >
                                                <span>✨</span>
                                                <span className="truncate">{prompt.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                messages.map((m) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        key={m.id}
                                        className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
                                    >
                                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${m.role === 'user'
                                            ? 'bg-gradient-to-tr from-gray-700 to-gray-600 text-white'
                                            : 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white'
                                            }`}>
                                            {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                        </div>
                                        <div
                                            className={`px-4 py-3 rounded-2xl max-w-[85%] text-sm leading-relaxed prose prose-sm dark:prose-invert ${m.role === 'user'
                                                ? 'bg-gray-800 text-white rounded-tr-none shadow-md'
                                                : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none shadow-sm border border-gray-100 dark:border-gray-700'
                                                }`}
                                        >
                                            {m.role === 'user'
                                                ? m.content
                                                : <div dangerouslySetInnerHTML={parseMarkdown(m.content)} className="chat-markdown" />
                                            }
                                        </div>
                                    </motion.div>
                                ))
                            )}
                            {isLoading && (
                                <div className="flex gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                                        <Bot className="w-4 h-4" />
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 px-4 py-3 rounded-2xl rounded-tl-none flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSend(inputValue);
                                }}
                                className="relative flex items-center"
                            >
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    disabled={isLoading}
                                    placeholder={isLoading ? "Sedang mengetik..." : "Tulis pesan..."}
                                    className="w-full bg-slate-100 dark:bg-gray-800 border-none rounded-full px-5 py-3.5 pr-12 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 transition-all font-medium placeholder-gray-400"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim() || isLoading}
                                    className="absolute right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors shadow-sm"
                                >
                                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 -ml-[1px] mt-[1px]" />}
                                </button>
                            </form>
                            <div className="text-center mt-3">
                                <span className="text-[10px] text-gray-400 font-medium tracking-wide">AI DAPAT MEMBUAT KESALAHAN.</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="relative group"
            >
                {/* Tooltip */}
                {!isOpen && (
                    <div className="absolute -top-12 right-0 w-max bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:block pointer-events-none">
                        Tanya sesuatu?
                        <div className="absolute -bottom-1 right-5 w-2 h-2 bg-gray-900 rotate-45 transform" />
                    </div>
                )}

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 ring-4 ring-white/30 dark:ring-gray-900/30"
                    aria-label="Toggle Chat"
                >
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                <X className="w-6 h-6" />
                            </motion.div>
                        ) : (
                            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                <MessageCircle className="w-6 h-6" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </motion.div>

            {/* Add base markdown styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .chat-markdown p { margin-bottom: 0.5em; }
                .chat-markdown p:last-child { margin-bottom: 0; }
                .chat-markdown ul { list-style-type: disc; margin-left: 1.25em; margin-bottom: 0.5em; }
                .chat-markdown li { margin-bottom: 0.25em; }
                .chat-markdown h3 { flex: 1; font-weight: 600; font-size: 1.05em; margin-top: 0.5em; margin-bottom: 0.25em; }
                .chat-markdown strong { font-weight: 600; }
            `}} />
        </div>
    );
}

