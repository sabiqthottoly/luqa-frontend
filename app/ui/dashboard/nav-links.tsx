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


// Define the structure of sub-navigation links
interface SubNavLink {
  name: string;
  href: string;
}

// Define the structure of section in the sub-navigation
interface Section {
  section: string;
  links: SubNavLink[];
}
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

// const settingsLinks = [
//   { name: "Roles", href: "/dashboard/roles" },
//   { name: "Staffs", href: "/dashboard/staffs" },
//   { name: "Branch", href: "/dashboard/branch" },
//   { name: "Product", href: "/dashboard/product" },
//   { name: "Resource Type", href: "/dashboard/resource-type" },
//   { name: "Nature of Business", href: "/dashboard/nature-of-business" },
// ];
const settingsLinks: Section[] = [
  {
    section: "Employee", links: [
      { name: "Roles", href: "/dashboard/roles" },
      { name: "Staffs", href: "/dashboard/staffs" }
    ]
  },
  {
    section: "Business", links: [
      { name: "Branch", href: "/dashboard/branch" },
      { name: "Product", href: "/dashboard/products" },
      { name: "Resource Type", href: "/dashboard/resource-type" },
      { name: "Nature of Business", href: "/dashboard/nature-of-business" }
    ]
  }
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
          <p className="hidden md:block">Configuration</p>
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
            {settingsLinks.map((section) => (
              <div key={section.section}>
                <div className="text-sm font-medium text-gray-500 mt-2 mb-2">{section.section}</div>
                {section.links.map((link) => (
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
                <hr className="border-gray-400" />
              </div>
            ))}
          </div>
        )}
      </>
    </>
  );
}
