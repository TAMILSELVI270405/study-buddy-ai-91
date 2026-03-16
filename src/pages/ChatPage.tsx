import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Loader2, Sparkles, FileText, ShieldCheck, RotateCcw } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  source?: { name: string; page: number; confidence: number };
}

const suggestedQuestions = [
  "What is Machine Learning?",
  "Explain normalization in DBMS",
  "What is process scheduling in OS?",
  "Describe neural network architecture",
];

const mockResponses: Record<string, { text: string; source: string; page: number; confidence: number }> = {
  default: {
    text: `**Machine Learning** is a subset of Artificial Intelligence that enables systems to learn and improve from experience without being explicitly programmed.

### Key Concepts:
- **Training Data** — The data used to teach the model
- **Features** — Input variables the model uses
- **Labels** — The output the model predicts

### Types of Machine Learning:
1. **Supervised Learning** — Uses labeled data to learn mappings
2. **Unsupervised Learning** — Discovers hidden patterns in unlabeled data
3. **Reinforcement Learning** — Learns through trial, error, and reward

### Real-World Examples:
- 📧 Email spam detection
- 🎬 Movie recommendation systems
- 🔍 Google Search ranking
- 🗣️ Voice assistants like Siri`,
    source: "ML_Unit1.pdf",
    page: 12,
    confidence: 94,
  },
  normalization: {
    text: `**Normalization** is the process of organizing data in a database to reduce redundancy and improve data integrity.

### Why Normalize?
- Eliminate duplicate data
- Ensure data dependencies make sense
- Reduce storage space

### Normal Forms:
1. **1NF** — No repeating groups, atomic values only
2. **2NF** — No partial dependencies on composite keys
3. **3NF** — No transitive dependencies
4. **BCNF** — Every determinant is a candidate key

### Example:
A student table with repeated course info → Split into **Students** and **Enrollments** tables.`,
    source: "DBMS_Normalization.pdf",
    page: 8,
    confidence: 91,
  },
  process: {
    text: `**Process Scheduling** is the mechanism by which the Operating System decides which process runs at any given point.

### Goals:
- Maximize CPU utilization
- Fair allocation of CPU time
- Minimize response time

### Common Algorithms:
| Algorithm | Type | Preemptive? |
|-----------|------|-------------|
| FCFS | Simple | No |
| SJF | Optimal | Both |
| Round Robin | Time-sliced | Yes |
| Priority | Rank-based | Both |

### Key Terms:
- **Burst Time** — Time needed by process on CPU
- **Turnaround Time** — Total time from submission to completion
- **Waiting Time** — Time spent in the ready queue`,
    source: "OS_Unit4.pdf",
    page: 22,
    confidence: 88,
  },
  neural: {
    text: `**Neural Networks** are computing systems inspired by biological neural networks in the brain.

### Architecture:
- **Input Layer** — Receives raw data
- **Hidden Layers** — Extract and transform features
- **Output Layer** — Produces the final prediction

### How It Works:
1. Data enters through input neurons
2. Each connection has a **weight**
3. Neurons apply an **activation function**
4. Output is compared to expected result
5. **Backpropagation** adjusts weights

### Common Activation Functions:
- **ReLU** — max(0, x), most popular
- **Sigmoid** — Maps to [0,1]
- **Softmax** — Used for classification

### Applications:
- Image recognition
- Natural language processing
- Self-driving cars`,
    source: "ML_Unit2.pdf",
    page: 37,
    confidence: 96,
  },
};

function getMockResponse(question: string) {
  const q = question.toLowerCase();
  if (q.includes("normali")) return mockResponses.normalization;
  if (q.includes("process") || q.includes("scheduling") || q.includes("os")) return mockResponses.process;
  if (q.includes("neural") || q.includes("network")) return mockResponses.neural;
  return mockResponses.default;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text?: string) => {
    const question = text || input.trim();
    if (!question || loading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: question };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const resp = getMockResponse(question);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: resp.text,
        source: { name: resp.source, page: resp.page, confidence: resp.confidence },
      };
      setMessages((prev) => [...prev, aiMsg]);
      setLoading(false);
    }, 1200 + Math.random() * 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const confidenceColor = (c: number) =>
    c >= 90 ? "text-success" : c >= 75 ? "text-warning" : "text-destructive";

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] max-w-4xl mx-auto">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-2 md:px-4 py-4 space-y-4">
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-full text-center px-4"
          >
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Ask Your AI Tutor
            </h2>
            <p className="text-muted-foreground max-w-md mb-8">
              Ask any question about your uploaded study materials. I'll find the answer and cite the source.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="text-left p-3 rounded-xl border border-border bg-card hover:bg-muted transition-colors text-sm text-card-foreground"
                >
                  <span className="text-primary mr-1">→</span> {q}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <>
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div className={`max-w-[80%] ${msg.role === "user" ? "chat-bubble-user" : "space-y-3"}`}>
                    {msg.role === "user" ? (
                      <p>{msg.content}</p>
                    ) : (
                      <>
                        <div className="chat-bubble-ai">
                          <div className="prose prose-sm max-w-none prose-chat">
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                          </div>
                        </div>
                        {msg.source && (
                          <div className="flex flex-wrap gap-2 px-1">
                            <span className="inline-flex items-center gap-1.5 text-xs bg-muted px-2.5 py-1 rounded-full text-muted-foreground">
                              <FileText className="h-3 w-3" />
                              {msg.source.name} · p.{msg.source.page}
                            </span>
                            <span className={`inline-flex items-center gap-1.5 text-xs bg-muted px-2.5 py-1 rounded-full ${confidenceColor(msg.source.confidence)}`}>
                              <ShieldCheck className="h-3 w-3" />
                              {msg.source.confidence}% confidence
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="chat-bubble-ai flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">Searching your materials...</span>
                </div>
              </motion.div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-card p-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-2 items-end">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question about your study materials..."
                rows={1}
                className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                style={{ minHeight: "48px", maxHeight: "120px" }}
              />
            </div>
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              className="h-12 w-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            AI answers are generated from your uploaded study materials with source citations.
          </p>
        </div>
      </div>
    </div>
  );
}
