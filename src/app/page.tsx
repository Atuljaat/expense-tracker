"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { UserStore } from "@/store/userStore";

export default function Home() {
  const router = useRouter()
  const { user } = UserStore()

  return (
    <div className={`text-4xl text-center bg-green-300 min-h-screen py-16 ${user.mode}`}>
      <div className="py-16" >
        Track You Expenses Easily with it
      </div>
      <div>
        <Button 
        className="px-8 cursor-pointer"
        onClick={ () => router.push('/expenses')}
        >
          Do it
        </Button>
      </div>
    </div>
  );
}
