import { motion } from "framer-motion";
import {
  BookOpen, Upload, MessageSquareText, FileText, Brain, Database,
  Cpu, BarChart3, Sparkles, ArrowRight, GraduationCap, Search,
  Zap, Shield, ChevronRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const features = [
  { icon: Brain, title: "Smart AI Answers", desc: "RAG-powered answers grounded in your own study materials", gradient: "from-primary/10 to-primary/5" },
  { icon: Upload, title: "Upload Anything", desc: "PDFs, notes, textbooks — all formats supported", gradient: "from-accent/10 to-accent/5" },
  { icon: Search, title: "Instant Retrieval", desc: "Vector search finds the exact content you need in seconds", gradient: "from-success/10 to-success/5" },
  { icon: FileText, title: "Cited Sources", desc: "Every answer shows the source document and page number", gradient: "from-warning/10 to-warning/5" },
];

const steps = [
  { num: "01", title: "Upload Materials", desc: "Drop your PDFs, notes, or textbooks into the platform", icon: Upload },
  { num: "02", title: "Ask Questions", desc: "Type any question about your study content", icon: MessageSquareText },
  { num: "03", title: "Get AI Answers", desc: "Receive accurate, cited answers from your own materials", icon: Sparkles },
];

const subjects = [
  { name: "Artificial Intelligence", icon: Brain, count: 12, color: "bg-primary/10 text-primary" },
  { name: "Database Systems", icon: Database, count: 8, color: "bg-accent/10 text-accent" },
  { name: "Machine Learning", icon: Cpu, count: 15, color: "bg-success/10 text-success" },
  { name: "Operating Systems", icon: BarChart3, count: 6, color: "bg-warning/10 text-warning" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-12">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative text-center py-12 md:py-16"
      >
        <div className="absolute inset-0 rounded-3xl bg-[image:var(--gradient-hero)] -z-10" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6"
        >
          <Sparkles className="h-4 w-4" />
          Powered by RAG + AI
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight"
        >
          Your AI Study Assistant
          <br />
          <span className="bg-clip-text text-transparent bg-[image:var(--gradient-primary)]">
            for College Learning
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
        >
          Upload your study materials and get instant, cited AI explanations
          for any concept. Learn faster with your personal AI tutor.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <button
            onClick={() => navigate("/upload")}
            className="group px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
          >
            <Upload className="h-5 w-5" />
            Upload Materials
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={() => navigate("/chat")}
            className="group px-8 py-3 rounded-xl bg-card text-foreground font-semibold hover:bg-muted transition-all border border-border flex items-center justify-center gap-2"
          >
            <MessageSquareText className="h-5 w-5 text-primary" />
            Ask AI a Question
          </button>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-8 mt-12"
        >
          {[
            { label: "Documents Processed", value: "1,200+" },
            { label: "Questions Answered", value: "5,000+" },
            { label: "Active Students", value: "300+" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.section>

      {/* Features */}
      <section>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
          <h2 className="font-display text-3xl font-bold text-foreground mb-2">Why Students Love It</h2>
          <p className="text-muted-foreground">Everything you need to ace your exams</p>
        </motion.div>
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <motion.div key={f.title} variants={item}>
              <Card className="group hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 border-border/50 h-full">
                <CardContent className="pt-6 pb-6">
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-4`}>
                    <f.icon className="h-6 w-6 text-foreground/80" />
                  </div>
                  <h3 className="font-display font-semibold text-card-foreground mb-1.5">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* How It Works */}
      <section>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold text-foreground mb-2">How It Works</h2>
          <p className="text-muted-foreground">Three simple steps to smarter studying</p>
        </motion.div>
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div key={s.num} variants={item} className="relative">
              <Card className="h-full border-border/50 hover:shadow-[var(--shadow-card-hover)] transition-all">
                <CardContent className="pt-6 pb-6 text-center">
                  <span className="font-display text-4xl font-bold bg-clip-text text-transparent bg-[image:var(--gradient-primary)]">
                    {s.num}
                  </span>
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto my-4">
                    <s.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-card-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </CardContent>
              </Card>
              {i < steps.length - 1 && (
                <ChevronRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground/30 z-10" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Subjects */}
      <section>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
          <h2 className="font-display text-3xl font-bold text-foreground mb-2">Supported Subjects</h2>
          <p className="text-muted-foreground">Upload materials from any of these subjects</p>
        </motion.div>
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {subjects.map((s) => (
            <motion.div key={s.name} variants={item}>
              <Card className="group cursor-pointer hover:shadow-[var(--shadow-card-hover)] transition-all border-border/50" onClick={() => navigate("/upload")}>
                <CardContent className="pt-6 pb-6 flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-xl ${s.color} flex items-center justify-center flex-shrink-0`}>
                    <s.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-card-foreground text-sm">{s.name}</h3>
                    <p className="text-xs text-muted-foreground">{s.count} documents</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center py-12 px-6 rounded-3xl bg-[image:var(--gradient-primary)] text-primary-foreground"
      >
        <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-90" />
        <h2 className="font-display text-3xl font-bold mb-3">Ready to Study Smarter?</h2>
        <p className="text-primary-foreground/80 max-w-lg mx-auto mb-6">
          Upload your first document and experience AI-powered learning today.
        </p>
        <button
          onClick={() => navigate("/upload")}
          className="px-8 py-3 rounded-xl bg-card text-foreground font-semibold hover:bg-card/90 transition-all"
        >
          Get Started Free
        </button>
      </motion.section>
    </div>
  );
}
