type DialogProps = {
  open: boolean;
  title: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function AlertDialog({
  open,
  title,
  confirmLabel = "Sí",
  cancelLabel = "No",
  onConfirm,
  onCancel,
}: DialogProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-6"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-[340px] rounded-[16px] bg-white p-6 text-blacksoft shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 text-center text-lg font-bold">{title}</div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex h-[48px] flex-1 items-center justify-center rounded-[12px] border-2 border-lightgray font-bold text-graysoft"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex h-[48px] flex-1 items-center justify-center rounded-[12px] bg-accent font-bold text-primary"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
