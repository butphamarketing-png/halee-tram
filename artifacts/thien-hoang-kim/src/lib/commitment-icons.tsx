import type { ComponentType } from "react";
import { FileText, Heart, Shield, Sparkles, Stethoscope, TestTube } from "lucide-react";
import type { CommitmentIconKey } from "@/types/site-content";

export const COMMITMENT_ICONS: Record<CommitmentIconKey, ComponentType<{ className?: string }>> = {
  Shield,
  Stethoscope,
  TestTube,
  Heart,
  Sparkles,
  FileText,
};
