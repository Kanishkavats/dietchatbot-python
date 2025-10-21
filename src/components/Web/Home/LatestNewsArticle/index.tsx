'use client';

import React, { Suspense, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '../../../UI/web/Buttons/Button';
import { useTranslation } from 'react-i18next';
import FadeUpCard from '@/src/animations/FadeButtomUp';
import CustomLoader from '../../../UI/web/Loader/CustomLoader';
import BlogCard from '../../Blog/BlogCard';
import { useFetchAllBlogs } from '@/src/hooks/web/useBlog';

const LatestNewsArticle: React.FC = () => {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useFetchAllBlogs(1, 3, 'All');

  if (!isLoading && (!data?.blogs || data.blogs.length === 0)) {
    return null;
  }

  return (
    <div
      className={`w-full py-20 px-3 mt-15 relative `}
    >
      <div className="absolute inset-0">
        <div className="h-1/2 w-full bg-[url('/assets/latestNewsArticalbg.png')] bg-cover bg-center bg-no-repeat" />
        <div className="h-1/2 w-full bg-white" />
      </div>

      <div className='max-w-7xl mx-auto relative z-10'>
        {/* Header Section */}
        <FadeUpCard delay={0.3}>
          <div className='text-center mb-10 relative'>
            <motion.div
              className="flex items-center justify-center gap-2 mb-4 xl:mb-6"
              initial={{ opacity: 0, transform: "translateZ(0)" }}
              whileInView={{ opacity: 1, transform: "translateZ(0)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1 }}
            >
              <i className="text-xl text-green hand-icon"></i>
              <span className="text-green text-lg md:text-xl xl:text-[23px] font-caveat font-semibold">{t("Start Donating Poor People")}</span>
            </motion.div>

            <motion.h2
              className='text-[28px] md:px-40 justify-center md:text-4xl xl:text-[52px] xl:px-70 lg:px-50 font-nunito font-extrabold text-dark-green leading-9 tracking-wide xl:leading-14 mb-2 md:mb-4'
              initial={{ opacity: 0, transform: "translateZ(0)" }}
              whileInView={{ opacity: 1, transform: "translateZ(0)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {t("Our Latest ")} <span className="text-yellow">{t("News")}</span> {t("& Articles ")}{t("You Like")}
            </motion.h2>

            {/* Animated Heart */}
            <motion.div
              className="absolute  hidden md:block top-14 md:top-90 lg:top-38 xl:top-13 xl:left-[-90] lg:left-[-25] left-[-30] z-[-1]"
              animate={{
                scale: [0.8, 1.3, 0.8],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Image
                src="/assets/yellowspade.png"
                alt="heart"
                width={120}
                height={120}
                className="w-20 h-20 md:w-45 md:h-45"
              />
            </motion.div>
          </div>
        </FadeUpCard>
        {/* News Cards Grid */}
        {isLoading ? <div className="flex items-center justify-center text-center"><CustomLoader /></div> : isError ? <div className="text-center flex items-center justify-center text-red">Failed to fetch blogs.</div> :
          <div className='grid grid-cols-1 md:grid-cols-1 md:px-14 lg:px-18 lg:grid-cols-2 xl:px-0 xl:grid-cols-3 gap-8 lg:gap-5' >
            <Suspense fallback={<CustomLoader />}>
              {data?.blogs?.map((card: any, i: number) => {
                return (
                  <FadeUpCard key={i} delay={i * 0.2}>
                    <BlogCard key={i} card={card} />
                  </FadeUpCard>
                )
              })}
            </Suspense>
          </div>
        }

        {/* View All Button */}
        <motion.div
          className="flex justify-center mt-11"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link href="/blog">
            <Button
              text="View All"
              bgColor="bg-yellow"
              textColor="text-foreground"
              hoverTextColor="group-hover:text-white"
              hoverBg="before:bg-green"
              paddingx="px-8 xs:px-9 lg:px-11"
              paddingy="py-4 xs:py-5"
            />
          </Link>
        </motion.div>


      </div>
    </div>
  );
};

export default LatestNewsArticle;
