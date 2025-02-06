import API_KEY from './consts';

const USERS_SHEET_ID = "1qlH_Vxbo56ck_Sg9mE3JtrqvXYyGDWxLkEBl4KRG72E"; // Google Sheet containing user emails & their spreadsheet IDs
const USERS_SHEET_RANGE = "Sheet1!A:C"; // Columns: Name, Email, Spreadsheet ID

// Fetch the user's Google Sheet ID based on their email
export const fetchClientSpreadsheetId = async (userEmail) => {
  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${USERS_SHEET_ID}/values/${USERS_SHEET_RANGE}?key=${API_KEY}`
    );
    const data = await response.json();

    if (!data.values) throw new Error("No data found in user sheet");

    const users = data.values.map(row => ({
      name: row[0]?.trim() || "Unknown",
      email: row[1]?.trim() || "",
      spreadsheetId: row[2]?.trim() || ""
    }));

    const user = users.find(u => u.email === userEmail);
    if (!user) throw new Error("User not found");

    let spreadsheetId = user.spreadsheetId;

    // Extract the actual ID if it's a full URL
    if (spreadsheetId.includes("docs.google.com")) {
      const match = spreadsheetId.match(/\/d\/([a-zA-Z0-9-_]+)\//);
      if (match) {
        spreadsheetId = match[1]; // Extract ID from URL
      }
    }

    return { name: user.name, spreadsheetId };
  } catch (error) {
    console.error("Error fetching client spreadsheet ID:", error);
    return null;
  }
};

// Fetch client data from their personal Google Sheet
export const fetchClientData = async (spreadsheetId) => {
  const RANGE = 'MANAGEDBYBENDA!A:M';

  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${RANGE}?key=${API_KEY}&valueRenderOption=UNFORMATTED_VALUE`
    );
    const data = await response.json();

    if (!data.values || data.values.length < 2) throw new Error("No valid data found");

    const values = data.values[1];

    const convertGoogleSheetsDate = (serial) => {
      if (!serial || isNaN(serial)) return "N/A";
      const utcDays = Math.floor(serial);
      const milliseconds = utcDays * 24 * 60 * 60 * 1000;
      const excelEpoch = new Date(1899, 11, 30).getTime();
      return new Date(excelEpoch + milliseconds).toLocaleDateString();
    };

    const formatCurrency = (value) => {
      if (!value || isNaN(value)) return "$0";
      return "$" + new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Math.round(value));
    };

    return {
      SumOfOrders: values[0] || "0",
      SumOfSales: formatCurrency(values[1]),
      SumOfProfits: formatCurrency(values[2]),
      AveragePrice: formatCurrency(values[3]),
      AverageProfit: formatCurrency(values[4]),
      TotalHoursWorked: values[5] || "0",
      AmountOfProducts: values[6] || "0",
      DatePurchased: convertGoogleSheetsDate(values[7]),
      HoursPurchased: values[8] || "0",
      HoursLeftInBundle: values[9] || "0",
      SalesPast30Days: formatCurrency(values[10]),
      ProfitsPast30Days: formatCurrency(values[11]),
      ManagementCost30Days: formatCurrency(values[12]),
    };
  } catch (error) {
    console.error("Error fetching client data:", error);
    return null;
  }
};