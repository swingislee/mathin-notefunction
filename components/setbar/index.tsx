
'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link'
import { Translate } from '@/lib/i18n/client';
import { usePathname } from 'next/navigation';
import { languages } from '@/lib/i18n/settings';
import { Button } from '@/components/ui/button'

export default function SetBar({ lng }: { lng: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = Translate(lng);
  const currentPathname = usePathname();  

  function recordPathname(pathname:string) {
    const matchedLanguage = languages.find(lng => pathname.startsWith(`/${lng}`));

    if (matchedLanguage) {
      return pathname.replace(new RegExp(`^/${matchedLanguage}/?`), '/');
    }

    return pathname;
  }
  
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="fixed top-0 h-screen w-full flex justify-end items-start p-4 overflow-hidden pointer-events-none">
      <button
        className="fixed top-2 focus:outline-none z-50 pointer-events-auto"
        onClick={toggleDrawer}
      >
        {isOpen ? (
          <div className="bg-slate-950 h-8 w-8" />
        ) : (
          <div className="bg-red-500 h-8 w-8" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '0' }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute top-0 right-0 h-full space-y-1 bg-white dark:bg-slate-600 shadow-lg p-4 pointer-events-auto"
          >
            <div className='h-20'>  </div>
            <Button>
              {t("signin")}
            </Button>

            <div>
              {t("languageSwitcher")}
              {languages.filter((l) => lng !== l).map((l, index) => {
                return (
                  <span key={l}>
                    {index > 0 && (' or ')}
                    <Link href={`/${l}${recordPathname(currentPathname)}`}>
                      {l}
                    </Link>
                  </span>
                )
              })}
            </div>          
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}