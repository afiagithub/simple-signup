"use client"
import { useSession } from 'next-auth/react';
import React from 'react'

const About = () => {
    const session = useSession();
    console.log(session);
    return (
        <div>

        </div>
    )
}

export default About
