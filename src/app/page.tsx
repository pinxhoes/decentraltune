'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Wallet } from "zksync-ethers";
import TopTracks from '../../components/TopTracks';
import { createWallet } from '../../utils/web3';

export default function Home() {
  const { data: session } = useSession()
  const [wallet, setWallet] = useState<Wallet | null>(null)

  useEffect(() => {
    async function initWallet() {
      if (session && !wallet) {
        try {
          const newWallet = await createWallet()
          setWallet(newWallet)
        } catch (error) {
          console.error("Failed to create wallet:", error)
        }
      }
    }
    initWallet()
  }, [session, wallet])

  if (!session) {
    return (
      <div>
        <h1>Welcome to DecentralTune</h1>
        <button onClick={() => signIn("spotify")}>Sign in with Spotify</button>
      </div>
    )
  }

  return (
    <div>
      <h1>Welcome, {session.user?.name}</h1>
      {wallet && <p>Your Abstract wallet address: {wallet.address}</p>}
      <TopTracks />
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  )
}