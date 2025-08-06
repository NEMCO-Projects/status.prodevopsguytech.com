import "../styles/globals.css";
import {
  NotificationProvider,
  NotificationContext,
} from "../components/Notification";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { initializeDarkMode, toggleDarkMode } from "../lib/utils";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);
  const [pageTransitioning, setPageTransitioning] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    const initialDarkMode = initializeDarkMode();
    setIsDarkMode(initialDarkMode);
  }, []);

  // Handle route change events for page transitions
  useEffect(() => {
    const handleRouteChangeStart = () => {
      setPageTransitioning(true);
    };

    const handleRouteChangeComplete = () => {
      setPageTransitioning(false);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router]);

  const addNotification = (notification) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { ...notification, id }]);
    return id;
  };

  const removeNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  };

  // Handle theme toggle
  const handleThemeToggle = () => {
    setIsDarkMode(prevMode => toggleDarkMode(prevMode));
  };

  return (
    <NotificationContext.Provider
      value={{ addNotification, removeNotification }}
    >
      <NotificationProvider>
        <div className={`page-transition-wrapper ${isDarkMode ? 'dark' : ''}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={router.route}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="page-content"
            >
              <Component {...pageProps} isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />
            </motion.div>
          </AnimatePresence>

          {/* Global page transition overlay */}
          <AnimatePresence>
            {pageTransitioning && (
              <motion.div
                className="fixed inset-0 bg-blue-500/10 z-50 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </AnimatePresence>
        </div>
      </NotificationProvider>
    </NotificationContext.Provider>
  );
}

export default MyApp;
