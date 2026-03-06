import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, CheckCircle, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const subjects = ["AI", "DBMS", "ML", "OS"];

interface UploadedFile {
  name: string;
  subject: string;
  size: string;
}

export default function UploadPage() {
  const [selectedSubject, setSelectedSubject] = useState("AI");
  const [files, setFiles] = useState<UploadedFile[]>([
    { name: "ML_Unit2.pdf", subject: "ML", size: "2.4 MB" },
    { name: "DBMS_Normalization.pdf", subject: "DBMS", size: "1.8 MB" },
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
      const size = file.size < 1024 * 1024
        ? `${(file.size / 1024).toFixed(1)} KB`
        : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
      setFiles((prev) => [...prev, { name: file.name, subject: selectedSubject, size }]);
      toast.success(`"${file.name}" uploaded successfully!`);
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    toast.info("File removed");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="font-display text-2xl font-bold text-foreground mb-1">Upload Study Materials</h2>
        <p className="text-muted-foreground">Upload your course PDFs to enable AI-powered Q&A.</p>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Select Subject</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {subjects.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSubject(s)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedSubject === s
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
          <CardTitle className="font-display text-lg">Upload PDF</CardTitle>
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
            className={`border-2 border-dashed rounded-xl p-10 text-center transition-colors cursor-pointer ${
              isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
            <p className="font-medium text-card-foreground">Drop your PDF here or click to browse</p>
            <p className="text-sm text-muted-foreground mt-1">Supports PDF files up to 50MB</p>
          </div>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="mt-4 w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Upload to {selectedSubject}
          </button>
        </CardContent>
      </Card>

      {files.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Uploaded Files ({files.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {files.map((f, i) => (
              <motion.div
                key={`${f.name}-${i}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-secondary" />
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{f.name}</p>
                    <p className="text-xs text-muted-foreground">{f.subject} · {f.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <button onClick={() => removeFile(i)} className="text-muted-foreground hover:text-destructive">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
