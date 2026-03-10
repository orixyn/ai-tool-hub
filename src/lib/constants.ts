export const CATEGORIES = [
  { name: "画像生成", slug: "image-generation", icon: "Image" },
  { name: "コーディング", slug: "coding", icon: "Code" },
  { name: "ライティング", slug: "writing", icon: "PenLine" },
  { name: "動画生成", slug: "video-generation", icon: "Video" },
  { name: "音楽生成", slug: "music-generation", icon: "Music" },
  { name: "チャットボット", slug: "chatbot", icon: "MessageCircle" },
] as const;

export const PRICING_LABELS: Record<string, string> = {
  free: "無料",
  freemium: "フリーミアム",
  paid: "有料",
  enterprise: "エンタープライズ",
};
