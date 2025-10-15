'use client'
import Image from "next/image";
import Header from "@/Components/Header";
import BlogList from "@/Components/BlogList";
import Footer from "@/Components/Footer";
export default function Home() {
  return (
    <>
     <Header/>
     <BlogList/>
     <Footer/>

    </>
  );
}
