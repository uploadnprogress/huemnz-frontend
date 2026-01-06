import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { FaDiceOne, FaDiceTwo, FaDiceThree, FaDiceFour, FaDiceFive, FaDiceSix, FaDiscord, FaTwitter } from 'react-icons/fa';
import styles from './AllowlistPage.module.css';

const Dice = ({ value, isRolling }) => {
    const rotationMap = {
        1: 'rotateY(0deg)   rotateX(0deg)',
        2: 'rotateX(-90deg)',
        3: 'rotateY(-90deg)',
        4: 'rotateY(90deg)',
        5: 'rotateX(90deg)',
        6: 'rotateY(180deg)',
    };
    const cubeStyle = !isRolling ? { transform: rotationMap[value] } : {};
    return (
        <div className={styles.scene}>
            <div className={`${styles.cube} ${isRolling ? styles.rolling : ''}`} style={cubeStyle}>
                <div className={`${styles.face} ${styles.front}`}><FaDiceOne /></div>
                <div className={`${styles.face} ${styles.back}`}><FaDiceSix /></div>
                <div className={`${styles.face} ${styles.right}`}><FaDiceThree /></div>
                <div className={`${styles.face} ${styles.left}`}><FaDiceFour /></div>
                <div className={`${styles.face} ${styles.top}`}><FaDiceTwo /></div>
                <div className={`${styles.face} ${styles.bottom}`}><FaDiceFive /></div>
            </div>
        </div>
    );
};

