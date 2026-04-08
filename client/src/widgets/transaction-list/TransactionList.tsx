<<<<<<< HEAD
'use client';

import { useUnit } from 'effector-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { $transactions, $topHolders, $transactionsLoading } from '../../entities/transaction/model/transaction.store';
import { Transaction } from '../../entities/transaction/api/transaction.api';

const TABS = ['Holders leaderboard', 'Latest transfers', 'TOP users'] as const;
type Tab = (typeof TABS)[number];

const SF_PRO: React.CSSProperties = {
  fontFamily: '-apple-system, "SF Pro Text", BlinkMacSystemFont, sans-serif',
};

function UserAvatar({ user, size = 55 }: { user: Transaction['user']; size?: number }) {
  const initial = user?.firstName?.[0] ?? user?.username?.[0] ?? '?';

  if (user?.photoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={user.photoUrl}
        alt={user.username ?? 'user'}
        className="rounded-full object-cover shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className="rounded-full bg-[#253341] flex items-center justify-center shrink-0 text-[#1D9BF0] font-bold text-sm"
      style={{ width: size, height: size }}
    >
      {initial.toUpperCase()}
    </div>
  );
}

function TransactionRow({ tx, rank }: { tx: Transaction; rank?: number }) {
  const name = tx.user?.username ?? tx.user?.firstName ?? tx.userId.slice(0, 8);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-3 px-3 py-[6px]"
    >
      <UserAvatar user={tx.user} size={55} />
      <div className="flex-1 min-w-0 flex flex-col gap-[3px]">
        <p className="text-[#F5F8FA] text-[16px] leading-[120%] truncate">{name}</p>
        <p className="text-[#636363] text-[14px] leading-[120%]">
          {parseFloat(tx.amount).toFixed(2)} {tx.currency}
        </p>
      </div>
      {rank != null && (
        <span className="text-[#636363] text-[14px] leading-[120%] shrink-0">#{rank}</span>
      )}
    </motion.div>
  );
}

export function TransactionList() {
  const [activeTab, setActiveTab] = useState<Tab>('Holders leaderboard');
  const [transactions, topHolders, loading] = useUnit([$transactions, $topHolders, $transactionsLoading]);

  const displayList: Transaction[] =
    activeTab === 'Latest transfers'
      ? [...transactions].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      : topHolders;

  return (
    <div className="mt-2">
      <div className="flex gap-[10px] overflow-x-auto no-scrollbar" style={{ marginBottom: '10px' }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={SF_PRO}
            className={`shrink-0 h-[30px] px-3 rounded-[10px] text-[12px] leading-none transition-all duration-200 ${
              activeTab === tab
                ? 'bg-[#F5F8FA] text-[#253341] font-semibold'
                : 'bg-[rgba(116,116,128,0.12)] text-[#AAB8C2] hover:text-[#F5F8FA]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="border border-[rgba(116,116,128,0.12)] rounded-[12px] max-h-[300px] overflow-y-auto overscroll-contain">
        {loading && displayList.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-[120px]" />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="divide-y divide-[rgba(116,116,128,0.08)]"
            >
              {displayList.length === 0 ? (
                <p className="text-[#AAB8C2] text-sm text-center py-6">No data yet</p>
              ) : (
                displayList.map((tx, index) => (
                  <TransactionRow key={tx.id} tx={tx} rank={index + 1} />
                ))
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
=======
'use client';

import { useUnit } from 'effector-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { $transactions, $topHolders, $transactionsLoading } from '../../entities/transaction/model/transaction.store';
import { Transaction } from '../../entities/transaction/api/transaction.api';

const TABS = ['Holders leaderboard', 'Latest transfers', 'TOP users'] as const;
type Tab = (typeof TABS)[number];

const SF_PRO: React.CSSProperties = {
  fontFamily: '-apple-system, "SF Pro Text", BlinkMacSystemFont, sans-serif',
};

function UserAvatar({ user, size = 55 }: { user: Transaction['user']; size?: number }) {
  const initial = user?.firstName?.[0] ?? user?.username?.[0] ?? '?';

  if (user?.photoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={user.photoUrl}
        alt={user.username ?? 'user'}
        className="rounded-full object-cover shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className="rounded-full bg-[#253341] flex items-center justify-center shrink-0 text-[#1D9BF0] font-bold text-sm"
      style={{ width: size, height: size }}
    >
      {initial.toUpperCase()}
    </div>
  );
}

function TransactionRow({ tx, rank }: { tx: Transaction; rank?: number }) {
  const name = tx.user?.username ?? tx.user?.firstName ?? tx.userId.slice(0, 8);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-3 px-3 py-[6px]"
    >
      <UserAvatar user={tx.user} size={55} />
      <div className="flex-1 min-w-0 flex flex-col gap-[3px]">
        <p className="text-[#F5F8FA] text-[16px] leading-[120%] truncate">{name}</p>
        <p className="text-[#636363] text-[14px] leading-[120%]">
          {parseFloat(tx.amount).toFixed(2)} {tx.currency}
        </p>
      </div>
      {rank != null && (
        <span className="text-[#636363] text-[14px] leading-[120%] shrink-0">#{rank}</span>
      )}
    </motion.div>
  );
}

export function TransactionList() {
  const [activeTab, setActiveTab] = useState<Tab>('Holders leaderboard');
  const [transactions, topHolders, loading] = useUnit([$transactions, $topHolders, $transactionsLoading]);

  const displayList: Transaction[] =
    activeTab === 'Latest transfers'
      ? [...transactions].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      : topHolders;

  return (
    <div className="mt-2">
      <div className="flex gap-[10px] overflow-x-auto no-scrollbar" style={{ marginBottom: '10px' }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={SF_PRO}
            className={`shrink-0 h-[30px] px-3 rounded-[10px] text-[12px] leading-none transition-all duration-200 ${
              activeTab === tab
                ? 'bg-[#F5F8FA] text-[#253341] font-semibold'
                : 'bg-[rgba(116,116,128,0.12)] text-[#AAB8C2] hover:text-[#F5F8FA]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="border border-[rgba(116,116,128,0.12)] rounded-[12px] max-h-[300px] overflow-y-auto overscroll-contain">
        {loading && displayList.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-[120px]" />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="divide-y divide-[rgba(116,116,128,0.08)]"
            >
              {displayList.length === 0 ? (
                <p className="text-[#AAB8C2] text-sm text-center py-6">No data yet</p>
              ) : (
                displayList.map((tx, index) => (
                  <TransactionRow key={tx.id} tx={tx} rank={index + 1} />
                ))
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
>>>>>>> d86c7279da28f6721dc1e5a5d6a696b2d080f758
