import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, FileText, ShieldCheck, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import ReactMarkdown from "react-markdown";

const subjects = ["AI", "DBMS", "ML", "OS"];

interface Answer {
  text: string;
  source: string;
  page: number;
  confidence: number;
}

const mockAnswers: Record<string, Answer> = {
  AI: {
    text: "**Machine Learning** is a subset of Artificial Intelligence that allows systems to learn and improve from experience without being explicitly programmed. It focuses on developing algorithms that can access data and use it to learn for themselves.\n\n### Key Types:\n- **Supervised Learning** — Uses labeled data\n- **Unsupervised Learning** — Finds patterns in unlabeled data\n- **Reinforcement Learning** — Learns through trial and reward",
    source: "AI_Unit3.pdf",
    page: 24,
    confidence: 91,
  },
  DBMS: {
    text: "**Normalization** is the process of organizing data to reduce redundancy and dependency. It divides larger tables into smaller ones and links them using relationships.\n\n### Normal Forms:\n1. **1NF** — Eliminate repeating groups\n2. **2NF** — Remove partial dependencies\n3. **3NF** — Remove transitive dependencies",
    source: "DBMS_Normalization.pdf",
    page: 12,
    confidence: 88,
  },
  ML: {
    text: "**Neural Networks** are computing systems inspired by biological neural networks. They consist of layers of interconnected nodes (neurons) that process information.\n\n### Architecture:\n- **Input Layer** — Receives data\n- **Hidden Layers** — Process features\n- **Output Layer** — Produces predictions",
    source: "ML_Unit2.pdf",
    page: 37,
    confidence: 94,
  },
  OS: {
    text: "**Process Scheduling** is the mechanism by which the OS decides which process runs at any given time. It aims to maximize CPU utilization and throughput.\n\n### Common Algorithms:\n- **FCFS** — First Come, First Served\n- **SJF** — Shortest Job First\n- **Round Robin** — Time-sliced execution",
    source: "OS_Unit4.pdf",
    page: 19,
    confidence: 87,
  },
};

export default function AskPage() {
  const [subject, setSubject] = useState("AI");
  const [question, setQuestion] = useState("");
  const [depth, setDepth] = useState([50]);
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer(null);
    setTimeout(() => {
      setAnswer(mockAnswers[subject]);
      setLoading(false);
    }, 1500);
  };

  const confidenceColor = (c: number) =>
    c >= 90 ? "text-success" : c >= 75 ? "text-warning" : "text-destructive";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-display text-2xl font-bold text-foreground mb-1">Ask Your Question</h2>
        <p className="text-muted-foreground">Select a subject and ask any question from your study materials.</p>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Subject</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {subjects.map((s) => (
              <button
                key={s}
                onClick={() => setSubject(s)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  subject === s
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Question</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g., What is machine learning?"
            className="w-full min-h-[100px] p-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-card-foreground">Retrieval Depth</span>
              <span className="text-sm text-muted-foreground">{depth[0]}%</span>
            </div>
            <Slider value={depth} onValueChange={setDepth} max={100} min={10} step={5} />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Focused</span>
              <span>Comprehensive</span>
            </div>
          </div>

          <button
            onClick={handleAsk}
            disabled={loading || !question.trim()}
            className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Searching...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" /> Ask Question
              </>
            )}
          </button>
        </CardContent>
      </Card>

      <AnimatePresence>
        {answer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card className="border-secondary/30">
              <CardHeader>
                <CardTitle className="font-display text-lg">Answer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose prose-sm max-w-none text-card-foreground">
                  <ReactMarkdown>{answer.text}</ReactMarkdown>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                    <FileText className="h-4 w-4 text-secondary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Source</p>
                      <p className="text-sm font-medium text-card-foreground">{answer.source}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                    <FileText className="h-4 w-4 text-accent" />
                    <div>
                      <p className="text-xs text-muted-foreground">Page</p>
                      <p className="text-sm font-medium text-card-foreground">{answer.page}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                    <ShieldCheck className={`h-4 w-4 ${confidenceColor(answer.confidence)}`} />
                    <div>
                      <p className="text-xs text-muted-foreground">Confidence</p>
                      <p className={`text-sm font-medium ${confidenceColor(answer.confidence)}`}>
                        {answer.confidence}%
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
