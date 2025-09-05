"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { XCircle } from "lucide-react";

export default function CancelPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.back();
      setTimeout(() => {
        router.back();
      }, 1);
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Cancelled
        </h1>
        <p className="text-gray-600 mb-4">
          Your payment was cancelled. No charges were made to your account.
        </p>
        <div className="flex items-center justify-center space-x-2 text-sm text-red-600">
          <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          <span>Redirecting back...</span>
        </div>
      </div>
    </div>
  );
}
