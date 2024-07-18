import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { CornerDownLeft, Paperclip } from "lucide-react";
import { useState } from "react";

interface NewMessageInputProps {
  onSendMessage: (message: string) => Promise<void>;
}

export const NewMessageInput: React.FC<NewMessageInputProps> = ({
  onSendMessage,
}) => {
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSend() {
    setLoading(true);
    onSendMessage(inputMessage)
      .then(() => {
        setLoading(false);
        setInputMessage("");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Failed to send message:", error);
      });
  }

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <div className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
        <Label htmlFor="message" className="sr-only">
          Message
        </Label>
        <Textarea
          id="message"
          placeholder="Type your message here..."
          className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <div className="flex items-center p-3 pt-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Paperclip className="size-4" />
                <span className="sr-only">Attach file</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Attach File</TooltipContent>
          </Tooltip>
          <Button
            size="sm"
            className="ml-auto gap-1.5"
            disabled={loading}
            onClick={() => handleSend()}
          >
            Send Message
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
