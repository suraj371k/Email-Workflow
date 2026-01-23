import { api } from "@/lib/backendUrl";
import { GmailMessage, MessageBody } from "@/lib/types/gmail.types";
import {
  NormalizedLabel,
  normalizeGmailLabel,
} from "@/utils/helper/labelHelper";
import { create } from "zustand";

interface GmailState {
  loading: boolean;
  labels: NormalizedLabel[];
  error: null | string;
  messages: GmailMessage[] | [];
  message: MessageBody | null;

  getLabels: () => Promise<void>;
  getMessages: (filter: string) => Promise<void>;
  getMessageById: (messageId: string) => Promise<void>;
  currentFilter: string;
  setFilter: (filter: string) => void;
}

export const useGmailStore = create<GmailState>((set, get) => ({
  labels: [],
  messages: [],
  loading: false,
  error: null,
  message: null,

  currentFilter: "all",

  setFilter: (filter: string) => {
    set({ currentFilter: filter });
    get().getMessages(filter);
  },

  getLabels: async () => {
    set({ loading: true, error: null });

    try {
      const res = await api.get("/api/gmail/labels");

      const normalizedLabels = res.data.data
        .map(normalizeGmailLabel)
        .filter(Boolean)
        .sort((a: any, b: any) => (a!.priority ?? 99) - (b!.priority ?? 99));

      set({
        labels: normalizedLabels as NormalizedLabel[],
        loading: false,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error in getLabels store:", error.message);
        set({ error: error.message, loading: false });
      }
    }
  },

  getMessages: async (filter: string = get().currentFilter) => {
    set({ loading: true, error: null });

    try {
      const res = await api.get("/api/gmail/messages", {
        params: filter !== "all" ? { filter } : {},
      });

      set({
        messages: res.data.data,
        loading: false,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error in getMessages store:", error.message);
        set({ error: error.message, loading: false });
      }
    }
  },

  getMessageById: async (messageId) => {
    set({ loading: true, error: null });
    try {
      const res = await api.get(`/api/gmail/message/${messageId}`);
      set({ message: res.data.data, loading: false });
      console.log(res.data);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error in getMessages by id store:", error.message);
        set({ error: error.message, loading: false });
      }
    }
  },
}));
