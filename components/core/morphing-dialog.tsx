"use client";

import React, {
  createContext,
  useContext,
  useState,
  useId,
  useRef,
  useEffect,
} from "react";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  type Transition,
  type TargetAndTransition,
} from "motion/react";
import { createPortal } from "react-dom";
import { XIcon } from "lucide-react";

interface MorphingDialogContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  uniqueId: string;
  triggerRef: React.RefObject<HTMLDivElement | null>;
}

const MorphingDialogContext = createContext<MorphingDialogContextType | null>(
  null
);

function useMorphingDialog() {
  const context = useContext(MorphingDialogContext);
  if (!context) {
    throw new Error(
      "MorphingDialog components must be used within a MorphingDialog"
    );
  }
  return context;
}

interface MorphingDialogProps {
  children: React.ReactNode;
  transition?: Transition;
}

export function MorphingDialog({
  children,
  transition = {
    type: "spring",
    bounce: 0.05,
    duration: 0.25,
  },
}: MorphingDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueId = useId();
  const triggerRef = useRef<HTMLDivElement>(null);

  return (
    <MorphingDialogContext.Provider
      value={{ isOpen, setIsOpen, uniqueId, triggerRef }}
    >
      <MotionConfig transition={transition}>{children}</MotionConfig>
    </MorphingDialogContext.Provider>
  );
}

interface MorphingDialogTriggerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function MorphingDialogTrigger({
  children,
  className,
  style,
}: MorphingDialogTriggerProps) {
  const { setIsOpen, isOpen, uniqueId, triggerRef } = useMorphingDialog();

  return (
    <motion.div
      ref={triggerRef}
      layoutId={`dialog-${uniqueId}`}
      className={className}
      style={{ ...style, cursor: "pointer" }}
      onClick={() => setIsOpen(true)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsOpen(true);
        }
      }}
    >
      {!isOpen && children}
    </motion.div>
  );
}

interface MorphingDialogContainerProps {
  children: React.ReactNode;
}

export function MorphingDialogContainer({
  children,
}: MorphingDialogContainerProps) {
  const { isOpen, setIsOpen, uniqueId } = useMorphingDialog();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, setIsOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence initial={false} mode="sync">
      {isOpen && (
        <>
          <motion.div
            key={`backdrop-${uniqueId}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            {children}
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

interface MorphingDialogContentProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function MorphingDialogContent({
  children,
  className,
  style,
}: MorphingDialogContentProps) {
  const { uniqueId } = useMorphingDialog();

  return (
    <motion.div
      layoutId={`dialog-${uniqueId}`}
      className={className}
      style={style}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </motion.div>
  );
}

interface MorphingDialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function MorphingDialogTitle({
  children,
  className,
}: MorphingDialogTitleProps) {
  const { uniqueId } = useMorphingDialog();

  return (
    <motion.div layoutId={`title-${uniqueId}`} className={className}>
      {children}
    </motion.div>
  );
}

interface MorphingDialogSubtitleProps {
  children: React.ReactNode;
  className?: string;
}

export function MorphingDialogSubtitle({
  children,
  className,
}: MorphingDialogSubtitleProps) {
  const { uniqueId } = useMorphingDialog();

  return (
    <motion.div layoutId={`subtitle-${uniqueId}`} className={className}>
      {children}
    </motion.div>
  );
}

interface MorphingDialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
  disableLayoutAnimation?: boolean;
  variants?: {
    initial: TargetAndTransition;
    animate: TargetAndTransition;
    exit: TargetAndTransition;
  };
}

export function MorphingDialogDescription({
  children,
  className,
  disableLayoutAnimation,
  variants,
}: MorphingDialogDescriptionProps) {
  return (
    <motion.div
      className={className}
      initial={variants?.initial || { opacity: 0, y: 10 }}
      animate={variants?.animate || { opacity: 1, y: 0 }}
      exit={variants?.exit || { opacity: 0, y: 10 }}
      layout={!disableLayoutAnimation}
    >
      {children}
    </motion.div>
  );
}

interface MorphingDialogCloseProps {
  className?: string;
}

export function MorphingDialogClose({ className }: MorphingDialogCloseProps) {
  const { setIsOpen } = useMorphingDialog();

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setIsOpen(false)}
      className={`absolute right-4 top-4 rounded-full p-2 hover:bg-black/10 ${className || ""}`}
      aria-label="Close dialog"
    >
      <XIcon className="h-5 w-5" />
    </motion.button>
  );
}
