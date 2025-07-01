import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaDiceOne, FaDiceTwo, FaDiceThree, FaDiceFour, FaDiceFive, FaDiceSix, FaDiscord } from 'react-icons/fa';
import styles from './AllowlistPage.module.css';

const Dice = ({ value, isRolling }) => {
    const icons = [<FaDiceOne />, <FaDiceTwo />, <FaDiceThree />, <FaDiceFour />, <FaDiceFive />, <FaDiceSix />];
    // Apply the rolling animation class conditionally
    const diceClass = isRolling ? `${styles.diceIcon} ${styles.rolling}` : styles.diceIcon;
    return <div className={diceClass}>{icons[value - 1]}</div>;
};

function AllowlistPage({ userData }) {
    const [playerRoll, setPlayerRoll] = useState({ d1: 1, d2: 1 });
    const [pcRoll, setPcRoll] = useState({ d1: 1, d2: 1 });
    const [result, setResult] = useState(null);
    const [isGuaranteed, setIsGuaranteed] = useState(false);
    const [winnerWallet, setWinnerWallet] = useState('');

    const walletAddress = userData?.wallet || '';

    useEffect(() => {
        const winnerData = localStorage.getItem('huemnzWinner');
        if (winnerData) {
            const parsedData = JSON.parse(winnerData);
            if (parsedData.wallet === walletAddress) {
                setIsGuaranteed(true);
                setWinnerWallet(parsedData.wallet);
            }
        }
    }, [walletAddress]);

    const handleRoll = () => {
        setResult('rolling');
        setTimeout(() => {
            const finalPlayerRoll1 = Math.floor(Math.random() * 6) + 1;
            const finalPlayerRoll2 = Math.floor(Math.random() * 6) + 1;
            const finalPcRoll1 = Math.floor(Math.random() * 6) + 1;
            const finalPcRoll2 = Math.floor(Math.random() * 6) + 1;
            
            const playerTotal = finalPlayerRoll1 + finalPlayerRoll2;
            const pcTotal = finalPcRoll1 + finalPcRoll2;

            setPlayerRoll({ d1: finalPlayerRoll1, d2: finalPlayerRoll2 });
            setPcRoll({ d1: finalPcRoll1, d2: finalPcRoll2 });

            if (playerTotal > pcTotal) {
                setResult('win');
                setIsGuaranteed(true);
                setWinnerWallet(walletAddress);
                const winnerData = JSON.stringify({ status: 'winner', wallet: walletAddress });
                localStorage.setItem('huemnzWinner', winnerData);
            } else {
                setResult(playerTotal < pcTotal ? 'lose' : 'tie');
            }
        }, 2000); // Let the animation play for 2 seconds
    };
    
    const truncateWallet = (address) => address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : '';

    return (
        <div className={styles.container}>
            <motion.div 
                className={styles.gameBox}
                initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            >
                {isGuaranteed ? (
                    <div className={styles.winScreen}>
                        <h2>Spot Secured!</h2>
                        <p className={styles.walletProof}>Proof for Wallet: <strong>{truncateWallet(winnerWallet)}</strong></p>
                        <div className={styles.instructions}>
                            <h3>Redemption Steps:</h3>
                            <ol>
                                <li><strong>Screenshot this entire screen.</strong> This is your proof of victory.</li>
                                <li>Join our Discord server. <a href="https://discord.gg" target="_blank" rel="noopener noreferrer"><FaDiscord /> Join Server</a></li>
                                <li>Open a support ticket with the keyword: <strong>Dice Winner</strong></li>
                                <li>In the ticket, provide your screenshot and the full wallet address that matches the one above.</li>
                            </ol>
                        </div>
                    </div>
                ) : (
                    <>
                        <h2>The Allowlist Challenge</h2>
                        <p>Your wallet is locked in. Roll a higher total than the PC to win a guaranteed spot on the allowlist.</p>
                        
                        <input
                            type="text" className={styles.walletInput}
                            value={walletAddress ? `Playing with: ${truncateWallet(walletAddress)}` : 'No Wallet Connected'}
                            disabled
                        />

                        <div className={styles.diceContainer}>
                            <div className={styles.diceWrapper}>
                                <h3>Your Roll ({result !== 'rolling' ? playerRoll.d1 + playerRoll.d2 : '?'})</h3>
                                <div className={styles.dicePair}>
                                    <Dice value={playerRoll.d1} isRolling={result === 'rolling'} />
                                    <Dice value={playerRoll.d2} isRolling={result === 'rolling'} />
                                </div>
                            </div>
                            <div className={styles.vs}>VS</div>
                            <div className={styles.diceWrapper}>
                                <h3>PC's Roll ({result !== 'rolling' ? pcRoll.d1 + pcRoll.d2 : '?'})</h3>
                                <div className={styles.dicePair}>
                                    <Dice value={pcRoll.d1} isRolling={result === 'rolling'} />
                                    <Dice value={pcRoll.d2} isRolling={result === 'rolling'} />
                                </div>
                            </div>
                        </div>

                        {result && result !== 'rolling' && (
                            <motion.div className={`${styles.resultMessage} ${styles[result]}`} initial={{scale:0.5}} animate={{scale:1}}>
                                {result === 'win' && 'You Win!'}
                                {result === 'lose' && 'You Lose! Try Again.'}
                                {result === 'tie' && 'A Tie! Roll Again.'}
                            </motion.div>
                        )}
                        
                        {/* UPDATED BUTTON LOGIC */}
                        <button onClick={isGuaranteed ? null : handleRoll} disabled={result === 'rolling' || !walletAddress || isGuaranteed}>
                            {isGuaranteed ? 'Spot Secured' : (result === 'rolling' ? 'Rolling...' : 'Roll the Dice')}
                        </button>
                    </>
                )}
            </motion.div>
        </div>
    );
}

export default AllowlistPage;