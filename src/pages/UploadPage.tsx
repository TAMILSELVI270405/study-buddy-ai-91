import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, CheckCircle, X, File, FolderOpen, Link2, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const subjects = [
  { id: "ai", label: "Artificial Intelligence", icon: "🤖" },
  { id: "dbms", label: "Database Systems", icon: "🗄️" },
  { id: "ml", label: "Machine Learning", icon: "🧠" },
  { id: "os", label: "Operating Systems", icon: "⚙️" },
];

interface UploadedFile {
  name: string;
  subject: string;
  size: string;
  date: string;
  status: "processing" | "ready";
}

export default function UploadPage() {
  const [selectedSubject, setSelectedSubject] = useState("ai");
  const [files, setFiles] = useState<UploadedFile[]>([
    { name: "ML_Unit2_Neural_Networks.pdf", subject: "ml", size: "2.4 MB", date: "Mar 14, 2026", status: "ready" },
    { name: "DBMS_Normalization_Notes.pdf", subject: "dbms", size: "1.8 MB", date: "Mar 13, 2026", status: "ready" },
    { name: "AI_Search_Algorithms.pdf", subject: "ai", size: "3.1 MB", date: "Mar 12, 2026", status: "ready" },
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    Array.from(fileList).forEach((file) => {
      if (file.type !== "application/pdf") {
        toast.error(`"${file.name}" is not a PDF file.`);
        return;
      }
      const size =
        file.size < 1024 * 1024
          ? `${(file.size / 1024).toFixed(1)} KB`
          : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
      const newFile: UploadedFile = {
        name: file.name,
        subject: selectedSubject,
        size,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        status: "processing",
      };
      setFiles((prev) => [newFile, ...prev]);
      toast.success(`"${file.name}" uploaded! Processing...`);

      // Simulate processing
      setTimeout(() => {
        setFiles((prev) =>
          prev.map((f) => (f.name === file.name && f.status === "processing" ? { ...f, status: "ready" } : f))
        );
        toast.success(`"${file.name}" is ready for Q&A!`);
      }, 2500);
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    toast.info("File removed");
  };

  const subjectLabel = subjects.find((s) => s.id === selectedSubject)?.label ?? selectedSubject;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-display text-2xl font-bold text-foreground mb-1">Upload Study Materials</h2>
        <p className="text-muted-foreground">Upload your PDFs to enable AI-powered question answering.</p>
      </motion.div>

      {/* Subject Selection */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-base">Select Subject</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {subjects.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSubject(s.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  selectedSubject === s.id
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                <span className="text-lg">{s.icon}</span>
                <span className="truncate">{s.label}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upload Zone */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-base">Upload PDF</CardTitle>
        </CardHeader>
        <CardContent>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            multiple
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files)}
          />
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFileSelect(e.dataTransfer.files); }}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer ${
              isDragging
                ? "border-primary bg-primary/5 dropzone-active"
                : "border-border hover:border-primary/40 hover:bg-muted/30"
            }`}
          >
            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Upload className="h-7 w-7 text-primary" />
            </div>
            <p className="font-display font-semibold text-card-foreground mb-1">
              Drop your PDFs here or click to browse
            </p>
            <p className="text-sm text-muted-foreground">
              Supports PDF files up to 50MB · Will be added to <strong>{subjectLabel}</strong>
            </p>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
            >
              <FolderOpen className="h-4 w-4" />
              Browse Files
            </button>
            <button
              onClick={() => toast.info("URL upload coming soon!")}
              className="py-3 px-6 rounded-xl border border-border bg-card text-card-foreground font-medium hover:bg-muted transition-all flex items-center gap-2"
            >
              <Link2 className="h-4 w-4" />
              Paste URL
            </button>
          </div>
        </CardContent>
      </Card>

      {/* RAG Pipeline Status */}
      <Card className="border-primary/20 bg-primary/[0.02]">
        <CardContent className="py-4">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-card-foreground">RAG Pipeline Active</p>
              <p className="text-xs text-muted-foreground">
                Documents are automatically chunked, embedded, and indexed for semantic search
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File Library */}
      {files.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="font-display text-base">Document Library ({files.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <AnimatePresence>
              {files.map((f, i) => (
                <motion.div
                  key={`${f.name}-${i}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                      <File className="h-5 w-5 text-destructive" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-card-foreground truncate">{f.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {subjects.find((s) => s.id === f.subject)?.label} · {f.size} · {f.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {f.status === "processing" ? (
                      <span className="inline-flex items-center gap-1.5 text-xs bg-warning/10 text-warning px-2.5 py-1 rounded-full">
                        <span className="h-1.5 w-1.5 rounded-full bg-warning animate-pulse" />
                        Processing
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs bg-success/10 text-success px-2.5 py-1 rounded-full">
                        <CheckCircle className="h-3 w-3" />
                        Ready
                      </span>
                    )}
                    <button onClick={() => removeFile(i)} className="text-muted-foreground hover:text-destructive p-1 transition-colors">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
