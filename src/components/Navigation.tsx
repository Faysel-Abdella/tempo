"use client";

import React, { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";
import sideBarContent from "@/data/sideBar";

const Navigation = ({
  order,
  mainTitle,
  init,
  firstRoute,
  route,
  icon,
  activeIcon,
  subTitles,
}: {
  order: string;
  mainTitle: string;
  init: string;
  firstRoute: string;
  route: string;
  icon: string;
  activeIcon: string;
  subTitles: Array<{ label: string; route: string }>;
}) => {
  const pathname = usePathname();
  const [currentOpened, setCurrentOpened] = useState(1);

  const extractAdminPath = (url: string) => {
    const regex = /^\/admin\/[^/]+/;
    const match = url.match(regex);
    if (match) {
      return match[0];
    }
    return null;
  };

  useEffect(() => {
    let storedOrder = localStorage.getItem("storedOrder");

    if (!storedOrder) {
      localStorage.setItem("storedOrder", "1");
      storedOrder = "1";
    }
    setCurrentOpened(parseInt(storedOrder, 10));
  }, []);

  const setSelectedOrder = (ord: string) => {
    setCurrentOpened(parseInt(ord, 10));
    localStorage.setItem("storedOrder", ord);
  };

  useEffect(() => {
    const newPath = extractAdminPath(pathname);

    for (let i = 0; i < sideBarContent.length; i++) {
      if (sideBarContent[i].init === newPath) {
        setSelectedOrder(sideBarContent[i].order);
      }
    }
  }, [pathname]);

  return (
    <section>
      <Link
        href={route}
        className={`flex cursor-pointer items-center justify-between rounded-xl px-6 py-3 ${
          order !== "1" ? "" : ""
        } ${
          pathname === firstRoute || pathname.includes(init)
            ? "bg-activeLink" // Background for active link
            : "bg-transparent"
        }`}
        onClick={() => setSelectedOrder(order)}
      >
        <div className="flex cursor-pointer items-center gap-4">
          {/* Icon */}
          <div>
            {pathname === firstRoute || pathname.includes(init) ? (
              <Image
                src={activeIcon}
                alt="Side bar icon"
                className="scale-[1.2] transform transition-all"
              />
            ) : (
              <Image
                src={icon}
                alt="Side bar icon"
                className="scale-100 transform transition-all"
              />
            )}
          </div>

          {/* Text */}
          <p
            className={`${
              pathname === firstRoute || pathname.includes(init)
                ? "text-white"
                : "text-mainGray"
            } text-[16px] font-bold leading-[22px] tracking-[-2%]`}
          >
            {mainTitle}
          </p>
        </div>
      </Link>

      {subTitles.length !== 0 && (
        <div
          className={`${
            parseInt(order) === currentOpened && pathname.includes(init)
              ? ""
              : "hidden"
          } flex flex-col gap-2 pl-11 pt-2`}
        >
          {subTitles.map((item, index) => (
            <Link
              href={item.route}
              key={index}
              onClick={() => setSelectedOrder(order)}
            >
              <div className="flex cursor-pointer items-center gap-2">
                <p
                  className={`text-base ${
                    pathname === item.route || pathname.includes(item.route)
                      ? "text-mainBlack"
                      : "text-mainGray"
                  } py-1 font-normal`}
                >
                  {item.label}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default Navigation;
