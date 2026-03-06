import { motion } from "framer-motion";
import { Info, Cpu, BookOpen, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function InfoPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-display text-2xl font-bold text-foreground mb-1">System Info</h2>
        <p className="text-muted-foreground">About the AI College Knowledge Assistant.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: Cpu, title: "AI Engine", desc: "Powered by retrieval-augmented generation (RAG) for accurate, context-aware answers from your uploaded materials." },
          { icon: BookOpen, title: "Supported Subjects", desc: "AI, DBMS, Machine Learning, Operating Systems — with more subjects coming soon." },
          { icon: Zap, title: "Fast Retrieval", desc: "Vector-based search indexes your PDFs for sub-second question answering with citation." },
          { icon: Info, title: "Version", desc: "AI College Knowledge Assistant v1.0 — Built with React, Tailwind CSS, and modern AI technologies." },
        ].map((item) => (
          <motion.div key={item.title} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="h-full">
              <CardHeader className="pb-2">
                <item.icon className="h-6 w-6 text-primary mb-2" />
                <CardTitle className="font-display text-base">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
