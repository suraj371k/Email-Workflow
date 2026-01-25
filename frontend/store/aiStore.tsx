import { api } from "@/lib/backendUrl";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Priority = "high" | "medium" | "low" | "urgent";
type Categories =
  | "spam"
  | "newsletter"
  | "urgent"
  | "unread"
  | "social"
  | "promotions";

interface Summary {
  _id: string;
  priority: Priority;
  categories: Categories;
  summary: string;
  keyPoints: string[];
  language: "english" | "hindi";
  createdAt?: string;
  updatedAt?: string;
}

interface SummaryState {
  summaryMap: Record<string, Summary>; // messageId -> Summary
  loading: boolean;
  error: string | null;

  generateSummary: (messageId: string) => Promise<void>;
  getSummary: (summaryId: string) => Promise<void>;
  getSummaryByMessageId: (messageId: string) => Summary | undefined;
  clearSummary: (messageId?: string) => void;
}

export const useAiStore = create<SummaryState>()(
  persist(
    (set, get) => ({
      summaryMap: {},
      loading: false,
      error: null,

      generateSummary: async (messageId) => {
        set({ loading: true, error: null });
        try {
          const res = await api.post(`/api/ai/${messageId}/summary`);
          console.log("Summary generated for messageId:", messageId, res.data.data);
          const newSummary = res.data.data;
          set((state) => ({
            summaryMap: {
              ...state.summaryMap,
              [messageId]: newSummary,
            },
            loading: false,
          }));
        } catch (error) {
          if (error instanceof Error) {
            console.error("Error in generate summary store:", error.message);
            set({ error: error.message, loading: false });
          }
        }
      },

      getSummary: async (summaryId) => {
        set({ loading: true, error: null });
        try {
          console.log("Fetching summary with ID:", summaryId);
          const res = await api.get(`/api/ai/${summaryId}`);
          console.log("Summary fetched:", res.data.data);
          set({ loading: false });
        } catch (error: any) {
          console.error("Error in get summary store:", error.message);
          set({ error: error.message, loading: false });
        }
      },

      getSummaryByMessageId: (messageId: string) => {
        return get().summaryMap[messageId];
      },

      clearSummary: (messageId?: string) => {
        if (messageId) {
          set((state) => {
            const newMap = { ...state.summaryMap };
            delete newMap[messageId];
            return { summaryMap: newMap, error: null };
          });
        } else {
          set({ summaryMap: {}, error: null });
        }
      },
    }),
    {
      name: "ai-store",
      partialize: (state) => ({
        summaryMap: state.summaryMap,
      }),
    }
  )
);
