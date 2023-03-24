import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Moon, SunMedium } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const NavigationBar = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  return (
    <header className="flex justify-between items-center px-5 sticky top-0 dark:bg-dark-500 bg-light-500 shrink z-[100] h-16 w-full border-b border-b-slate-500 dark:border-b-slate-700">
      <nav className="grow">
        <div className="">
          <div className="flex grow items-center justify-between flex-row">
            <div className="flex items-center">
              <div className="mr-6">
                <Link href="/">
                  <img
                    src="/blklight-white.svg"
                    className="mx-auto hidden dark:block"
                    width="50"
                    height="50"
                    alt="Ultimate Mercer Logo"
                  />
                </Link>

                <Link href="/">
                  <img
                    src="/blklight-black.svg"
                    className="mx-auto block dark:hidden"
                    width="50"
                    height="50"
                    alt="Ultimate Mercer Logo"
                  />
                </Link>
              </div>
            </div>

            <div className="block px-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="ml-6"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setTheme(currentTheme === "dark" ? "light" : "dark")
                    }
                  >
                    {mounted && (
                      <>
                        <SunMedium className="hidden dark:block" />
                        <Moon className="block dark:hidden" />
                      </>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent align="center" side="left">
                  <p className="hidden dark:block">Modo claro</p>
                  <p className="block dark:hidden">Modo escuro</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavigationBar;
