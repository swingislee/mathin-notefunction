
'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Translate } from '@/lib/i18n/client';
import { LoginButton } from '@/components/auth/login-button';
import Link from 'next/link';
import { Setlng } from '@/components/setlng';

import { Button } from '@/components/ui/button'
import { BsPersonBoundingBox,BsX } from "react-icons/bs";
import { usePathname } from 'next/navigation';
import { AvatarButton } from '@/components/auth/avatar-button';
import { UserButton } from '@/components/auth/user-button';

export const Sidebar = ({ lng }: { lng: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = Translate(lng);

  const pathname = usePathname();
  
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="relative h-full w-full z-[99999] flex justify-end items-start overflow-hidden pointer-events-none">
      

      <div      
        className="right-4 top-4 focus:outline-none z-50 pointer-events-auto"
      >
        {isOpen ? (
          <button onClick={toggleDrawer}>           
           <BsX  className="mt-4 mr-4 h-6 w-6"/>
          </button> 
        ) : (

          <div 
            className='flex flex-row space-x-3 items-center justify-center mt-4 mr-4'
          >
            <UserButton />
              <div onClick={toggleDrawer} className=''>
              <AvatarButton/>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '0' }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute top-0 right-0 flex flex-col h-full space-y-2  bg-white dark:bg-slate-600 shadow-lg p-4 pointer-events-auto"
          >
            <AvatarButton/>
            <div className='h-20'>  </div>
            <LoginButton>
              <Button variant="default"  size="lg">
                {t("signin")}
              </Button>
            </LoginButton>



            <div>
              user button
            </div>
            <Setlng lng={lng}/>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}