import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface SlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const SlideOver: React.FC<SlideOverProps> = ({ isOpen, onClose, title, children }) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm"
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      <div className="w-full max-w-xl bg-white h-full shadow-xl overflow-y-auto animate-slide-in-right">
        <div className="p-6 border-b flex justify-between items-center">
          {title && <h2 className="text-lg font-semibold text-gray-800">{title}</h2>}
          <button onClick={onClose} aria-label="Fechar" className="text-gray-500 hover:text-gray-800 text-xl">×</button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};
