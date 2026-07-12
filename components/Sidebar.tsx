import {
  HouseIcon,
  NotebookTabsIcon,
  CogIcon,
  PanelLeft,
  PanelRight,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navs = [
  { id: 1, nav: "Home", icons: HouseIcon, links: "/" },
  { id: 2, nav: "Add Notice", icons: NotebookTabsIcon, links: "/add-notice" },
  {
    id: 3,
    nav: "Settings",
    icons: CogIcon,
    links: "/",
    msg: "Settings feature will be added in the future updated",
  },
];

export default function Sidebar() {
  const [expandSidebar, setExpandSidebar] = useState<boolean>(false);

  return (
    <aside
      className={`
    border-r border-white/15 flex shrink-0 flex-col items-center transition-all duration-300 ease-in-out
    w-15 p-3
    ${expandSidebar ? "sm:w-50 sm:p-1 md:w-65" : "sm:w-15"}
    `}
    >
      <button
        type="button"
        title={expandSidebar ? "collapse sidebar" : "expand sidebar"}
        onClick={() => setExpandSidebar((prev) => !prev)}
        className={`
          text-white/30 hover:text-white/50 cursor-pointer 
          ${expandSidebar ? "ml-auto" : "ml-auto mr-auto"}
          p-2 hover:text-white/80
          `}
      >
        {expandSidebar ? (
          <PanelLeft className="w-5 h-5" />
        ) : (
          <PanelRight className="hidden sm:inline w-5 h-5" />
        )}
      </button>
      <ul
        className={` 
          mt-4 mb-auto flex flex-col gap-10 px-2 text-left
          ${expandSidebar ? "px-8" : "px-1"}
          `}
      >
        {navs.map((item) => {
          const Icon = item.icons;
          return (
            <li title={item.nav} key={item.id}>
              <Link
                href={item.links}
                onClick={() => item.nav === "Settings" && alert(item.msg)}
                className="flex items-center gap-4 text-2xl font-semibold text-white/40 transition-transform duration-300 ease-in-out hover:scale-125 hover:text-white/80 cursor-pointer"
              >
                <Icon className="h-6 w-6" />
                <span
                  className={`${expandSidebar ? "hidden sm:inline sm:text-sm md:text-2xl" : "hidden md:hidden"}`}
                >
                  {item.nav}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
