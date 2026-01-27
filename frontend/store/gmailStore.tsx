import { api } from "@/lib/backendUrl";
import { DraftInput, GmailMessage, MessageBody } from "@/lib/types/gmail.types";
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
  nextPageToken: string | null;
  hasMore: boolean;
  currentFilter: string;
  draft: GmailMessage | null;
  drafts: GmailMessage[];

  getLabels: () => Promise<void>;
  getMessages: (filter: string, loadMore: boolean) => Promise<void>;
  getMessageById: (messageId: string) => Promise<void>;
  createDraft: (data: DraftInput) => Promise<void>;
  getDrafts: () => Promise<void>;
  setFilter: (filter: string) => void;
}

export const useGmailStore = create<GmailState>((set, get) => ({
  labels: [],
  messages: [],
  loading: false,
  error: null,
  message: null,
  nextPageToken: null,
  hasMore: true,
  draft: null,
  drafts: [],

  currentFilter: "all",

  setFilter: (filter: string) => {
    set({
      currentFilter: filter,
      messages: [],
      nextPageToken: null,
      hasMore: true,
    });
    get().getMessages(filter, false);
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

  getMessages: async (
    filter: string = get().currentFilter,
    loadMore: boolean = false,
  ) => {
    set({ loading: true, error: null });

    try {
      const { nextPageToken } = get();

      const res = await api.get("/api/gmail/messages", {
        params: {
          ...(filter !== "all" && { filter }),
          ...(loadMore && nextPageToken && { pageToken: nextPageToken }),
        },
      });

      set((state) => ({
        messages: loadMore
          ? [...state.messages, ...res.data.data]
          : res.data.data,
        nextPageToken: res.data.nextPageToken,
        hasMore: Boolean(res.data.nextPageToken),
        loading: false,
      }));
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

  createDraft: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/api/gmail/draft", data);
      set({ draft: res.data, loading: false });
      return res.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error in create draft store:", error.message);
        set({ error: error.message, loading: false });
      }
      throw error;
    }
  },

  getDrafts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/api/gmail/draft");
      set({ drafts: res.data, loading: false });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error in create draft store:", error.message);
        set({ error: error.message, loading: false });
      }
      throw error;
    }
  },
}));
