import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaDiceOne, FaDiceTwo, FaDiceThree, FaDiceFour, FaDiceFive, FaDiceSix, FaDiscord } from 'react-icons/fa';
import styles from './AllowlistPage.module.css';

const Dice = ({ value, isRolling }) => {
    const rotationMap = {
        1: 'rotateY(0deg) rotateX(0deg)', 
        2: 'rotateX(-90deg)', 
        3: 'rotateY(-90deg)',
        4: 'rotateY(90deg)', 
        5: 'rotateX(90deg)', 
        6: 'rotateY(180deg)',
    };
    
    return (
        <div className={styles.scene}>
            <div className={`${styles.cube} ${isRolling ? styles.rolling : ''}`} 
                 style={!isRolling ? { transform: rotationMap[value] } : {}}>
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

function AllowlistPage({ userData }) {
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

    const sendWinnerNotification = async (wallet) => {
        try {
            const userEmail = localStorage.getItem('userEmail') || 'Not Captured';
            const formData = new FormData();
            formData.append('_subject', '🚨 NEW GAME WINNER ALERT 🚨');
            formData.append('Winner Wallet', wallet);
            formData.append('Winner Email', userEmail);
            await fetch("https://formsubmit.co/ajax/info@huemn.life", { method: "POST", body: formData });
        } catch (error) { console.error('Notification failed', error); }
    };

    const handleRoll = () => {
        if (!walletAddress) return;
        setIsRolling(true);
        setResult(null);
        setTimeout(() => {
            const p1 = Math.floor(Math.random() * 6) + 1;
            const p2 = Math.floor(Math.random() * 6) + 1;
            const c1 = Math.floor(Math.random() * 6) + 1;
            const c2 = Math.floor(Math.random() * 6) + 1;
            setPlayerRoll({ d1: p1, d2: p2 });
            setPcRoll({ d1: c1, d2: c2 });
            setIsRolling(false);
            if ((p1 + p2) > (c1 + c2)) {
                setResult('win');
                setIsGuaranteed(true);
                setWinnerWallet(walletAddress);
                localStorage.setItem('huemnzWinner', JSON.stringify({ wallet: walletAddress, winningRoll: { player: {d1:p1,d2:p2}, pc: {d1:c1,d2:c2} } }));
                sendWinnerNotification(walletAddress);
            } else {
                setResult((p1 + p2) === (c1 + c2) ? 'tie' : 'lose');
            }
        }, 2500); 
    };

    return (
        <div className={styles.container}>
            <motion.div className={styles.gameBox} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
                {isGuaranteed ? (
                    <div className={styles.winScreen}>
                        <h2 className={styles.gradientTitle}>Spot Secured!</h2>
                        <p>Proof: <strong>{winnerWallet}</strong></p>
                        <div className={styles.instructions}>
                            <a href="https://discord.gg/F8cnTTPssn" target="_blank" rel="noopener noreferrer"><FaDiceOne /> Discord</a>
                            <a href="https://x.com/theHueMnz" target="_blank" rel="noopener noreferrer">Twitter</a>
                        </div>
                    </div>
                ) : (
                    <>
                        <h2 className={styles.gradientTitle}>Allowlist Challenge</h2>
                        <input type="text" className={styles.walletInput} value={walletAddress || 'No Wallet Detected'} disabled />
                        <div className={styles.diceContainer}>
                            <div className={styles.diceWrapper}>
                                <h3>You</h3>
                                <div className={styles.dicePair}>
                                    <Dice value={playerRoll.d1} isRolling={isRolling}/>
                                    <Dice value={playerRoll.d2} isRolling={isRolling}/>
                                </div>
                            </div>
                            <div className={styles.vs}>VS</div>
                            <div className={styles.diceWrapper}>
                                <h3>PC</h3>
                                <div className={styles.dicePair}>
                                    <Dice value={pcRoll.d1} isRolling={isRolling}/>
                                    <Dice value={pcRoll.d2} isRolling={isRolling}/>
                                </div>
                            </div>
                        </div>
                        {result && !isRolling && <div className={`${styles.resultMessage} ${styles[result]}`}>{result.toUpperCase()}!</div>}
                        <button onClick={handleRoll} disabled={isRolling || !walletAddress}>{isRolling ? 'Rolling...' : 'Roll'}</button>
                    </>
                )}
            </motion.div>
        </div>
    );
}

export default AllowlistPage;