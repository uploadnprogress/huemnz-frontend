import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { FaDiceOne, FaDiceTwo, FaDiceThree, FaDiceFour, FaDiceFive, FaDiceSix, FaDiscord } from 'react-icons/fa';
import styles from './AllowlistPage.module.css';

// This is the 3D Dice component
const Dice = ({ value, isRolling }) => {
    // CORRECTED FACES ARRAY: This now correctly maps the icon to the dice value.
    const faces = {
        1: <FaDiceOne />, 2: <FaDiceTwo />, 3: <FaDiceThree />, 
        4: <FaDiceFour />, 5: <FaDiceFive />, 6: <FaDiceSix />
    };

    // This mapping determines the final rotation to show the correct face.
    const rotationMap = {
        1: 'rotateX(0deg) rotateY(0deg)',
        2: 'rotateX(-180deg) rotateY(0deg)',
        3: 'rotateX(0deg) rotateY(-90deg)',
        4: 'rotateX(0deg) rotateY(90deg)',
        5: 'rotateX(90deg) rotateY(0deg)',
        6: 'rotateX(-90deg) rotateY(0deg)',
    };

    const cubeStyle = !isRolling 
        ? { transform: rotationMap[value] }
        : {};

    return (
        <div className={styles.scene}>
            <div className={`${styles.cube} ${isRolling ? styles.rolling : ''}`} style={cubeStyle}>
                <div className={`${styles.face} ${styles.front}`}>{faces[1]}</div>
                <div className={`${styles.face} ${styles.back}`}>{faces[2]}</div>
                <div className={`${styles.face} ${styles.right}`}>{faces[4]}</div>
                <div className={`${styles.face} ${styles.left}`}>{faces[3]}</div>
                <div className={`${styles.face} ${styles.top}`}>{faces[5]}</div>
                <div className={`${styles.face} ${styles.bottom}`}>{faces[6]}</div>
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
            }
        }
    }, [walletAddress]);

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
                setResult('win');
                setIsGuaranteed(true);
                setWinnerWallet(walletAddress);
                const winnerData = JSON.stringify({ status: 'winner', wallet: walletAddress });
                localStorage.setItem('huemnzWinner', winnerData);
            } else {
                setResult(playerTotal < pcTotal ? 'lose' : 'tie');
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
                        <button onClick={handleReset} className={styles.resetButton}>Reset Game (For Testing)</button>
                    </div>
                ) : (
                    <>
                        <h2>The Allowlist Challenge</h2>
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