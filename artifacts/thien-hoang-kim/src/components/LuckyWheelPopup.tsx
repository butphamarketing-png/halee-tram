import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookingForm } from "@/components/BookingForm";
import { useSiteContent } from "@/context/SiteContentContext";
import type { LuckyWheelSegment } from "@/types/site-content";
import { toast } from "@/hooks/use-toast";

const SESSION_KEY = "lw_shown";
const SPIN_DURATION = 4000;
const SPUN_KEY_PREFIX = "lw_spun_phone:";

function normalizePhone(raw: string): string {
  const digits = raw.replace(/[^\d]/g, "");
  if (digits.startsWith("84") && digits.length >= 10) return "0" + digits.slice(2);
  return digits;
}

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
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");

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

    const name = leadName.trim();
    const phoneNorm = normalizePhone(leadPhone);
    if (name.length < 2 || phoneNorm.length < 9) {
      toast({
        title: "Vui lòng nhập thông tin",
        description: "Nhập họ tên và số điện thoại trước khi quay.",
      });
      return;
    }

    const spunKey = `${SPUN_KEY_PREFIX}${phoneNorm}`;
    if (localStorage.getItem(spunKey)) {
      toast({
        title: "Số điện thoại đã quay",
        description: "Mỗi số điện thoại chỉ được quay 1 lần.",
      });
      return;
    }

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
        localStorage.setItem(spunKey, JSON.stringify({ at: new Date().toISOString(), name }));
      }
    }
    rafRef.current = requestAnimationFrame(animate);
  }, [spinning, cfg?.segments, leadName, leadPhone]);

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
            className="absolute inset-0 bg-primary/25 backdrop-blur-[4px]"
            onClick={handleClose}
          />

          {/* Popup — tone mint/xanh ngọc + gold như banner Thiên Hoàng Kim */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative z-10 w-full max-w-sm overflow-hidden rounded-[28px] border border-white/60 bg-gradient-to-br from-[#e8f7f0] via-[#d4efe6] to-[#b8e4d4] shadow-[0_24px_60px_rgba(26,80,60,0.22)]"
          >
            {/* Decorative glow */}
            <div className="pointer-events-none absolute -top-20 right-0 h-40 w-40 rounded-full bg-white/50 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-16 left-0 h-44 w-44 rounded-full bg-[#c9a227]/15 blur-3xl" />

            {/* Sticky header (always visible) */}
            <div className="sticky top-0 z-20 flex items-center justify-between gap-2 border-b border-primary/10 bg-white/50 px-3 py-2.5 backdrop-blur-sm">
              <div className="min-w-0">
                {showForm ? (
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="inline-flex items-center gap-1 rounded-full border border-primary/15 bg-white/80 px-2.5 py-1 text-xs font-semibold text-primary transition hover:bg-white"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Quay lại
                  </button>
                ) : (
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[#9a7b2e]">
                    <Sparkles className="mb-0.5 mr-1 inline h-3 w-3 text-[#c9a227]" />
                    Thiên Hoàng Kim
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="inline-flex shrink-0 items-center justify-center rounded-full border border-primary/15 bg-white/90 p-2 text-primary shadow-sm transition hover:bg-white"
                aria-label="Đóng"
                title="Đóng"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative max-h-[86vh] overflow-y-auto p-5">

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
                    <h2 className="mt-1 font-serif text-[22px] font-semibold tracking-tight text-primary">
                      {cfg.title}
                    </h2>
                    <p className="mt-1 text-[12px] text-primary/70">{cfg.subtitle}</p>
                  </div>

                  {/* Wheel */}
                  <div className="relative rounded-[26px] border border-white/80 bg-white/70 p-4 shadow-[0_12px_40px_rgba(26,80,60,0.12)]">
                    {/* Pointer */}
                    <div
                      className="absolute left-1/2 top-2 z-10 -translate-x-1/2"
                      style={{ width: 0, height: 0, borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderTop: "22px solid #c9a227", filter: "drop-shadow(0 4px 8px rgba(154,123,46,0.35))" }}
                    />
                    <canvas
                      ref={canvasRef}
                      width={260}
                      height={260}
                      className="rounded-full shadow-[0_8px_24px_rgba(26,80,60,0.15)]"
                    />
                  </div>

                  {/* Lead capture (required before spin) */}
                  {!result && (
                    <div className="w-full space-y-3 rounded-[22px] border border-black/5 bg-white p-4 shadow-[0_18px_50px_rgba(0,0,0,0.20)]">
                      <div className="grid grid-cols-1 gap-3">
                        <div>
                          <p className="mb-1 text-[11px] font-semibold text-[#183227]/80">Họ và tên *</p>
                          <Input
                            value={leadName}
                            onChange={(e) => setLeadName(e.target.value)}
                            placeholder="Nhập họ tên"
                            className="h-11 rounded-xl border-black/10 bg-white text-[#10231b] placeholder:text-muted-foreground"
                          />
                        </div>
                        <div>
                          <p className="mb-1 text-[11px] font-semibold text-[#183227]/80">Số điện thoại *</p>
                          <Input
                            value={leadPhone}
                            onChange={(e) => setLeadPhone(e.target.value)}
                            placeholder="Nhập SĐT"
                            inputMode="tel"
                            className="h-11 rounded-xl border-black/10 bg-white text-[#10231b] placeholder:text-muted-foreground"
                          />
                        </div>
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        Mỗi số điện thoại chỉ được quay <span className="font-semibold text-[#183227]">1 lần</span>.
                      </p>
                    </div>
                  )}

                  {/* Result banner */}
                  {result && !spinning && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="w-full rounded-[22px] border border-[#c9a227]/30 bg-white/90 p-4 text-center shadow-sm"
                    >
                      <p className="text-[11px] font-semibold tracking-wide text-[#9a7b2e]">{cfg.resultHeading}</p>
                      <p className="mt-1 text-[20px] font-bold tracking-tight text-primary">{result.label}</p>
                      <p className="mt-1 text-[12px] text-primary/70">{cfg.resultDescription}</p>
                    </motion.div>
                  )}

                  {/* Actions */}
                  {!result ? (
                    <Button
                      onClick={handleSpin}
                      disabled={spinning}
                      className="h-12 w-full rounded-full bg-gradient-to-r from-[#c9a227] via-[#e8d48b] to-[#c9a227] font-bold text-primary shadow-[0_12px_32px_rgba(201,162,39,0.35)] hover:brightness-[1.03] disabled:opacity-60"
                    >
                      {spinning ? "Đang quay..." : cfg.spinButtonLabel}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setShowForm(true)}
                      className="h-12 w-full rounded-full bg-gradient-to-r from-[#c9a227] via-[#e8d48b] to-[#c9a227] font-bold text-primary shadow-[0_12px_32px_rgba(201,162,39,0.35)] hover:brightness-[1.03]"
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
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#9a7b2e]">
                      Ưu đãi của bạn
                    </p>
                    <h2 className="mt-1 font-serif text-[20px] font-semibold tracking-tight text-primary">
                      {result?.label}
                    </h2>
                    <p className="mt-0.5 text-[11px] text-primary/70">Điền thông tin để đặt lịch & nhận ưu đãi</p>
                  </div>
                  <div className="rounded-[22px] border border-primary/10 bg-white p-4 shadow-[0_12px_40px_rgba(26,80,60,0.1)]">
                    <BookingForm
                      compact
                      prefill={{ name: leadName.trim(), phone: normalizePhone(leadPhone) }}
                      lockPrefill
                      onSuccess={handleFormSuccess}
                    />
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
