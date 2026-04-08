<<<<<<< HEAD
"use client";

import { useUnit } from "effector-react";
import { motion } from "framer-motion";
import { $fundStats, $fundLoading } from "../../entities/fund/model/fund.store";
import { modalOpened } from "../../features/buy-points/model/buy-points.store";
import { ProgressBar } from "../../shared/ui/ProgressBar";
import { formatCompact } from "../../shared/lib/format";

export function FundCard() {
  const [stats, loading, openModal] = useUnit([
    $fundStats,
    $fundLoading,
    modalOpened,
  ]);

  if (loading && !stats) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-[14px] border border-white/20 p-3 min-h-[200px]"
      />
    );
  }

  const rate = stats?.wallet?.tonToPointsRate ?? 289.86;
  const pricePerPoint = rate > 0 ? 1 / rate : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rounded-[14px] border border-white/20 pt-[25px] px-[15px] pb-[15px] flex flex-col gap-[15px]"
    >
      <div className="flex items-center gap-1 text-[12px] text-[#F5F8FA]/75 leading-[120%]">
        <span>💎</span>
        <span>Total funds raised</span>
        <span className="ml-1">{stats?.totalRaised ?? 0} TON</span>
      </div>

      <ProgressBar value={stats?.progress ?? 0} />

      <p className="text-[10px] text-[#F5F8FA]/75 leading-[120%]">
        First round goal 1,000.00 TON
      </p>

      <div className="bg-[#253341] rounded-[10px] p-3 flex flex-col gap-[15px]">
        <div className="flex items-center gap-3">
          <img
            src="/dp-icon.svg"
            alt="dp"
            className="w-[38px] h-[38px] rounded-full shrink-0 object-cover"
          />
          <div className="flex-1 min-w-0 flex flex-col gap-[2px]">
            <p className="text-[12px] text-[#F5F8FA]/50 leading-[120%]">
              Drop Points price:
            </p>
            <p className="text-[16px] text-[#F5F8FA] leading-[120%]">
              {pricePerPoint.toFixed(2)} TON
            </p>
          </div>
          <button
            onClick={openModal}
            className="bg-white/10 hover:bg-white/15 active:scale-95 transition-all duration-150 rounded-[14px] px-[18px] h-[38px] text-[#F5F8FA] text-[14px] font-bold leading-[120%] shrink-0"
          >
            Buy
          </button>
        </div>

        <div className="border-t border-white/10 pt-[10px] flex items-center gap-1">
          <span className="text-sm">🔥</span>
          <span className="text-[10px] text-[#F5F8FA]/75 leading-[120%]">
            {formatCompact(stats?.membersCount ?? 0)} members &amp;{" "}
            {stats?.purchasedCount ?? 0} purchased
          </span>
        </div>
      </div>

      <button
        onClick={openModal}
        className="w-full h-[40px] bg-[#1D9BF0] hover:bg-[#1a8cdb] active:bg-[#1778c0] active:scale-[0.98] transition-all duration-150 rounded-[14px] text-[#F5F8FA] font-bold text-[14px] leading-[120%]"
      >
        Get drop points!
      </button>
    </motion.div>
  );
}
=======
"use client";

import { useUnit } from "effector-react";
import { motion } from "framer-motion";
import { $fundStats, $fundLoading } from "../../entities/fund/model/fund.store";
import { modalOpened } from "../../features/buy-points/model/buy-points.store";
import { ProgressBar } from "../../shared/ui/ProgressBar";
import { formatCompact } from "../../shared/lib/format";

export function FundCard() {
  const [stats, loading, openModal] = useUnit([
    $fundStats,
    $fundLoading,
    modalOpened,
  ]);

  if (loading && !stats) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-[14px] border border-white/20 p-3 min-h-[200px]"
      />
    );
  }

  const rate = stats?.wallet?.tonToPointsRate ?? 289.86;
  const pricePerPoint = rate > 0 ? 1 / rate : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rounded-[14px] border border-white/20 pt-[25px] px-[15px] pb-[15px] flex flex-col gap-[15px]"
    >
      <div className="flex items-center gap-1 text-[12px] text-[#F5F8FA]/75 leading-[120%]">
        <span>💎</span>
        <span>Total funds raised</span>
        <span className="ml-1">{stats?.totalRaised ?? 0} TON</span>
      </div>

      <ProgressBar value={stats?.progress ?? 0} />

      <p className="text-[10px] text-[#F5F8FA]/75 leading-[120%]">
        First round goal 1,000.00 TON
      </p>

      <div className="bg-[#253341] rounded-[10px] p-3 flex flex-col gap-[15px]">
        <div className="flex items-center gap-3">
          <img
            src="/dp-icon.svg"
            alt="dp"
            className="w-[38px] h-[38px] rounded-full shrink-0 object-cover"
          />
          <div className="flex-1 min-w-0 flex flex-col gap-[2px]">
            <p className="text-[12px] text-[#F5F8FA]/50 leading-[120%]">
              Drop Points price:
            </p>
            <p className="text-[16px] text-[#F5F8FA] leading-[120%]">
              {pricePerPoint.toFixed(2)} TON
            </p>
          </div>
          <button
            onClick={openModal}
            className="bg-white/10 hover:bg-white/15 active:scale-95 transition-all duration-150 rounded-[14px] px-[18px] h-[38px] text-[#F5F8FA] text-[14px] font-bold leading-[120%] shrink-0"
          >
            Buy
          </button>
        </div>

        <div className="border-t border-white/10 pt-[10px] flex items-center gap-1">
          <span className="text-sm">🔥</span>
          <span className="text-[10px] text-[#F5F8FA]/75 leading-[120%]">
            {formatCompact(stats?.membersCount ?? 0)} members &amp;{" "}
            {stats?.purchasedCount ?? 0} purchased
          </span>
        </div>
      </div>

      <button
        onClick={openModal}
        className="w-full h-[40px] bg-[#1D9BF0] hover:bg-[#1a8cdb] active:bg-[#1778c0] active:scale-[0.98] transition-all duration-150 rounded-[14px] text-[#F5F8FA] font-bold text-[14px] leading-[120%]"
      >
        Get drop points!
      </button>
    </motion.div>
  );
}
>>>>>>> d86c7279da28f6721dc1e5a5d6a696b2d080f758
