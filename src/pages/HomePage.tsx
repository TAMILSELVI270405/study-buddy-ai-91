import { motion } from "framer-motion";
import { BookOpen, Upload, MessageSquareText, FileText, Brain, Database, Cpu, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const features = [
  { icon: Upload, title: "Upload Study Materials", desc: "Upload PDFs from your syllabus", color: "text-secondary" },
  { icon: MessageSquareText, title: "Ask AI Questions", desc: "Get instant answers from your materials", color: "text-accent" },
  { icon: BookOpen, title: "Syllabus-Based Answers", desc: "Answers grounded in your course content", color: "text-success" },
  { icon: FileText, title: "Source Citation", desc: "See exactly where answers come from", color: "text-warning" },
];

const subjects = [
  { name: "AI", icon: Brain, count: 12 },
  { name: "DBMS", icon: Database, count: 8 },
  { name: "ML", icon: Cpu, count: 15 },
  { name: "OS", icon: BarChart3, count: 6 },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          <Brain className="h-4 w-4" /> Powered by AI
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
          AI College Knowledge Assistant
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Smart AI tool for answering questions from your college study materials.
          Upload PDFs, ask questions, get cited answers.
        </p>
        <div className="flex gap-3 justify-center mt-6">
          <button
            onClick={() => navigate("/upload")}
            className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Upload Materials
          </button>
          <button
            onClick={() => navigate("/ask")}
            className="px-6 py-2.5 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/90 transition-colors"
          >
            Ask a Question
          </button>
        </div>
      </motion.div>

      {/* Features */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f) => (
          <motion.div key={f.title} variants={item}>
            <Card className="hover:shadow-lg transition-shadow border-border/50">
              <CardContent className="pt-6">
                <f.icon className={`h-8 w-8 mb-3 ${f.color}`} />
                <h3 className="font-display font-semibold text-card-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Subjects & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Subject Usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {subjects.map((s) => (
              <div key={s.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-md bg-primary/10 flex items-center justify-center">
                    <s.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium text-card-foreground">{s.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{s.count} questions</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Most Asked Topics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {["What is Machine Learning?", "Explain Normalization in DBMS", "Types of Operating Systems", "Neural Network Architecture"].map((q, i) => (
              <div key={q} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">#{i + 1}</span>
                <span className="text-sm text-card-foreground">{q}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
