"use client";

import { memo, useEffect } from "react";
import useIsLoading from "@/hooks/store/useLoading";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingOverlayProps } from "@/types";

const LoadingOverlay = ({ loading = false, children }: LoadingOverlayProps) => {
  const globalLoading = useIsLoading((state) => state.isLoading);
  const isLoading = globalLoading || loading;

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 backdrop-blur-sm px-4 py-6"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="flex flex-col items-center space-y-4 sm:space-y-6 w-full max-w-xs sm:max-w-sm"
            aria-disabled={true}
            aria-hidden={true}
            aria-busy={true}
            aria-live="polite"
            aria-label="Loading..."
          >
            {children || (
              <div className="flex space-x-2 sm:space-x-3">
                {[0, 1, 2, 3, 4].map((index) => (
                  <motion.div
                    key={index}
                    className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.1,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(LoadingOverlay);
