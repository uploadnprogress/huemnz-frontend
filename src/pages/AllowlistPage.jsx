/* src/pages/AllowlistPage.jsx snippet */
// ... imports ...

function AllowlistPage({ userData }) {
    // ... logic ...
    const walletAddress = userData?.wallet || '';

    return (
        <div className={styles.container}>
            <motion.div className={styles.gameBox}>
                {/* ... title ... */}
                <input 
                    type="text" 
                    className={styles.walletInput} 
                    value={walletAddress || 'No Wallet'} 
                    disabled 
                />
                {/* ... rest of component ... */}
            </motion.div>
        </div>
    );
}

export default AllowlistPage;