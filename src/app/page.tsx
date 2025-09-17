"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { UserStore } from "@/store/userStore";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const { user } = UserStore();

  return (
    <div className="min-h-screen robotoFont w-full bg-gradient-to-b from-[#f9fafb] to-[#f1f5f9] relative flex items-center justify-center px-6">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e2e8f0 1px, transparent 1px),
            linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
          `,
          backgroundSize: "20px 30px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`relative z-10 max-w-2xl text-center ${user.mode}`}
      >
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
          Track Your 
          <span className="text-pink-600 myExpensiveFont"> &quot;Expenses&quot;</span>
        </h1>

        <p className="text-lg md:text-xl font-bold  text-gray-600 mb-10">
          easy to track expenses  
        </p>

        <Button
          size="lg"
          className="px-10 py-6 text-lg font-medium rounded-2xl shadow-lg hover:shadow-xl hover:cursor-pointer bg-blue-300 hover:bg-blue-400 transition-all"
          onClick={() => router.push("/expenses")}
        >
          Get Started 😎
        </Button>
      </motion.div>
    </div>
  );
}
