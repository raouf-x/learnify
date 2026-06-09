const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ===== EMAIL TEMPLATES =====

// Welcome email after register
const sendWelcomeEmail = async (user) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', sans-serif; background: #f5f7fa; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #1a1a2e, #0f3460); padding: 40px; text-align: center; }
        .header h1 { color: #e94560; font-size: 2rem; margin: 0 0 8px; }
        .header p { color: #aaa; margin: 0; }
        .body { padding: 40px; }
        .body h2 { color: #1a1a2e; font-size: 1.4rem; margin: 0 0 16px; }
        .body p { color: #555; line-height: 1.7; margin: 0 0 16px; }
        .btn { display: inline-block; padding: 14px 32px; background: #e94560; color: white; border-radius: 30px; text-decoration: none; font-weight: 700; font-size: 1rem; }
        .features { display: grid; gap: 12px; margin: 24px 0; }
        .feature { background: #f5f7fa; border-radius: 10px; padding: 16px; display: flex; align-items: center; gap: 12px; }
        .feature span { font-size: 1.5rem; }
        .feature p { margin: 0; color: #444; font-size: 0.9rem; }
        .footer { background: #1a1a2e; padding: 24px; text-align: center; color: #666; font-size: 0.85rem; }
        .footer a { color: #e94560; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📚 Learnify</h1>
          <p>Your Learning Journey Starts Now!</p>
        </div>
        <div class="body">
          <h2>Welcome, ${user.name}! 🎉</h2>
          <p>Thank you for joining <strong>Learnify</strong>! We're excited to have you on board. Your account has been successfully created.</p>

          <div class="features">
            <div class="feature">
              <span>🎥</span>
              <p><strong>Watch Video Courses</strong> — Access high-quality courses from YouTube and other sources.</p>
            </div>
            <div class="feature">
              <span>📈</span>
              <p><strong>Track Your Progress</strong> — Know exactly where you are in every course.</p>
            </div>
            <div class="feature">
              <span>🏆</span>
              <p><strong>Earn Certificates</strong> — Complete courses and get recognized.</p>
            </div>
          </div>

          <p>Ready to start learning? Click the button below:</p>
          <a href="${process.env.CLIENT_URL}/courses" class="btn">🚀 Browse Courses</a>

          <p style="margin-top: 24px; font-size: 0.85rem; color: #888;">
            If you have any questions, reply to this email or contact us at
            <a href="mailto:${process.env.EMAIL_USER}" style="color: #e94560;">${process.env.EMAIL_USER}</a>
          </p>
        </div>
        <div class="footer">
          <p>© 2024 Learnify. Made with ❤️ for learners everywhere.</p>
          <p><a href="${process.env.CLIENT_URL}">Visit Learnify</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from:    process.env.EMAIL_FROM,
    to:      user.email,
    subject: '🎉 Welcome to Learnify — Your Account is Ready!',
    html
  });

  console.log(`✅ Welcome email sent to ${user.email}`);
};

// Activation success email
const sendActivationEmail = async (user, plan) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', sans-serif; background: #f5f7fa; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #15803d, #166534); padding: 40px; text-align: center; }
        .header h1 { color: white; font-size: 2rem; margin: 0 0 8px; }
        .header p { color: #bbf7d0; margin: 0; }
        .body { padding: 40px; }
        .body h2 { color: #1a1a2e; font-size: 1.4rem; margin: 0 0 16px; }
        .body p { color: #555; line-height: 1.7; margin: 0 0 16px; }
        .badge { display: inline-block; background: #f3e8ff; color: #7c3aed; padding: 8px 20px; border-radius: 20px; font-weight: 700; font-size: 1rem; margin: 8px 0 24px; }
        .btn { display: inline-block; padding: 14px 32px; background: #e94560; color: white; border-radius: 30px; text-decoration: none; font-weight: 700; font-size: 1rem; }
        .footer { background: #1a1a2e; padding: 24px; text-align: center; color: #666; font-size: 0.85rem; }
        .footer a { color: #e94560; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Account Activated!</h1>
          <p>Congratulations — You now have full access!</p>
        </div>
        <div class="body">
          <h2>Great news, ${user.name}! 🎉</h2>
          <p>Your Learnify account has been successfully activated!</p>
          <p>Your current plan:</p>
          <div class="badge">💎 ${plan.toUpperCase()} PLAN</div>
          <p>You now have <strong>full access</strong> to all courses and features on Learnify. Start learning right away!</p>
          <a href="${process.env.CLIENT_URL}/courses" class="btn">🚀 Start Learning Now</a>
        </div>
        <div class="footer">
          <p>© 2024 Learnify. Made with ❤️ for learners everywhere.</p>
          <p><a href="${process.env.CLIENT_URL}">Visit Learnify</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from:    process.env.EMAIL_FROM,
    to:      user.email,
    subject: '✅ Your Learnify Account is Now Activated!',
    html
  });

  console.log(`✅ Activation email sent to ${user.email}`);
};

module.exports = { sendWelcomeEmail, sendActivationEmail };