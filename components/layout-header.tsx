"use client"

import { ModeToggle } from '@/components/theme-change';

export function MyHeader() {
  return (
    <header className="sticky h-14 top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className='container flex h-14 max-w-screen-2xl items-center'>
        <div className='mr-4 flex-1'>
          <a className='mr-6' href="/">logo</a>
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}