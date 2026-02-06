"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormEvent, useState } from "react";
import { useUiStore } from "@/store/uiStore";
import { useGmailStore } from "@/store/gmailStore";
import { Send, Save, X } from "lucide-react";
import toast from "react-hot-toast";

const Draft = () => {
  const { composeOpen, closeCompose } = useUiStore();
  const { createDraft, sendEmail, loading } = useGmailStore();

  const [data, setData] = useState({
    to: "",
    subject: "",
    body: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createDraft(data);
      setData({ to: "", subject: "", body: "" });
      toast.success("Draft saved successfully!!");
      closeCompose();
    } catch (error) {
      toast.error("Failed to save draft. Please try again.");
    }
  };

  const handleSend = async () => {
    if (!data.to || !data.body) {
      toast.error("Please fill in recipient and message");
      return;
    }

    try {
      await sendEmail(data);
      setData({ to: "", subject: "", body: "" });
      toast.success("Email sent successfully!!");
      closeCompose();
    } catch (error) {
      toast.error("Failed to send email. Please try again.");
    }
  };

  return (
    <Dialog open={composeOpen} onOpenChange={(open) => !open && closeCompose()}>
      <DialogContent className="sm:max-w-170 h-auto max-h-[85vh] bg-black border-zinc-800 text-zinc-100 shadow-2xl">
        <DialogHeader className="border-b border-zinc-800 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-zinc-100">
              New Message
            </DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-5 py-2">

          {/* to input */}
          <div className="grid gap-2.5">
            <Label className="text-sm font-medium text-zinc-300">To</Label>
            <Input
              type="email"
              value={data.to ?? ""}
              onChange={(e) =>
                setData((prev) => ({ ...prev, to: e.target.value }))
              }
              placeholder="recipient@email.com"
              required
              className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus:border-blue-500 focus:ring-blue-500/20 transition-all"
            />
          </div>

          {/* subject input */}

          <div className="grid gap-2.5">
            <Label className="text-sm font-medium text-zinc-300">Subject</Label>
            <Input
              value={data.subject ?? ""}
              onChange={(e) =>
                setData((prev) => ({ ...prev, subject: e.target.value }))
              }
              placeholder="Enter subject"
              className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus:border-blue-500 focus:ring-blue-500/20 transition-all"
            />
          </div>

          {/* message textarea */}
          <div className="grid gap-2.5">
            <Label className="text-sm font-medium text-zinc-300">Message</Label>
            <Textarea
              value={data.body ?? ""}
              onChange={(e) =>
                setData((prev) => ({ ...prev, body: e.target.value }))
              }
              placeholder="Compose your message..."
              className="min-h-60 bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus:border-blue-500 focus:ring-blue-500/20 transition-all resize-none"
            />
          </div>

          {/* dialog footer */}
          <DialogFooter className="border-t border-zinc-800 pt-4 gap-3">

            {/* cancel button */}
            <Button
              type="button"
              variant="outline"
              onClick={closeCompose}
              className="border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
            >
              Cancel
            </Button>

            {/* save draft button */}
            <Button
              type="submit"
              disabled={loading}
              className="bg-zinc-800 text-zinc-100 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="h-4 w-4 mr-2" />
              {loading ? "Saving..." : "Save Draft"}
            </Button>

           {/* send email button */}
            <Button
              type="button"
              onClick={handleSend}
              disabled={loading || !data.to || !data.body}
              className="bg-linear-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20"
            >
              <Send className="h-4 w-4 mr-2" />
              {loading ? "Sending..." : "Send"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Draft;
