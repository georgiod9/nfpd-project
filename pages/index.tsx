/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import { useEffect, useState } from "react";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useCandyMachine from "../hooks/useCandyMachine";
import useWalletBalance from "../hooks/useWalletBalance";
import { useWallet } from "@solana/wallet-adapter-react";

import { Toaster } from "react-hot-toast";
import Countdown from "react-countdown";
import useWalletNfts from "../hooks/useWalletNFTs";
import AnNFT from "../components/AnNFT/AnNFT";

import { Grid, Box, styled, Snackbar } from '@material-ui/core';

import Discord_logo from './assets/discord.png';
import Twitter_logo from './assets/twitter.png';
import CoverPhoto from './assets/cover-anim.gif';
import Image from 'next/image';

import Logo from './assets/logo-v3.png'

import styles from '../styles/myStyle.module.css';
import React from "react";
import { Button } from "@solana/wallet-adapter-react-ui/lib/Button";


export default function Home() {
  const [balance] = useWalletBalance();
  const {
    isSoldOut,
    mintStartDate,
    isMinting,
    startMint,
    startMintMultiple,
    nftsData,
  } = useCandyMachine();

  const [isLoading, nfts] = useWalletNfts();

  const { connected } = useWallet();

  const [isMintLive, setIsMintLive] = useState(false);

  var tempRemaining = 0;
  var tempAvailable = 0;

  useEffect(() => {
    if (new Date(mintStartDate).getTime() < Date.now()) {
      setIsMintLive(true);
    }
  }, []);

  const MintMany = () => {
    const [mintCount, setMintCount] = useState(5);

    return (
      <>
        <div className={styles.container_generic}>
          <div>
            <input
              disabled={isMinting}
              type="number"
              min={1}
              max={5}
              className="px-3 mx-3 mt-auto font-bold text-white bg-gray-500"
              value={mintCount}
              onChange={(e) => setMintCount((e.target as any).value)}
            />

          </div>
          <div>
            <Button
              onClick={() => startMintMultiple(mintCount)}
              disabled={isMinting}
              className={styles.button_mint}
            >
              {isMinting ? "loading" : `mint ${mintCount}`}
            </Button>

          </div>
          <p className="mx-auto mt-1">max. 5</p>

        </div>
      </>
    );
  };

  const gridStyle = { margin: "5vh auto", paddingLeft: 50, paddingRight: 50 };

  return (
    <>
      <div className={styles.container_page}>
        <div className={styles.header}>
          <Countdown
            className={styles.countdown}
            date={mintStartDate}
            onMount={({ completed }) => completed && setIsMintLive(true)}
            onComplete={() => setIsMintLive(true)}
          />
        </div>

        <Grid item container
          direction="row"
          style={gridStyle}>

          <Grid item xs={6}>

            <div className={styles.container_left}>

              <div className={styles.content_leftTitle}>NFPD</div>
              <div className={styles.content_leftText}>Do you have what it takes to be an officer of the metaverse?</div>
              <div className={styles.content_leftPrice}>Mint Price 0.1 SOL</div>
              <div className={styles.content_socials}>
                <a className={styles.content_discord} href="https://discord.gg/nfpd" target="_blank" rel="noopener noreferrer"> <Image src={Discord_logo} alt="discord server invite" /></a>
                <a className={styles.content_twitter} href="https://twitter.com/The_NFPD" target="_blank" rel="noopener noreferrer"> <Image src={Twitter_logo} alt="twitter page" /></a>
              </div>
            </div>


          </Grid>

          <Grid item xs={6}>
            <div className={styles.cover_image}>
              <Image  src={CoverPhoto} alt="pic" />
            </div>
            <div className={styles.container_right}>
              {connected
                &&
                <div>

                </div>
                &&
                <div className={styles.content_text}>
                  <span className={styles.colorText}> Wallet Balance: </span>{(balance || 0).toLocaleString()} SOL <br></br>

                  <span className={styles.colorText}>Minted: </span>{" "}
                  {nftsData.itemsAvailable - nftsData.itemsRemaining}/{nftsData.itemsAvailable}
                  <span> Highway Patrol Officers</span>{" "}

                </div>
              }


              <div className={styles.content_text}>
                {connected ? (
                  <>
                    {new Date(mintStartDate).getTime() < Date.now() ? (
                      <>
                        {isSoldOut ? (
                          <p>SOLD OUT</p>
                        ) : (
                          <>
                            <MintMany />
                          </>
                        )}
                      </>
                    ) : (
                      <p className={styles.styledContainer}>Minting hasn't started</p>
                    )}
                  </>
                ) : (
                  <p className={styles.content_text}>Connect Wallet to start minting</p>
                )}
              </div>

              {connected &&
                <div className={styles.wallet_container}>
                  <WalletMultiButton className={styles.multi_wallet} />
                </div>
              }

              <div >
                {!connected &&
                  <WalletMultiButton className={styles.connect_wallet} />
                }
              </div>



            </div>
          </Grid>

        </Grid>
      </div>
    </>
  );
}
