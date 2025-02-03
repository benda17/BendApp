import React, { createContext, useState, useContext } from 'react';
import { fetchClientSpreadsheetId, fetchClientData } from './app/screens/ClientsData.js';

const ClientsDataContext = createContext();

export const ClientsDataProvider = ({ children }) => {
    const [clientData, setClientData] = useState(null);
    const [userName, setUserName] = useState(null);

    const loadClientData = async (userEmail) => {
        try {
            console.log(`🔍 Fetching spreadsheet ID for user: ${userEmail}`);

            const userInfo = await fetchClientSpreadsheetId(userEmail);
            if (!userInfo || !userInfo.spreadsheetId) {
                console.error(`❌ No spreadsheet ID found for user: ${userEmail}`);
                setClientData(null);
                setUserName(null);
                return false; // ⛔ Prevent user from logging in
            }

            setUserName(userInfo.name);
            console.log(`✅ User found: ${userInfo.name} - Spreadsheet ID: ${userInfo.spreadsheetId}`);

            console.log(`📊 Fetching user data from Google Sheets...`);
            const data = await fetchClientData(userInfo.spreadsheetId);
            if (!data) {
                console.error(`❌ Failed to fetch data for spreadsheet ID: ${userInfo.spreadsheetId}`);
                setClientData(null);
                setUserName(null);
                return false; // ⛔ Prevent login if data is missing
            }

            setClientData(data);
            console.log(`✅ User data loaded successfully!`);
            return true; // ✅ Successfully logged in

        } catch (error) {
            console.error("🚨 Error loading client data:", error.message);
            setClientData(null);
            setUserName(null);
            return false; // ⛔ Prevent login if error occurs
        }
    };

    return (
        <ClientsDataContext.Provider value={{ clientData, userName, loadClientData }}>
            {children}
        </ClientsDataContext.Provider>
    );
};

export const useClientsData = () => useContext(ClientsDataContext);
