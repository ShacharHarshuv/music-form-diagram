"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Action } from "../actions/action";
import { actionTitle } from "../actions/action-title";

export function ToolButton({
  action,
  ref,
}: {
  action: Action;
  ref?: React.RefObject<HTMLButtonElement | null>;
}) {
  const isAvailable = action.useIsAvailable ? action.useIsAvailable() : true;
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <AnimatePresence>
      {isAvailable && (
        <motion.button
          ref={ref}
          onClick={() => action()}
          className="p-2 rounded hover:bg-gray-200 transition-colors"
          title={actionTitle(action)}
          initial={
            hasMounted ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }
          }
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
        >
          {action.icon}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
