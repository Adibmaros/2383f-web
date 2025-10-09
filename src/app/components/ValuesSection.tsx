"use client";

import { motion } from "framer-motion";
import { Heart, Lightbulb, Shield, Star } from "lucide-react";

const ValuesSection = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
    hover: {
      y: -10,
      scale: 1.02,
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const values = [
    {
      icon: Heart,
      title: "Persahabatan Sejati",
      description: "Ikatan yang terjalin bukan hanya dalam suka, tetapi juga dalam duka. Kami saling mendukung di setiap langkah perjalanan.",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: Lightbulb,
      title: "Inovasi Berkelanjutan",
      description: "Selalu mencari cara baru untuk berkembang dan memberikan solusi terbaik melalui teknologi dan kreativitas.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Shield,
      title: "Integritas & Kepercayaan",
      description: "Membangun fondasi yang kuat dengan kejujuran, transparansi, dan komitmen dalam setiap tindakan.",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: Star,
      title: "Keunggulan Bersama",
      description: "Meraih prestasi tidak sebagai individu, tetapi sebagai satu kesatuan yang saling mengangkat dan menginspirasi.",
      color: "from-purple-500 to-violet-500",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/30 dark:bg-gray-800/20">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Nilai-Nilai Kami</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Fondasi yang menguatkan setiap langkah perjalanan kami sebagai satu keluarga besar</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div key={index} variants={cardVariants} whileHover="hover" initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.7 }}>
              <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 dark:border-gray-700/50 text-center group overflow-hidden">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>

                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{value.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
