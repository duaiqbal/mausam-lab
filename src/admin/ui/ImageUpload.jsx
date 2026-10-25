import { useRef, useState } from "react";
import { supabase } from "../../lib/supabase";

/**
 * Uploads an image to Supabase Storage (cms-images bucket) and
 * calls onUploaded(publicUrl) when done.
 */
export default function ImageUpload({ currentUrl, onUploaded, folder = "general" }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setError("");
    setUploading(true);

    // Build a unique filename
    const ext = file.name.split(".").pop();
    const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadErr } = await supabase.storage
      .from("cms-images")
      .upload(filename, file, { upsert: true });

    if (uploadErr) {
      setError(uploadErr.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("cms-images").getPublicUrl(filename);
    onUploaded(data.publicUrl);
    setUploading(false);
  }

  return (
    <div>
      {currentUrl && (
        <img
          src={currentUrl}
          alt="Current"
          style={{ maxWidth: 200, maxHeight: 140, borderRadius: 8, marginBottom: 8, border: "1px solid #D9D3CB", objectFit: "cover" }}
        />
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          style={s.btn}
        >
          {uploading ? "Uploading…" : currentUrl ? "Replace image" : "Upload image"}
        </button>
        {currentUrl && (
          <button type="button" onClick={() => onUploaded("")} style={s.removeBtn}>
            Remove image
          </button>
        )}
        {currentUrl && (
          <span style={{ fontSize: "0.75rem", color: "#5C5F58", wordBreak: "break-all", maxWidth: 260 }}>
            {currentUrl.split("/").pop()}
          </span>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
      {error && <p style={{ color: "#c0392b", fontSize: "0.8rem", marginTop: 4 }}>{error}</p>}
    </div>
  );
}

const s = {
  btn: {
    padding: "0.45rem 1rem",
    background: "#00357A",
    color: "#fff",
    border: "none",
    borderRadius: 7,
    cursor: "pointer",
    fontSize: "0.82rem",
    fontFamily: "inherit",
    fontWeight: 600,
  },
  removeBtn: {
    padding: "0.45rem 1rem",
    background: "transparent",
    color: "#c0392b",
    border: "1px solid #c0392b",
    borderRadius: 7,
    cursor: "pointer",
    fontSize: "0.82rem",
    fontFamily: "inherit",
  },
};
