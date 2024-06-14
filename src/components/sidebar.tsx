'use client';

import {
  Globe,
  LayoutDashboard,
  MoreHorizontal,
  // Sparkles,
  // TrendingUp,
  // Unplug
} from 'lucide-react';
import { SidebarDesktop } from './sidebar-desktop';
import { SidebarButton } from './sidebar-button';
import { useMediaQuery } from 'usehooks-ts';
import { SidebarMobile } from './sidebar-mobile';
import { SidebarItems } from '../types';

const sidebarItems: SidebarItems = {
  links: [
    { label: 'Dashboard', href: '/', icon: LayoutDashboard },
    { label: 'Customers', href: '/customers', icon: Globe },
    // { label: 'Insights', href: '/insights', icon: TrendingUp },
    // {
    //   href: '/tasks',
    //   icon: Sparkles,
    //   label: 'Tasks',
    // },
    // {
    //   href: '/api-bindings',
    //   icon: Unplug,
    //   label: 'API Bindings',
    // },
    // {
    //   href: '/more',
    //   icon: Globe,
    //   label: 'More',
    // }
  ],
  extras: (
    <div className='flex flex-col gap-2'>
      <SidebarButton icon={MoreHorizontal} className='w-full'>
        More
      </SidebarButton>
      <SidebarButton
        className='w-full justify-center text-white'
        variant='default'
      >
        Tweet
      </SidebarButton>
    </div>
  ),
};

export function Sidebar() {
  const isDesktop = useMediaQuery('(min-width: 640px)', {
    initializeWithValue: false,
  });

  if (isDesktop) {
    return <SidebarDesktop sidebarItems={sidebarItems} />;
  }

  return <SidebarMobile sidebarItems={sidebarItems} />;
}
