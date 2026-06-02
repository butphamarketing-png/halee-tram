import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingForm } from "@/components/BookingForm";
import { useSiteContent } from "@/context/SiteContentContext";
import type { LuckyWheelSegment } from "@/types/site-content";

const SESSION_KEY = "lw_shown";
const SPIN_DURATION = 4000;

function getWinner(segments: LuckyWheelSegment[]): number {
  const total = segments.reduce((s, seg) => s + seg.weight, 0);
  let rand = Math.random() * total;
  for (let i = 0; i < segments.length; i++) {
    rand -= segments[i].weight;
    if (rand <= 0) return i;
  }
  return segments.length - 1;
}

function drawWheel(
  canvas: HTMLCanvasElement,
  segments: LuckyWheelSegment[],
  rotation: number,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const size = canvas.width;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 4;
  const n = segments.length;
  const arc = (2 * Math.PI) / n;

  ctx.clearRect(0, 0, size, size);

  segments.forEach((seg, i) => {
    const start = rotation + i * arc;
    const end = start + arc;

    // Slice
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, end);
    ctx.closePath();
    ctx.fillStyle = seg.color;
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.5)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Text
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(start + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = `bold ${Math.max(10, size / 22)}px sans-serif`;
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 4;
    ctx.fillText(seg.label, r - 10, 5);
    ctx.restore();
  });

  // Center circle
  ctx.beginPath();
  ctx.arc(cx, cy, size / 12, 0, 2 * Math.PI);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.strokeStyle = "#c8a96e";
  ctx.lineWidth = 3;
  ctx.stroke();

  // Center icon (star)
  ctx.fillStyle = "#c8a96e";
  ctx.font = `bold ${size / 14}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("★", cx, cy);
}

type Props = {
  externalOpen?: boolean;
  onExternalClose?: () => void;
};

export function LuckyWheelPopup({ externalOpen, onExternalClose }: Props) {
  const { content } = useSiteContent();
  const cfg = content.luckyWheel;

  const [autoVisible, setAutoVisible] = useState(false);
  const visible = externalOpen || autoVisible;
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<LuckyWheelSegment | null>(null);
  const [showForm, setShowForm] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotRef = useRef(0);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const targetRotRef = useRef(0);

  // Auto show popup
  useEffect(() => {
    if (!cfg?.enabled) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    const delay = (cfg.autoShowDelay ?? 5) * 1000;
    const timer = setTimeout(() => setAutoVisible(true), delay);
    return () => clearTimeout(timer);
  }, [cfg?.enabled, cfg?.autoShowDelay]);

  // Draw wheel whenever rotation changes or visible
  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !cfg?.segments?.length) return;
    drawWheel(canvas, cfg.segments, rotRef.current);
  }, [cfg?.segments]);

  useEffect(() => {
    if (visible) redraw();
  }, [visible, redraw]);

  const handleSpin = useCallback(() => {
    if (spinning || !cfg?.segments?.length) return;

    const winnerIdx = getWinner(cfg.segments);
    const n = cfg.segments.length;
    const arc = (2 * Math.PI) / n;
    // Target: pointer at top (−π/2) pointing to winner segment center
    const winnerAngle = winnerIdx * arc + arc / 2;
    const fullSpins = 5 * 2 * Math.PI;
    const targetRot = fullSpins + (-Math.PI / 2 - winnerAngle - rotRef.current % (2 * Math.PI));
    targetRotRef.current = rotRef.current + targetRot + 2 * Math.PI;

    setSpinning(true);
    startTimeRef.current = performance.now();
    const startRot = rotRef.current;
    const totalDelta = targetRotRef.current - startRot;

    function animate(now: number) {
      const elapsed = now - startTimeRef.current;
      const t = Math.min(elapsed / SPIN_DURATION, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      rotRef.current = startRot + totalDelta * eased;
      drawWheel(canvasRef.current!, cfg.segments, rotRef.current);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        setResult(cfg.segments[winnerIdx]);
      }
    }
    rafRef.current = requestAnimationFrame(animate);
  }, [spinning, cfg?.segments]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const handleClose = () => {
    onExternalClose?.();
    setAutoVisible(false);
    sessionStorage.setItem(SESSION_KEY, "1");
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    onExternalClose?.();
    setAutoVisible(false);
    sessionStorage.setItem(SESSION_KEY, "1");
  };

  if (!cfg?.enabled) return null;

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative z-10 w-full max-w-sm overflow-hidden rounded-3xl bg-gradient-to-b from-[#1a3328] to-[#0f1f18] shadow-2xl"
          >
            {/* Sticky header (always visible) */}
            <div className="sticky top-0 z-20 flex items-center justify-between gap-2 border-b border-white/10 bg-[#13261d]/80 px-3 py-2 backdrop-blur">
              <div className="min-w-0">
                {showForm ? (
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-white/80 transition hover:bg-white/20"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Quay lại
                  </button>
                ) : (
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[#e8d48b]">
                    <Sparkles className="mb-0.5 mr-1 inline h-3 w-3" />
                    Thiên Hoàng Kim
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="inline-flex shrink-0 items-center justify-center rounded-full bg-white/10 p-2 text-white/70 transition hover:bg-white/20"
                aria-label="Đóng"
                title="Đóng"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[86vh] overflow-y-auto p-5">

            <AnimatePresence mode="wait">
              {!showForm ? (
                <motion.div
                  key="wheel"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -40 }}
                  className="flex flex-col items-center gap-4"
                >
                  {/* Header */}
                  <div className="text-center">
                    <h2 className="mt-1 font-serif text-xl font-bold text-white">
                      {cfg.title}
                    </h2>
                    <p className="mt-0.5 text-xs text-white/60">{cfg.subtitle}</p>
                  </div>

                  {/* Wheel */}
                  <div className="relative">
                    {/* Pointer */}
                    <div
                      className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1"
                      style={{ width: 0, height: 0, borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderTop: "22px solid #e8d48b", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}
                    />
                    <canvas
                      ref={canvasRef}
                      width={260}
                      height={260}
                      className="rounded-full shadow-xl"
                    />
                  </div>

                  {/* Result banner */}
                  {result && !spinning && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="w-full rounded-2xl border border-[#e8d48b]/40 bg-[#e8d48b]/10 p-3 text-center"
                    >
                      <p className="text-xs font-semibold text-[#e8d48b]">{cfg.resultHeading}</p>
                      <p className="mt-0.5 text-lg font-bold text-white">{result.label}</p>
                      <p className="mt-0.5 text-[10px] text-white/60">{cfg.resultDescription}</p>
                    </motion.div>
                  )}

                  {/* Actions */}
                  {!result ? (
                    <Button
                      onClick={handleSpin}
                      disabled={spinning}
                      className="w-full rounded-full bg-[#c8a96e] py-5 font-bold text-[#1a3328] hover:bg-[#e8d48b] disabled:opacity-60"
                    >
                      {spinning ? "Đang quay..." : cfg.spinButtonLabel}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setShowForm(true)}
                      className="w-full rounded-full bg-[#c8a96e] py-5 font-bold text-[#1a3328] hover:bg-[#e8d48b]"
                    >
                      <Gift className="mr-2 h-4 w-4" /> Nhận ưu đãi ngay
                    </Button>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-3"
                >
                  <div className="text-center">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#e8d48b]">
                      Ưu đãi của bạn
                    </p>
                    <h2 className="mt-1 font-serif text-lg font-bold text-white">
                      {result?.label}
                    </h2>
                    <p className="mt-0.5 text-[11px] text-white/60">Điền thông tin để đặt lịch & nhận ưu đãi</p>
                  </div>
                  <div className="rounded-2xl bg-white p-4">
                    <BookingForm compact onSuccess={handleFormSuccess} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
