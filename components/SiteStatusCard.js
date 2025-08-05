import React from "react";
import Link from "next/link";
import { ExternalLink, BarChart2, Clock, Activity, Wifi } from "lucide-react";

const SiteStatusCard = ({ site }) => {
  const {
    name,
    description,
    url,
    icon,
    status,
    statusText,
    lastChecked,
    responseTime,
  } = site;

  const getStatusClasses = (status) => {
    switch (status) {
      case "operational":
        return {
          badge:
            "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
          icon: "text-green-500",
          border: "border-green-200 dark:border-green-700",
          bgHover: "hover:bg-green-50 dark:hover:bg-green-900/10",
        };
      case "degraded":
        return {
          badge:
            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
          icon: "text-yellow-500",
          border: "border-yellow-200 dark:border-yellow-700",
          bgHover: "hover:bg-yellow-50 dark:hover:bg-yellow-900/10",
        };
      case "outage":
        return {
          badge: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
          icon: "text-red-500",
          border: "border-red-200 dark:border-red-700",
          bgHover: "hover:bg-red-50 dark:hover:bg-red-900/10",
        };
      default:
        return {
          badge:
            "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
          icon: "text-gray-500",
          border: "border-gray-200 dark:border-gray-700",
          bgHover: "hover:bg-gray-50 dark:hover:bg-gray-900/10",
        };
    }
  };

  const statusClasses = getStatusClasses(status);
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 sm:p-5 p-3 flex flex-col border-l-4 ${statusClasses.border} transition-all duration-300 hover:shadow-md ${statusClasses.bgHover}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div
            className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-700 ${statusClasses.icon} mr-3`}
          >
            {status === "operational" ? (
              <Activity className="h-5 w-5" strokeWidth={2.5} />
            ) : status === "degraded" ? (
              <Wifi className="h-5 w-5" strokeWidth={2.5} />
            ) : (
              <Wifi className="h-5 w-5" strokeWidth={2.5} off={true} />
            )}
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
              {name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </div>
        </div>
        <span
          className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${statusClasses.badge}`}
        >
          <span
            className={`w-2 h-2 rounded-full inline-block ${status === "operational" ? "bg-green-500" : status === "degraded" ? "bg-yellow-500" : "bg-red-500"}`}
          ></span>
          <span>{statusText}</span>
        </span>
      </div>

      <div className="mt-3 sm:mt-4 flex flex-wrap sm:flex-nowrap items-center justify-between text-xs sm:text-sm">
        <div className="flex space-x-2 sm:space-x-4 mb-2 sm:mb-0 w-full sm:w-auto">
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center text-xs sm:text-sm"
          >
            <span>Visit Site</span>
            <ExternalLink className="h-3.5 w-3.5 ml-1" />
          </Link>
          <Link
            href={`/site/${site.id}`}
            className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium flex items-center text-xs sm:text-sm"
          >
            <span>View Details</span>
            <BarChart2 className="h-3.5 w-3.5 ml-1" />
          </Link>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <span className="text-gray-500 dark:text-gray-400 flex items-center text-xs sm:text-sm">
            <Activity className="h-3 sm:h-3.5 w-3 sm:w-3.5 mr-1" />
            <span>{responseTime}ms</span>
          </span>
          <span className="text-gray-500 dark:text-gray-400 flex items-center text-xs sm:text-sm">
            <Clock className="h-3 sm:h-3.5 w-3 sm:w-3.5 mr-1" />
            <span>{formatTime(lastChecked)}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SiteStatusCard;
