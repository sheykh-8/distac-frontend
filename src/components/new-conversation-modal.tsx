import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface NewConversationModalProps {
  // Add any props you need here
  open: boolean;
  title?: string;
  onUpdate(title: string): Promise<void>;
  onCreate(title: string): Promise<void>;
  onCancel(): void;
}

export const NewConversationModal: React.FC<NewConversationModalProps> = ({
  open,
  onCancel,
  onCreate,
  onUpdate,
  title,
}) => {
  const edit = Boolean(title);

  const [loading, setLoading] = useState(false);
  
  const [newConversationTitle, setNewConversationTitle] = useState(title ?? "");

  const modalRef = useRef<HTMLDivElement>(null);

  const handleUpdateConversation = () => {
    setLoading(true);
    onUpdate(newConversationTitle)
      .then(() => {
        setLoading(false);
        onCancel();
      })
      .catch((error) => {
        setLoading(false);
        console.error("Failed to update conversation:", error);
      });
  };

  const handleCreateNewConversation = () => {
    setLoading(true);
    onCreate(newConversationTitle)
      .then(() => {
        setLoading(false);
        onCancel();
      })
      .catch((error) => {
        setLoading(false);
        console.error("Failed to create conversation:", error);
      });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as HTMLElement)
      ) {
        onCancel();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <>
      {/* Modal for New and Edit Conversation */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div ref={modalRef} className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">
              {edit ? "Edit Sequence" : "New Sequence"}
            </h2>
            <input
              type="text"
              value={newConversationTitle}
              onChange={(e) => setNewConversationTitle(e.target.value)}
              placeholder="Enter sequence title"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end space-x-2">
              <Button
                onClick={() => {
                  onCancel();
                }}
                variant={"outline"}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                onClick={
                  edit ? handleUpdateConversation : handleCreateNewConversation
                }
                className="px-4 py-2 rounded-lg transition duration-200"
                disabled={loading}
              >
                {edit ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
