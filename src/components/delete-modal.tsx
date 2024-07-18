import { useEffect, useRef, useState } from "react";

interface DeleteModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  open,
  onCancel,
  onConfirm,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);

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

  const handleConfirm = () => {
    setLoading(true);
    onConfirm()
      .then(() => {
        setLoading(false);
        onCancel();
      })
      .catch((error) => {
        setLoading(false);
        console.error("Failed to delete conversation:", error);
      });
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div ref={modalRef} className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Delete Conversation</h2>
        <p className="mb-4">
          Are you sure you want to delete this conversation? This action cannot
          be undone.
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => onCancel()}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={() => handleConfirm()}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
            disabled={loading}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
