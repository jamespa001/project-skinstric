// Interface - SkinstricUserData
export interface SkinstricUserData {
  // Personal Info
  name: string;
  city: string;

  // Image Data (Supports both live capture and file upload)
  imageFile: File | null;
  imagePreviewUrl: string | null;
  captureMethod: 'camera' | 'upload' | null;

  // API & Analysis Statuses
  isAnalyzing: boolean;
  analysisResults: SkinAnalysisResponse | null;
  error: string | null;
}

// Interface - Phase1IntakeResponse
export interface Phase1IntakeResponse {
  success: boolean;
  sessionId: string;
  message?: string;
}

// Interface - SkinAnalysisResponse
export interface SkinAnalysisResponse {
  overallScore: number;
  skinAge: number;
  metrics: {
    hydration: number;
    texture: number;
    pigmentation: number;
    firmness: number;
  };
  recommendations: {
    id: string;
    title: string;
    description: string;
    productType: string;
  }[];
  processedImageUrl?: string;
}
