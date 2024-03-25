
'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Translate } from '@/lib/i18n/client';
import { LoginButton } from '../auth/login-button';
import Link from 'next/link';
import { Setlng } from '../setlng';

import { Button } from '@/components/ui/button'
import { BsPersonBoundingBox,BsX } from "react-icons/bs";

export const Sidebar = ({ lng }: { lng: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = Translate(lng);
  
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="relative h-full w-full flex justify-end items-start p-4 overflow-hidden pointer-events-none">
      <button
        className="fixed focus:outline-none z-50 pointer-events-auto"
        onClick={toggleDrawer}
      >
        {isOpen ? (
          <BsX  className="h-6 w-6"/>
        ) : (
          <BsPersonBoundingBox className="h-6 w-6" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '0' }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute top-0 right-0 flex flex-col h-full space-y-2  bg-white dark:bg-slate-600 shadow-lg p-4 pointer-events-auto"
          >
            <div className='h-20'>  </div>
            <LoginButton>
              <Button variant="default"  size="lg">
                {t("signin")}
              </Button>
            </LoginButton>
            <Setlng lng={lng}/>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}