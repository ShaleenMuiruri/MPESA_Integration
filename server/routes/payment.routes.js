// Payment routes
const express = require("express");
const router = express.Router();
const { initiatePayment } = require("../services/stkPush.service");
const logger = require("../utils/logger");
const { generateAccessToken } = require("../services/mpesaAuth.service");
const pusher = require('../config/pusher'); 


// Return M-Pesa access token
router.get("/token", async (req, res, next) => {
  try {
    const token = await generateAccessToken();
    res.status(200).json({ success: true, auth_token: token });
  } catch (error) {
    next(error);
  }
});

router.post("/stkpush", async (req, res, next) => {
  try {
    const { amount, phoneNumber, accountReference, transactionDesc } = req.body;

    if (!amount || !phoneNumber || !accountReference || !transactionDesc) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: amount, phoneNumber, accountReference, transactionDesc",
      });
    }

    const response = await initiatePayment(
      amount,
      phoneNumber,
      accountReference,
      transactionDesc
    );

    res.status(200).json({
      success: true,
      message: "STK Push initiated successfully",
      data: response,
    });
  } catch (error) {
    logger.error("Error in STK Push initiation", { error: error.message });
    next(error);
  }
});

router.post("/callback", (req, res, next) => {
  try {
    const callbackData = req.body.Body.stkCallback;
    const checkoutRequestId = callbackData.CheckoutRequestID;

    res.json({ ResultCode: 0, ResultDesc: "Accepted" });

    if (callbackData.ResultCode === 0) {
      // Payment successful
      const transactionDetails = callbackData.CallbackMetadata?.Item || [];
      logger.info("STK Push payment successful", { transactionDetails });
      // Save to DB

        // Trigger Pusher event for real-time client update
        pusher.trigger('mpesa-payments', 'payment-completed', {
          checkoutRequestId,
          status: 'success',
          resultCode: callbackData.ResultCode,
          transactionDetails,
          timestamp: new Date()
        });
        
    } else {
      // Payment failed
      logger.error("STK Push payment failed", {
        resultCode: callbackData.ResultCode,
        description: callbackData.ResultDesc,
      });
        // Trigger Pusher event for failed payment
        pusher.trigger('mpesa-payments', 'payment-failed', {
          checkoutRequestId,
          status: 'failed',
          resultCode: callbackData.ResultCode,
          description: callbackData.ResultDesc,
          timestamp: new Date()
        });
    }
  } catch (error) {
    logger.error("Error in callback processing", { error: error.message });
    next(error);
  }
});

module.exports = router;
