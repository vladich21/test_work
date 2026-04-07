"use client";

import { useEffect, useState } from "react";
import { useUnit } from "effector-react";
import { motion } from "framer-motion";
import { fundMounted } from "../../entities/fund/model/fund.store";
import { transactionsMounted } from "../../entities/transaction/model/transaction.store";
import { FundCard } from "../../widgets/fund-card/FundCard";
import { TransactionList } from "../../widgets/transaction-list/TransactionList";
import { BuyModal } from "../../widgets/buy-modal/BuyModal";

interface TmaUser {
  id: number;
  username?: string;
  firstName?: string;
  rank?: number;
  points?: number;
}

function useTmaUser(): TmaUser {
  const [user, setUser] = useState<TmaUser>({
    id: 0,
    username: "Username",
    firstName: "User",
    rank: 2932,
    points: 26031,
  });

  useEffect(() => {
    import("@tma.js/sdk")
      .then(({ retrieveLaunchParams }) => {
        try {
          const { tgWebAppData } = retrieveLaunchParams();
          const tgUser = tgWebAppData?.user;
          if (tgUser && typeof tgUser === "object" && "id" in tgUser) {
            const { id, username, firstName } = tgUser as {
              id: number;
              username?: string;
              firstName?: string;
            };
            setUser({ id, username, firstName, rank: 0, points: 0 });
          }
        } catch {}
      })
      .catch(() => {});
  }, []);

  return user;
}

function closeMiniApp() {
  import("@tma.js/sdk")
    .then(({ miniApp, init }) => {
      try {
        init();
        miniApp.close();
      } catch {}
    })
    .catch(() => {});
}

function BottomNav() {
  const [activeIndex, setActiveIndex] = useState(0);

  const navIcons = [
    <svg
      key="pig"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 9c0-1-.4-2-1-2.8M12 4C9.2 4 7 6.2 7 9c0 1.4.6 2.7 1.5 3.6L8 20h8l-.5-7.4A5 5 0 0017 9M10 20h4"
      />
      <circle cx="15" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>,
    <svg
      key="bulb"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    </svg>,
    <svg
      key="chat"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>,
    <svg
      key="person"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
      />
    </svg>,
    <svg
      key="menu"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>,
  ];

  return (
    <nav className="shrink-0 bg-[#253341] border-t border-white/10">
      <div className="flex items-center justify-around px-2 py-2 pb-safe">
        {navIcons.map((icon, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`flex items-center justify-center p-3 rounded-xl transition-all duration-200 active:scale-90 ${
              activeIndex === index
                ? "text-[#1D9BF0]"
                : "text-[#AAB8C2] hover:text-[#F5F8FA]"
            }`}
          >
            {icon}
          </button>
        ))}
      </div>
    </nav>
  );
}

export function MainPage() {
  const [onFundMount, onTransactionMount] = useUnit([
    fundMounted,
    transactionsMounted,
  ]);
  const user = useTmaUser();

  useEffect(() => {
    onFundMount();
    onTransactionMount();
  }, [onFundMount, onTransactionMount]);

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", damping: 28, stiffness: 260 }}
      className="h-dvh flex flex-col max-w-[475px] mx-auto bg-[#2F2F33] overflow-hidden rounded-t-[10px]"
    >
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="shrink-0 relative flex items-center justify-between px-4 pt-5 pb-3"
      >
        <button
          onClick={closeMiniApp}
          className="text-[#007AFF] text-[17px] font-normal hover:opacity-75 transition-opacity active:opacity-50 z-10"
        >
          Cancel
        </button>
        <div className="absolute inset-x-0 text-center pointer-events-none">
          <p className="text-[#F5F8FA] font-bold text-[16px] leading-[22px]">
            Open Foundation
          </p>
          <p className="text-[#F5F8FA]/50 text-[13px] leading-[18px]">
            mini-app
          </p>
        </div>
        <button className="w-[28px] h-[28px] rounded-full border border-[#007AFF] bg-transparent hover:bg-[#007AFF]/10 active:scale-90 transition-all flex items-center justify-center z-10">
          <span className="text-[#007AFF] text-[10px] font-bold leading-none tracking-widest">
            •••
          </span>
        </button>
      </motion.header>

      <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 flex flex-col gap-5">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="flex items-center gap-3"
        >
          <img
            src="/avatar.svg"
            alt="avatar"
            className="w-[45px] h-[45px] rounded-full shrink-0 object-cover"
          />
          <div className="flex-1 min-w-0 flex flex-col gap-1">
            <p className="text-[#F5F8FA] font-normal text-[16px] leading-[120%] truncate">
              {user.username ?? user.firstName ?? "Username"}
            </p>
            <p className="text-[#AAB8C2] text-[10px] leading-[120%] opacity-50">
              Your rank #{user.rank ?? "—"}
            </p>
          </div>

          <div className="relative border border-white/20 rounded-[10px] w-[93px] h-[43px] shrink-0 flex flex-col justify-between pt-2 px-3 pb-1">
            <p className="text-[#F5F8FA] font-bold text-[14px] leading-[120%] text-center">
              {user.points?.toLocaleString("en-US") ?? "0"}
            </p>
            <div className="absolute bottom-0 left-0 right-0 flex justify-center translate-y-1/2">
              <span className="bg-[#2F2F33] px-1 text-[#F5F8FA]/75 text-[10px] leading-none">
                Points
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-[10px]"
        >
          <p className="text-[#AAB8C2] text-[16px] leading-[120%]">
            Create sustained impact. Support verified projects. Get regular
            updates. Save tax. Use web3.
          </p>
          <button className="w-full bg-white/10 hover:bg-white/15 active:bg-white/5 transition-colors rounded-[14px] h-[40px] text-[14px] text-[#F5F8FA] font-bold leading-[120%]">
            Read More
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <FundCard />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <TransactionList />
        </motion.div>
      </div>

      <BottomNav />
      <BuyModal />
    </motion.div>
  );
}
