"use client";
import {
  UserGroupIcon,
  HomeIcon,
  CalendarIcon,
  Cog6ToothIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useState } from "react";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  {
    name: "Leads",
    href: "/dashboard/leads",
    icon: UserGroupIcon,
  },
  {
    name: "FollowUps",
    href: "/dashboard/follow-ups",
    icon: CalendarIcon,
  }
];

const settingsLinks = [
  { name: "Configuration", href: "/dashboard/settings/configuration" },
  { name: "Resources", href: "/dashboard/settings/resources" },
  { name: "Products", href: "/dashboard/settings/products" },
  { name: "Product Category", href: "/dashboard/settings/product-category" },
  { name: "Branch", href: "/dashboard/settings/branch" },
];

export default function NavLinks() {
  const pathname = usePathname();

  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleSettingsClick = () => {
    setSettingsOpen(!settingsOpen);
  };

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-blue-600": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
      <>
        <button
          onClick={handleSettingsClick}
          className={clsx(
            "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
            {
              "bg-sky-100 text-blue-600": pathname.startsWith("/dashboard/settings"),
            }
          )}
        >
          <Cog6ToothIcon className="w-6" />
          <p className="hidden md:block">Settings</p>
          <svg
            className={clsx("hidden fill-current sm:block ml-auto transition-transform duration-200", {
              "rotate-90": settingsOpen,
            })}
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.910734 0.410765C0.585297 0.736202 0.585297 1.26384 0.910734 1.58928L5.32148 6.00002L0.910734 10.4108C0.585297 10.7362 0.585297 11.2638 0.910734 11.5893C1.23617 11.9147 1.76381 11.9147 2.08924 11.5893L7.08924 6.58928C7.41468 6.26384 7.41468 5.7362 7.08924 5.41077L2.08924 0.410765C1.76381 0.0853277 1.23617 0.0853277 0.910734 0.410765Z"
              fill=""
            />
          </svg>
        </button>
        {settingsOpen && (
          <div className="ml-6 flex flex-col space-y-1">
            {settingsLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "flex h-[48px] grow items-center justify-start gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:px-3",
                  {
                    "bg-sky-100 text-blue-600": pathname === link.href,
                  }
                )}
              >
                <span className="ml-8">{link.name}</span>
              </Link>
            ))}
          </div>
        )}
      </>
    </>
  );
}
