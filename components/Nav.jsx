"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from './ThemeProvider';

// icons
import {
  HiHome,
  HiUser,
  HiViewColumns,
  HiRectangleGroup,
  HiChatBubbleBottomCenterText,
  HiEnvelope,
} from "react-icons/hi2";

// nav data
export const navData = [
  { name: "home", path: "/", Icon: HiHome },
  { name: "about", path: "/about", Icon: HiUser },
  { name: "services", path: "/services", Icon: HiRectangleGroup },
  { name: "work", path: "/work", Icon: HiViewColumns },
  {
    name: "testimonials",
    path: "/testimonials",
    Icon: HiChatBubbleBottomCenterText,
  },
  {
    name: "contact",
    path: "/contact",
    Icon: HiEnvelope,
  },
];

const Nav = () => {
  const router = useRouter();
  const pathname = router.pathname;
  const { theme } = useTheme();

  return (
    <nav className="flex flex-col items-center xl:justify-center gap-y-4 fixed h-max bottom-0 mt-auto xl:right-[2%] z-50 top-0 w-full xl:w-16 xl:max-w-md xl:h-screen">
      <div className={`flex w-full xl:flex-col items-center justify-around xl:justify-center gap-y-10 px-4 md:px-40 xl:px-0 h-[80px] xl:h-max py-8 ${theme === 'light' ? 'bg-white/80' : 'bg-black/20'} backdrop-blur-sm text-3xl xl:text-xl xl:rounded-full`}>
        {navData.map((link, i) => {
          const isActive = link.path === pathname;
          
          return (
            <Link
              className={`${
                isActive 
                  ? "text-accent" 
                  : theme === 'light'
                    ? "text-gray-600 hover:text-accent"
                    : "text-gray-400 hover:text-accent"
              } relative flex items-center group hover:text-accent transition-all duration-300`}
              href={link.path}
              key={i}
            >
              {/* tooltip */}
              <div className="absolute pr-14 right-0 hidden xl:group-hover:flex">
                <div className={`${theme === 'light' ? 'bg-white text-gray-800' : 'bg-black/80 text-white'} relative flex items-center p-[6px] rounded-[3px]`}>
                  <div className="text-[12px] leading-none font-semibold capitalize">
                    {link.name}
                  </div>

                  {/* triangle */}
                  <div
                    className={`border-solid ${theme === 'light' ? 'border-l-white' : 'border-l-black/80'} border-l-8 border-y-transparent border-y-[6px] border-r-0 absolute -right-2`}
                    aria-hidden
                  />
                </div>
              </div>

              {/* icon */}
              <div>
                <link.Icon aria-hidden />
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Nav;