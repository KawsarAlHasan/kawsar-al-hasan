"use client";

import { useEffect, useState } from "react";

const codeLines = [
  { text: 'import { Developer } from "./me";', delay: 0 },
  { text: 'import { passion, coffee } from "life";', delay: 120 },
  { text: "", delay: 220 },
  { text: "const portfolio = async () => {", delay: 280 },
  { text: '  await loadSkills(["React", "Next.js", "Node"]);', delay: 400 },
  { text: "  await buildProjects({ count: Infinity });", delay: 540 },
  { text: '  return <MindBlowingWork />;', delay: 680 },
  { text: "};", delay: 780 },
  { text: "", delay: 840 },
  { text: "portfolio().then(render);  // booting up...", delay: 900 },
];

const highlights: Record<string, string> = {
  import: "#C792EA",
  from: "#C792EA",
  const: "#C792EA",
  async: "#C792EA",
  await: "#C792EA",
  return: "#C792EA",
  "./me": "#C3E88D",
  '"life"': "#C3E88D",
  '"React"': "#C3E88D",
  '"Next.js"': "#C3E88D",
  '"Node"': "#C3E88D",
  "loadSkills": "#82AAFF",
  "buildProjects": "#82AAFF",
  "portfolio": "#FFCB6B",
  "render": "#82AAFF",
  "MindBlowingWork": "#FFCB6B",
  "Developer": "#FFCB6B",
  "passion": "#FF5370",
  "coffee": "#FF5370",
  "count": "#F78C6C",
  "Infinity": "#F78C6C",
};

function highlightLine(line: string): React.ReactNode[] {
  const tokens = line.split(/(\s+|[(),;{}<>./:"[\]]+)/);
  return tokens.map((token, i) => {
    const clean = token.replace(/['"]/g, (c) => c);
    const color =
      highlights[token] ||
      highlights[clean] ||
      (/^["'].*["']$/.test(token) ? "#C3E88D" : null) ||
      (/^\/\/.*/.test(token) ? "#546E7A" : null);
    return (
      <span key={i} style={{ color: color || "#EEFFFF" }}>
        {token}
      </span>
    );
  });
}

interface LoadingScreenProps {
  onComplete?: () => void;
  duration?: number; // ms
}

export default function LoadingScreen({
  onComplete,
  duration = 3200,
}: LoadingScreenProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [typedChars, setTypedChars] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  // Reveal lines one by one
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    codeLines.forEach((line, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines(i + 1);
        }, line.delay)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  // Typing effect on the last line
  useEffect(() => {
    if (visibleLines === codeLines.length) {
      const lastLine = codeLines[codeLines.length - 1].text;
      let i = 0;
      const id = setInterval(() => {
        i++;
        setTypedChars(i);
        if (i >= lastLine.length) clearInterval(id);
      }, 28);
      return () => clearInterval(id);
    }
  }, [visibleLines]);

  // Progress bar
  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(p);
      if (p >= 100) {
        clearInterval(id);
        setDone(true);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => onComplete?.(), 600);
        }, 400);
      }
    }, 16);
    return () => clearInterval(id);
  }, [duration, onComplete]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#0A0E1A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.6s cubic-bezier(0.4,0,0.2,1)",
        overflow: "hidden",
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(130,170,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(130,170,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />

      {/* Glow orbs */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "15%",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(130,170,255,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          width: 260,
          height: 260,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(199,121,221,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Main card */}
      <div
        style={{
          width: "min(680px, 92vw)",
          background: "rgba(15, 20, 35, 0.95)",
          border: "1px solid rgba(130,170,255,0.12)",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(130,170,255,0.05)",
        }}
      >
        {/* Window chrome */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "14px 18px",
            background: "rgba(255,255,255,0.02)",
            borderBottom: "1px solid rgba(130,170,255,0.08)",
          }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#FF5F57",
              display: "inline-block",
            }}
          />
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#FEBC2E",
              display: "inline-block",
            }}
          />
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#28C840",
              display: "inline-block",
            }}
          />
          <span
            style={{
              marginLeft: 12,
              fontSize: 12,
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.04em",
            }}
          >
            portfolio.tsx — initializing
          </span>
        </div>

        {/* Line numbers + code */}
        <div style={{ display: "flex", padding: "28px 0 24px" }}>
          {/* Line numbers */}
          <div
            style={{
              minWidth: 52,
              padding: "0 16px",
              textAlign: "right",
              color: "rgba(255,255,255,0.15)",
              fontSize: 13,
              lineHeight: "26px",
              userSelect: "none",
              borderRight: "1px solid rgba(255,255,255,0.04)",
            }}
          >
            {Array.from({ length: Math.max(visibleLines, 1) }, (_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          {/* Code */}
          <div style={{ flex: 1, padding: "0 24px", overflow: "hidden" }}>
            {codeLines.slice(0, visibleLines).map((line, i) => {
              const isLast = i === codeLines.length - 1;
              const isLastVisible = i === visibleLines - 1;
              const displayText =
                isLast && isLastVisible
                  ? line.text.slice(0, typedChars)
                  : line.text;

              return (
                <div
                  key={i}
                  style={{
                    height: 26,
                    fontSize: 13,
                    lineHeight: "26px",
                    whiteSpace: "pre",
                    color: "#EEFFFF",
                    opacity:
                      isLastVisible && !isLast
                        ? 1
                        : i < visibleLines - 1
                        ? 0.9
                        : 1,
                    animation: isLastVisible ? "fadeSlideIn 0.2s ease" : "none",
                  }}
                >
                  {displayText === ""
                    ? "\u00A0"
                    : isLast && isLastVisible
                    ? (
                      <>
                        {highlightLine(displayText)}
                        <span
                          style={{
                            display: "inline-block",
                            width: 2,
                            height: 14,
                            background: "#82AAFF",
                            marginLeft: 1,
                            verticalAlign: "middle",
                            opacity: cursorVisible ? 1 : 0,
                            transition: "opacity 0.1s",
                          }}
                        />
                      </>
                    )
                    : highlightLine(displayText)}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer: progress */}
        <div
          style={{
            padding: "16px 24px 20px",
            borderTop: "1px solid rgba(130,170,255,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <span
              style={{
                fontSize: 11,
                color: "rgba(130,170,255,0.5)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {done ? "✓ ready" : "compiling..."}
            </span>
            <span
              style={{
                fontSize: 11,
                color: "rgba(130,170,255,0.4)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {Math.round(progress)}%
            </span>
          </div>

          {/* Progress track */}
          <div
            style={{
              height: 3,
              background: "rgba(130,170,255,0.08)",
              borderRadius: 99,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                borderRadius: 99,
                background:
                  done
                    ? "#28C840"
                    : "linear-gradient(90deg, #82AAFF 0%, #C792EA 100%)",
                transition: "width 0.1s linear, background 0.4s ease",
                boxShadow: done
                  ? "0 0 8px rgba(40,200,64,0.4)"
                  : "0 0 8px rgba(130,170,255,0.3)",
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap');
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(-6px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
