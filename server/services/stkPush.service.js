const axios = require("axios");
const { generateAccessToken } = require("./mpesaAuth.service");
const {
  MPESA_BASE_URL,
  MPESA_SHORTCODE,
  MPESA_PASSKEY,
  CALLBACK_URL,
} = require("../config/env.js");
const { getTimestamp } = require("../utils/timestamp.js");
const { formatKenyanPhoneNumber } = require("../utils/phoneNumber.js");

async function initiatePayment(
  amount,
  phoneNumber,
  accountReference,
  transactionDesc
) {
  const accessToken = await generateAccessToken();
  const timestamp = getTimestamp();

  const password = Buffer.from(
    `${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`
  ).toString("base64");

  const formattedPhone = formatKenyanPhoneNumber(phoneNumber);

  const payload = {
    BusinessShortCode: MPESA_SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: formattedPhone,
    PartyB: MPESA_SHORTCODE,
    PhoneNumber: formattedPhone, // Use the same formatted number
    CallBackURL: CALLBACK_URL,
    AccountReference: accountReference,
    TransactionDesc: transactionDesc,
  };

  try {
    const response = await axios.post(
      `${MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    // Throw a more detailed error
    const errorMessage = error.response?.data?.errorMessage || 
                        error.response?.data?.errorCode || 
                        error.message || 
                        'Failed to initiate payment';
    throw new Error(`STK Push failed: ${errorMessage}`);
  }
}

module.exports = { initiatePayment };
