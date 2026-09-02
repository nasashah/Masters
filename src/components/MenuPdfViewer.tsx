"use client";

import { useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";

export default function MenuPdfViewer({ src }: { src: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );

  useEffect(() => {
    let cancelled = false;
    let pdf: PDFDocumentProxy | null = null;

    async function render() {
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.min.mjs",
          import.meta.url
        ).toString();

        const doc = await pdfjs.getDocument(src).promise;
        pdf = doc;
        if (cancelled) return;

        const page = await doc.getPage(1);
        const canvas = canvasRef.current;
        if (!canvas || cancelled) return;

        const containerWidth = canvas.parentElement?.clientWidth ?? 640;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const baseViewport = page.getViewport({ scale: 1 });
        const scale = (containerWidth / baseViewport.width) * dpr;
        const viewport = page.getViewport({ scale });

        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.width = "100%";
        canvas.style.height = "auto";

        const context = canvas.getContext("2d");
        if (!context) return;

        await page.render({ canvasContext: context, viewport }).promise;

        if (!cancelled) setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    render();

    return () => {
      cancelled = true;
      pdf?.destroy();
    };
  }, [src]);

  if (status === "error") {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-4 p-8 text-center text-muted">
        <p>Your browser couldn&rsquo;t render the menu inline.</p>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-gold/60 px-6 py-2 text-sm uppercase tracking-[0.2em] text-gold-soft hover:bg-gold hover:text-black"
        >
          Open Menu
        </a>
      </div>
    );
  }

  return (
    <div className="relative">
      {status === "loading" && (
        <div className="flex h-[70vh] items-center justify-center text-sm uppercase tracking-[0.3em] text-muted">
          Loading menu&hellip;
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={status === "ready" ? "block rounded-xl" : "hidden"}
        role="img"
        aria-label="Masters Barber Lounge menu and pricing"
      />
    </div>
  );
}
