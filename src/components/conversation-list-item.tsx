import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Delete, Edit } from "lucide-react";

type Conversation = { id: string; name: string; lastMessage: string };

interface ConversationListItemProps {
  conv: Conversation;
  activeConversation: string;
  onSetActiveConversation: (id: string) => void;
  onEditConversation: (conv: Conversation) => void;
  onDeleteConversation: (conv: Conversation) => void;
}

export const ConversationListItem: React.FC<ConversationListItemProps> = ({
  activeConversation,
  conv,
  onDeleteConversation,
  onEditConversation,
  onSetActiveConversation,
}) => {
  return (
    <div
      className={`p-4 border-b border-gray-200 hover:bg-gray-100 transition duration-200 ${
        activeConversation === conv.id ? "bg-blue-100" : ""
      }`}
    >
      <div className="flex justify-between items-center">
        <div
          className="cursor-pointer flex-grow"
          onClick={() => onSetActiveConversation(conv.id)}
        >
          <h3 className="font-semibold text-gray-800">{conv.name}</h3>
          <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
        </div>
        <div className="flex space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onEditConversation(conv)}
              >
                <Edit className="size-4" />
                <span className="sr-only">Edit</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Edit</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => onDeleteConversation(conv)}
              >
                <Delete className="size-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Delete</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
