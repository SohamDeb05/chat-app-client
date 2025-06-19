import { useState } from "react";
import app from "./firebase";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const App = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [isVerified, setIsVerified] = useState(false);

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
      await confirmation.confirm(otp);
      alert("Phone number verified!");
      setIsVerified(true);
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <div>
      {!isVerified ? (
        <div>
          <h2>Phone OTP Login</h2>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number with country code"
          />
          <button onClick={sendOTP}>Send OTP</button>
          <br /><br />
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
          />
          <button onClick={verifyOTP}>Verify OTP</button>
          <div id="recaptcha-container"></div>
        </div>
      ) : (
        <h2>Welcome! Phone Verified.</h2>
      )}
    </div>
  );
};

export default App;
