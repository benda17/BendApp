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
                throw new Error("User not found or missing spreadsheet ID");
            }

            setUserName(userInfo.name);
            console.log(`✅ User found: ${userInfo.name} - Spreadsheet ID: ${userInfo.spreadsheetId}`);

            console.log(`📊 Fetching user data from Google Sheets...`);
            const data = await fetchClientData(userInfo.spreadsheetId);
            if (!data) {
                console.error(`❌ Failed to fetch data for spreadsheet ID: ${userInfo.spreadsheetId}`);
                throw new Error("Failed to fetch user data");
            }

            setClientData(data);
            console.log(`✅ User data loaded successfully!`);

        } catch (error) {
            console.error("🚨 Error loading client data:", error.message);
            setClientData(null);
            setUserName(null);
        }
    };

    return (
        <ClientsDataContext.Provider value={{ clientData, userName, loadClientData }}>
            {children}
        </ClientsDataContext.Provider>
    );
};

export const useClientsData = () => useContext(ClientsDataContext);