function AllowlistPage() {
    const { userData } = useOutletContext();
    const [playerRoll, setPlayerRoll] = useState({ d1: 1, d2: 1 });
    const [pcRoll, setPcRoll] = useState({ d1: 1, d2: 1 });
    const [result, setResult] = useState(null);
    const [isRolling, setIsRolling] = useState(false);
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
                if(parsedData.winningRoll) {
                    setPlayerRoll(parsedData.winningRoll.player);
                    setPcRoll(parsedData.winningRoll.pc);
                }
            }
        }
    }, [walletAddress]);

    // --- SILENT ALARM: Sends email on win ---
    const sendWinnerNotification = async (wallet) => {
        try {
            const formData = new FormData();
            formData.append('Winner Wallet', wallet);
            formData.append('_subject', '🚨 NEW GAME WINNER ALERT 🚨');
            formData.append('Message', `A user just secured an allowlist spot.\nWallet: ${wallet}`);

            await fetch("https://formsubmit.co/ajax/info@huemn.life", {
                method: "POST",
                body: formData
            });
            console.log('Admin notified of win.');
        } catch (error) {
            console.error('Silent alarm failed:', error);
        }
    };

    const handleRoll = () => {
        if (!walletAddress) {
            alert('Your wallet address is not available. This can happen if you clear your browser data. Please re-enter through the main welcome page.');
            return;
        }
        setIsRolling(true);
        setResult(null);
        setTimeout(() => {
            const finalPlayerRoll1 = Math.floor(Math.random() * 6) + 1;
            const finalPlayerRoll2 = Math.floor(Math.random() * 6) + 1;
            const finalPcRoll1 = Math.floor(Math.random() * 6) + 1;
            const finalPcRoll2 = Math.floor(Math.random() * 6) + 1;
            const playerTotal = finalPlayerRoll1 + finalPlayerRoll2;
            const pcTotal = finalPcRoll1 + finalPcRoll2;
            setPlayerRoll({ d1: finalPlayerRoll1, d2: finalPlayerRoll2 });
            setPcRoll({ d1: finalPcRoll1, d2: finalPcRoll2 });
            setIsRolling(false);
            
            if (playerTotal > pcTotal) {
                // WIN CONDITION
                setResult('win');
                setIsGuaranteed(true);
                setWinnerWallet(walletAddress);
                
                // Save to Local Storage
                const winnerData = JSON.stringify({ 
                    status: 'winner', 
                    wallet: walletAddress,
                    winningRoll: {
                        player: { d1: finalPlayerRoll1, d2: finalPlayerRoll2 },
                        pc: {d1: finalPcRoll1, d2: finalPcRoll2}
                    }
                });
                localStorage.setItem('huemnzWinner', winnerData);

                // TRIGGER SILENT ALARM
                sendWinnerNotification(walletAddress);

            } else if (playerTotal < pcTotal) {
                setResult('lose');
            } else {
                setResult('tie');
            }
        }, 2500); 
    };
    
    const handleReset = () => {
        localStorage.removeItem('huemnzWinner');
        setIsGuaranteed(false);
        setWinnerWallet('');
        setResult(null);
        setPlayerRoll({ d1: 1, d2: 1 });
        setPcRoll({ d1: 1, d2: 1 });
    };

    const truncateWallet = (address) => address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : '';

    return (
        <div className={styles.container}>
            <motion.div 
                className={styles.gameBox}
                initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            >
                {isGuaranteed ? (
                    <>
                        <div className={styles.diceContainer}>
                            <div className={styles.diceWrapper}>
                                <h3>Your Winning Roll ({playerRoll.d1 + playerRoll.d2})</h3>
                                <div className={styles.dicePair}>
                                    <Dice value={playerRoll.d1} isRolling={false} />
                                    <Dice value={playerRoll.d2} isRolling={false} />
                                </div>
                            </div>
                            <div className={styles.vs}>VS</div>
                            <div className={styles.diceWrapper}>
                                <h3>PC's Roll ({pcRoll.d1 + pcRoll.d2})</h3>
                                <div className={styles.dicePair}>
                                    <Dice value={pcRoll.d1} isRolling={false} />
                                    <Dice value={pcRoll.d2} isRolling={false} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.winScreen}>
                            <h2 className={styles.gradientTitle}>Spot Secured!</h2>
                            <p className={styles.walletProof}>Proof for Wallet: <strong>{truncateWallet(winnerWallet)}</strong></p>
                            <div className={styles.instructions}>
                                <h3>Redemption Steps:</h3>
                                <ol>
                                    <li><strong>Screenshot this entire screen.</strong> This is your proof of victory.</li>
                                    <li>
                                        Join our Discord server. 
                                        <a href="https://discord.gg/F8cnTTPssn" target="_blank" rel="noopener noreferrer" style={{marginLeft: '5px'}}>
                                            <FaDiscord /> Join Server
                                        </a>
                                    </li>
                                    <li>
                                        Follow us on X.
                                        <a href="https://x.com/theHueMnz" target="_blank" rel="noopener noreferrer" style={{marginLeft: '5px'}}>
                                            <FaTwitter /> @theHueMnz
                                        </a>
                                    </li>
                                    <li>Open a support ticket with the keyword: <strong>Dice Winner</strong></li>
                                    <li>In the ticket, provide your screenshot and the full wallet address that matches the one above.</li>
                                </ol>
                            </div>
                            <button onClick={handleReset} className={styles.resetButton}>Reset Game (For Testing)</button>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className={styles.gradientTitle}>The Allowlist Challenge</h2>
                        <p>Your wallet is locked in. Roll a higher total than the PC to win a guaranteed spot on the allowlist.</p>
                        
                        <input
                            type="text"
                            className={styles.walletInput}
                            value={walletAddress ? `Playing with: ${truncateWallet(walletAddress)}` : 'No Wallet Connected'}
                            disabled
                        />

                        <div className={styles.diceContainer}>
                            <div className={styles.diceWrapper}>
                                <h3>Your Roll ({isRolling ? '...' : playerRoll.d1 + playerRoll.d2})</h3>
                                <div className={styles.dicePair}>
                                    <Dice value={playerRoll.d1} isRolling={isRolling} />
                                    <Dice value={playerRoll.d2} isRolling={isRolling} />
                                </div>
                            </div>
                            <div className={styles.vs}>VS</div>
                            <div className={styles.diceWrapper}>
                                <h3>PC's Roll ({isRolling ? '...' : pcRoll.d1 + pcRoll.d2})</h3>
                                <div className={styles.dicePair}>
                                    <Dice value={pcRoll.d1} isRolling={isRolling} />
                                    <Dice value={pcRoll.d2} isRolling={isRolling} />
                                </div>
                            </div>
                        </div>

                        {result && !isRolling && (
                            <motion.div className={`${styles.resultMessage} ${styles[result]}`} initial={{scale:0.5}} animate={{scale:1}}>
                                {result === 'win' && 'You Win!'}
                                {result === 'lose' && 'You Lose! Try Again.'}
                                {result === 'tie' && 'A Tie! Roll Again.'}
                            </motion.div>
                        )}
                        
                        <button onClick={handleRoll} disabled={isRolling || !walletAddress}>
                            {isRolling ? 'Rolling...' : 'Roll the Dice'}
                        </button>
                    </>
                )}
            </motion.div>
        </div>
    );
}

export default AllowlistPage;