import axios from 'axios';

const API_URL = 'http://localhost:4001/api/v1/auth';
const email = 'test_security@example.com';
const password = 'Password@123';

const runTests = async () => {
  console.log('--- Starting Security Tests ---');

  try {
    // 1. Cleanup old user
    // (Assuming direct DB access or cleanup script if needed)

    // 2. Register
    console.log('\n[Case: Register]');
    await axios.post(`${API_URL}/register`, { name: 'Security User', email, password });
    
    // 3. Login without verification
    console.log('\n[Case: Login without verification]');
    try {
      await axios.post(`${API_URL}/login`, { email, password });
    } catch (err: any) {
      console.log('Expected failure:', err.response.data.message);
    }

    // 4. Multiple OTP requests (Resend)
    console.log('\n[Case: Multiple OTP requests]');
    await axios.post(`${API_URL}/login`, { email, password }); // This triggers resend
    
    // 5. Wrong OTP (Test Attempt Limits)
    console.log('\n[Case: Wrong OTP & Attempt Limits]');
    for (let i = 1; i <= 6; i++) {
       try {
         await axios.post(`${API_URL}/verify-otp`, { email, otp: '000000' });
       } catch (err: any) {
         console.log(`Attempt ${i}: ${err.response.data.message}`);
       }
    }

    // 6. Expired OTP (Simulation if possible, or just note it)
    console.log('\n[Case: Expired OTP] (Manual check needed or mock date)');

    // 7. Forgot Password Flow
    console.log('\n[Case: Forgot Password]');
    const forgotRes = await axios.post(`${API_URL}/forgot-password`, { email });
    console.log('Result:', forgotRes.data.message);

    console.log('\n--- Security Tests Completed ---');
  } catch (err: any) {
    console.error('Test Suite Failed:', err.message);
    if (err.response) console.error('Data:', err.response.data);
  }
};

runTests();
