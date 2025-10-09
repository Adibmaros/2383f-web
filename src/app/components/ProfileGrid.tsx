"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { members } from "@/lib/data";

interface ProfileGridProps {
  members: typeof members;
  currentPage: number;
}

const ProfileGrid: React.FC<ProfileGridProps> = ({ members, currentPage }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
      },
    },
  };

  const imageVariants: Variants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      key={currentPage} // Force re-animation on page change
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
      gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8"
    >
      {members.map((member, index) => (
        <motion.div
          key={`${member.name}-${currentPage}`}
          variants={cardVariants}
          whileHover="hover"
          className="group relative bg-white/90 dark:bg-slate-800/80 backdrop-blur-xl 
          p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl 
          shadow-md hover:shadow-xl transition-all duration-300
          border border-white/20 dark:border-slate-700/50
          hover:border-indigo-200 dark:hover:border-indigo-700/50
          overflow-hidden"
        >
          {/* Background gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/30 
            dark:from-indigo-900/20 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 
            transition-opacity duration-300 rounded-xl sm:rounded-2xl"
          />

          {/* Content */}
          <div className="relative z-10">
            {/* Profile Image */}
            <div className="relative mb-3 sm:mb-4">
              <motion.div variants={imageVariants} whileHover="hover" className="relative group/image mx-auto w-fit">
                {/* Animated background ring */}
                <div
                  className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 
                  rounded-full opacity-0 group-hover:opacity-60 blur-sm transition-all duration-300"
                />

                {/* Image container */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto">
                  <Image
                    src={member.imageUrl.startsWith("/") ? member.imageUrl : `/${member.imageUrl}`}
                    alt={`Profile picture of ${member.name}`}
                    fill
                    sizes="(max-width: 640px) 64px, (max-width: 1024px) 80px, 96px"
                    className="rounded-full object-cover
                    ring-2 sm:ring-3 ring-white dark:ring-slate-800 
                    group-hover/image:ring-indigo-200 dark:group-hover/image:ring-indigo-700/50
                    transition-all duration-300
                    shadow-md group-hover/image:shadow-lg"
                    loading={index < 6 ? "eager" : "lazy"}
                  />
                </div>
              </motion.div>
            </div>

            {/* Member Info */}
            <div className="text-center space-y-1 sm:space-y-2">
              <h3
                className="text-sm sm:text-base lg:text-lg font-bold 
                bg-gradient-to-r from-indigo-600 to-purple-600 
                dark:from-indigo-400 dark:to-purple-400
                bg-clip-text text-transparent 
                group-hover:from-indigo-700 group-hover:to-purple-700
                dark:group-hover:from-indigo-300 dark:group-hover:to-purple-300
                transition-all duration-300 leading-tight"
              >
                {member.name}
              </h3>

              <p
                className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 
                font-medium leading-relaxed line-clamp-2"
              >
                {member.role}
              </p>

              {/* Detail Link */}
              <Link
                href={`/dashboard/profile/${member.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="inline-block mt-2 sm:mt-3 px-3 sm:px-4 py-1.5 sm:py-2 
                bg-gradient-to-r from-indigo-50 to-purple-50 
                dark:from-indigo-900/30 dark:to-purple-900/30
                text-indigo-600 dark:text-indigo-300 rounded-full 
                hover:from-indigo-100 hover:to-purple-100
                dark:hover:from-indigo-800/50 dark:hover:to-purple-800/50
                transition-all duration-200 font-medium text-xs sm:text-sm
                hover:shadow-md hover:scale-105
                border border-indigo-100 dark:border-indigo-800/50
                hover:border-indigo-200 dark:hover:border-indigo-700/50
                backdrop-blur-sm"
              >
                Detail
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProfileGrid;
