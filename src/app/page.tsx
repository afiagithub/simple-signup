import Link from "next/link";

export default function Home() {
  
  return (
    <div className="flex flex-col items-center justify-items-center mt-16 font-man">
      <h1 className="text-5xl font-semibold">Simple Signup</h1>
      <div className="flex flex-row items-center justify-center gap-5 mt-10">
        <Link href={'/signup'} className="btn btn-neutral">Sign Up</Link>
        <Link href={'/login'} className="btn btn-info">Login</Link>
      </div>
    </div>
  );
}
