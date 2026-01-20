// src/utils/api.js

// TODO: Update this URL when the Rust backend is deployed
const API_BASE_URL = "http://localhost:8080/api"; 

export const syncUser = async (walletAddress) => {
    if (!walletAddress) return null;
    try {
        const response = await fetch(`${API_BASE_URL}/user/${walletAddress}`);
        if (!response.ok) throw new Error("User sync failed");
        return await response.json(); 
    } catch (error) {
        // Console error suppressed to avoid noise when backend is offline
        return null; 
    }
};

export const onboardUser = async (walletAddress, email, alias) => {
    try {
        const response = await fetch(`${API_BASE_URL}/onboard`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ wallet: walletAddress, email, alias }),
        });
        return await response.json();
    } catch (error) {
        console.error("Onboarding Error:", error);
    }
};

export const recordWin = async (walletAddress) => {
    try {
        const response = await fetch(`${API_BASE_URL}/win`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ wallet: walletAddress }),
        });
        return await response.json();
    } catch (error) {
        console.error("Win Record Error:", error);
    }
};