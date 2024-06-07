"use client"
import { useEffect } from "react";
import { lusitana } from "../ui/fonts";
import { useRouter } from 'next/navigation';
import axiosInstance from "../axios-setup/axiosInstance";

export default function Page() {
  const router = useRouter();

  const fetchSomeData = async () => {
    try {
      const response = await axiosInstance.get('/tenant/roles');
      console.log(response.data);
    } catch (error:any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchSomeData();
  }, []);

  return <h1 className={`${lusitana.className}`}>Dashboard Page</h1>;
}
