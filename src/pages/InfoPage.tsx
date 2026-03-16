import { motion } from "framer-motion";
import {
  Brain, Cpu, BookOpen, Zap, Database, FileText, Search, Shield,
  GraduationCap, Code2, Layers, Target
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const techStack = [
  { icon: Code2, title: "React + Vite", desc: "Modern frontend with blazing-fast HMR" },
  { icon: Brain, title: "LLM Integration", desc: "AI-powered answers using advanced language models" },
  { icon: Database, title: "Vector Database", desc: "pgvector for semantic similarity search" },
  { icon: Layers, title: "RAG Pipeline", desc: "Retrieval-Augmented Generation for accurate answers" },
];

const pipeline = [
  { step: "1", title: "Document Upload", desc: "PDF files are uploaded and stored securely", icon: FileText },
  { step: "2", title: "Text Extraction", desc: "Text is extracted from each page of the PDF", icon: Search },
  { step: "3", title: "Chunking", desc: "Text is split into 500-1000 token overlapping chunks", icon: Layers },
  { step: "4", title: "Embedding", desc: "Each chunk is converted to a vector embedding", icon: Cpu },
  { step: "5", title: "Vector Storage", desc: "Embeddings are stored in the vector database", icon: Database },
  { step: "6", title: "Query & Answer", desc: "Questions are matched to relevant chunks and answered by AI", icon: Brain },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function InfoPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-12">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <GraduationCap className="h-7 w-7 text-primary" />
          <h2 className="font-display text-2xl font-bold text-foreground">About the Project</h2>
        </div>
        <p className="text-muted-foreground">
          AI College Knowledge Assistant — a RAG-powered platform for smarter studying.
        </p>
      </motion.div>

      {/* Mission */}
      <Card className="border-primary/20 bg-primary/[0.02]">
        <CardContent className="py-6">
          <h3 className="font-display text-lg font-semibold text-card-foreground mb-2">Our Mission</h3>
          <p className="text-muted-foreground leading-relaxed">
            Many students struggle to find answers quickly in large textbooks and PDFs.
            This platform acts as a <strong className="text-card-foreground">personal AI tutor</strong> — students upload their
            study materials, ask questions in natural language, and receive accurate, cited answers
            grounded in their own course content.
          </p>
        </CardContent>
      </Card>

      {/* Tech Stack */}
      <section>
        <h3 className="font-display text-xl font-bold text-foreground mb-4">Technology Stack</h3>
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {techStack.map((t) => (
            <motion.div key={t.title} variants={item}>
              <Card className="h-full border-border/50">
                <CardContent className="py-4 flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <t.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-card-foreground text-sm">{t.title}</h4>
                    <p className="text-xs text-muted-foreground">{t.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* RAG Pipeline */}
      <section>
        <h3 className="font-display text-xl font-bold text-foreground mb-4">RAG Pipeline</h3>
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-3">
          {pipeline.map((p) => (
            <motion.div key={p.step} variants={item}>
              <Card className="border-border/50">
                <CardContent className="py-4 flex items-center gap-4">
                  <span className="font-display text-2xl font-bold bg-clip-text text-transparent bg-[image:var(--gradient-primary)] w-8 text-center flex-shrink-0">
                    {p.step}
                  </span>
                  <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <p.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-card-foreground text-sm">{p.title}</h4>
                    <p className="text-xs text-muted-foreground">{p.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section>
        <h3 className="font-display text-xl font-bold text-foreground mb-4">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { icon: Target, title: "Accurate Answers", desc: "Grounded in your own study materials" },
            { icon: Shield, title: "Source Citations", desc: "Every answer shows document & page" },
            { icon: Zap, title: "Fast Retrieval", desc: "Sub-second vector similarity search" },
          ].map((f) => (
            <Card key={f.title} className="border-border/50">
              <CardContent className="py-5 text-center">
                <f.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <h4 className="font-display font-semibold text-card-foreground text-sm mb-1">{f.title}</h4>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Card>
        <CardContent className="py-4 text-center">
          <p className="text-sm text-muted-foreground">
            AI College Knowledge Assistant v1.0 — Built with React, Tailwind CSS, and modern AI technologies.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
