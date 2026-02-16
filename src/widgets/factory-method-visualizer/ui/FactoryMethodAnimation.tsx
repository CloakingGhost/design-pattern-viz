import { motion, AnimatePresence } from "framer-motion";
import { FactoryMethodAnimationState } from "@/shared/types";
import { CreditCard, Banknote, Building2, Wallet } from "lucide-react";
import { cn } from "@/shared/lib";

interface FactoryMethodAnimationProps {
  state: FactoryMethodAnimationState;
}

export function FactoryMethodAnimation({ state }: FactoryMethodAnimationProps) {
  const {
    currentFactory,
    paymentType,
    financialInfo,
    createdPayment,
    paymentResult,
    resultMessage,
  } = state;

  return (
    <div className="w-full h-170 flex flex-col bg-slate-50 rounded-xl overflow-hidden border border-slate-200">
      {/* 상태 메시지 영역 */}

      {/* 메인 시각화 영역 */}
      <div className="flex-1 p-8 relative flex flex-col items-center justify-center space-y-12">
        {/* Client / Abstract Layer */}
        <div className="w-full max-w-2xl flex justify-between items-start z-10">
          {/* Client & Financial Info */}
          <div className="flex flex-col items-center space-y-4">
            <div
              className={`p-4 rounded-xl border-2 transition-colors duration-300 ${
                financialInfo
                  ? "bg-blue-50 border-blue-200"
                  : "bg-slate-100 border-slate-200"
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  C
                </div>
                <span className="font-bold text-slate-700">Client</span>
              </div>

              {financialInfo && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-3 rounded-lg border border-blue-100 text-xs shadow-sm space-y-1"
                >
                  <p className="font-semibold text-blue-600">FinancialInfo</p>
                  <p className="text-slate-500">
                    Card: {financialInfo.cardNumber?.slice(0, 4)}...
                  </p>
                  <p className="text-slate-500">
                    Email: {financialInfo.email?.split("@")[0]}...
                  </p>
                </motion.div>
              )}
            </div>

            {/* Payment Method Selection / Result */}
            {paymentResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold shadow-sm border border-green-200"
              >
                {paymentResult}
              </motion.div>
            )}
          </div>

          {/* Abstract Factory Representation */}
          <div className="flex flex-col items-center">
            <div className="p-4 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/50 mb-4 opacity-50">
              <span className="text-sm font-semibold text-slate-400">
                {"<<Abstract>>"}
              </span>
              <div className="font-bold text-slate-500">PaymentFactory</div>
            </div>

            {/* Abstract Product Representation */}
            <div className="p-4 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/50 opacity-50">
              <span className="text-sm font-semibold text-slate-400">
                {"<<Interface>>"}
              </span>
              <div className="font-bold text-slate-500">Payment</div>
            </div>
          </div>
        </div>

        {/* Concrete Layer - Factories & Products */}
        <div className="w-full max-w-4xl grid grid-cols-2 gap-8 relative">
          {/* Credit Card Factory Zone */}
          <div
            className={cn(
              "rounded-2xl p-6 border-2 transition-all duration-500 flex flex-col items-center min-h-[200px]",
              currentFactory === "CreditCardPaymentFactory"
                ? "border-indigo-400 bg-indigo-50 shadow-md"
                : "border-slate-100 bg-slate-50 opacity-60",
            )}
          >
            <div className="font-bold text-indigo-700 mb-4 flex items-center space-x-2">
              <Building2 size={20} />
              <span>CreditCardFactory</span>
            </div>

            <AnimatePresence>
              {currentFactory === "CreditCardPaymentFactory" &&
                paymentType === "CreditCardPayment" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="bg-white p-4 rounded-xl shadow-lg border-2 border-indigo-200 flex flex-col items-center space-y-2 mt-4"
                  >
                    <CreditCard className="text-indigo-500 w-10 h-10" />
                    <span className="font-bold text-slate-700">
                      CreditCardPayment
                    </span>
                  </motion.div>
                )}
            </AnimatePresence>
          </div>

          {/* PayPal Factory Zone */}
          <div
            className={cn(
              "rounded-2xl p-6 border-2 transition-all duration-500 flex flex-col items-center min-h-[200px]",
              currentFactory === "PayPalPaymentFactory"
                ? "border-sky-400 bg-sky-50 shadow-md"
                : "border-slate-100 bg-slate-50 opacity-60",
            )}
          >
            <div className="font-bold text-sky-700 mb-4 flex items-center space-x-2">
              <Wallet size={20} />
              <span>PayPalFactory</span>
            </div>
            <AnimatePresence>
              {currentFactory === "PayPalPaymentFactory" &&
                paymentType === "PayPalPayment" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="bg-white p-4 rounded-xl shadow-lg border-2 border-sky-200 flex flex-col items-center space-y-2 mt-4"
                  >
                    <Banknote className="text-sky-500 w-10 h-10" />
                    <span className="font-bold text-slate-700">
                      PayPalPayment
                    </span>
                  </motion.div>
                )}
            </AnimatePresence>
          </div>

          {/* Connection Lines (Simulated with absolute positioning or SVG if needed, kept simple for now) */}
        </div>

        {/* Delivered Product to Client */}
        <AnimatePresence>
          {createdPayment && !paymentResult && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: -200, x: -150, scale: 0.8 }}
              transition={{ duration: 0.8, type: "spring" }}
              className={cn(
                "absolute bottom-0 p-3 rounded-lg shadow-xl border-2 z-20 flex items-center space-x-2",
                createdPayment === "CreditCardPayment"
                  ? "bg-indigo-600 border-indigo-700 text-white"
                  : "bg-sky-600 border-sky-700 text-white",
              )}
            >
              {createdPayment === "CreditCardPayment" ? (
                <CreditCard size={16} />
              ) : (
                <Banknote size={16} />
              )}
              <span className="font-bold text-sm">Valid {createdPayment}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="p-4 bg-white border-b border-slate-100 min-h-15 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={resultMessage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-slate-600 font-medium text-center"
          >
            {resultMessage}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
