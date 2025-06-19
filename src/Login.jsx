import React, { useState } from "react";
import app from "./firebase";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const Login = ({ setWallet }) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  const auth = getAuth(app);

  const sendOTP = async () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: (response) => {
        // reCAPTCHA solved
      },
    });

    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
      setConfirmation(confirmationResult);
      alert("OTP Sent!");
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const verifyOTP = async () => {
    try {
      const result = await confirmation.confirm(otp);
      const user = result.user;
      const phoneNumber = user.phoneNumber;

      alert("Phone number verified!");

      // ✅ Send verified phone number to backend (Node.js + PostgreSQL)
      await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneNumber })   // send the phone to backend
      });

      setWallet("user-verified"); // Example setWallet state change
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Enter phone number with country code"
      />
      <button onClick={sendOTP}>Send OTP</button>

      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
      />
      <button onClick={verifyOTP}>Verify OTP</button>

      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Login;
