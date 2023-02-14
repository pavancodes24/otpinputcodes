import React, { useState, useRef } from "react";

function OtpInput({ length = 4, onChange }) {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  const focusNextInput = (index) => {
    if (index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const focusPrevInput = (index) => {
    if (index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);

    if (e.target.value !== "") {
      focusNextInput(index);
    } else {
      focusPrevInput(index);
    }

    if (onChange) {
      onChange(newOtp.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      focusPrevInput(index);
    }
  };

  return (
    <div>
      {otp.map((digit, index) => (
        <input
          style={{
            width: "28px",
            height: "28px",
            margin: "0 8px 0 8px",
            fontSize: "22px",
            textAlign: "center"
          }}
          key={index}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputRefs.current[index] = el)}
        />
      ))}
    </div>
  );
}

export default OtpInput;
