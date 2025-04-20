import React from 'react'
import Link from 'next/link'
export default function Header() {
    return (
        <>
    <header className="bg-white shadow-md">
        <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
        <Link href={"/"}>
        <div className='flex items-center cursor-pointer'>
            <span className="text-primary font-bold text-xl">Website Genetator</span>
        </div>
        </Link>
        <nav className="flex space-x-6">
            <Link href={"/"} className="text-dark hover:text-primary transition-colors">Home</Link>
            <Link href={"projects"} className="text-dark hover:text-primary transition-colors">My Projects</Link>
            <Link href={"/about"} className="text-dark hover:text-primary transition-colors">About</Link>
        </nav>
        </div>
    </header>
        </>
    )
}