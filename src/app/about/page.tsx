"use client"
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react';
import React from 'react'

const About = () => {
    const session = useSession();
    console.log(session?.data?.user);
    return (
        <div>
            <button className='btn btn-outline'
                onClick={() => signOut({ callbackUrl: "/login" })}>Sign Out</button>
        </div>
    )
}

export default About
