import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Loader2, Image as ImageIcon, X } from "lucide-react";
import { toast } from "sonner";
import { logAudit } from "../lib/audit";

interface Props {
  value: string;
  onChange: (url: string) => void;
}

export const ImageField = ({ value, onChange }: Props) => {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be under 10MB");
      return;
    }
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `images/${crypto.randomUUID()}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from("media")
      .upload(path, file, { contentType: file.type });
    if (upErr) {
      setUploading(false);
      toast.error(upErr.message);
      return;
    }
    const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(path);
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from("media_assets").insert({
      storage_path: path,
      public_url: publicUrl,
      kind: "image",
      filename: file.name,
      mime_type: file.type,
      size_bytes: file.size,
      uploaded_by: user?.id,
    });
    await logAudit("upload_media", "media_asset", path, { filename: file.name });
    onChange(publicUrl);
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
    toast.success("Image uploaded");
  };

  return (
    <div className="space-y-3">
      <div className="relative aspect-video w-full max-w-md rounded-xl overflow-hidden border border-border bg-muted">
        {value ? (
          <img src={value} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full grid place-items-center text-muted-foreground">
            <ImageIcon className="size-10" />
          </div>
        )}
        {uploading && (
          <div className="absolute inset-0 grid place-items-center bg-foreground/40 backdrop-blur-sm">
            <Loader2 className="size-6 animate-spin text-primary-foreground" />
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          <Upload className="size-3.5" /> {value ? "Replace image" : "Upload image"}
        </Button>
        {value && (
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => onChange("")}
            disabled={uploading}
          >
            <X className="size-3.5" /> Remove
          </Button>
        )}
      </div>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or paste an image URL"
        className="text-xs font-mono"
      />
    </div>
  );
};