# EmailJS Setup Guide

Quick setup instructions for your portfolio contact form.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month)
3. Verify your email address

## Step 2: Add Email Service

1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (recommended for personal)
   - **Outlook**
   - **Yahoo**
   - Or use **Custom SMTP**
4. Follow the connection instructions
5. Note your **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template:

```
Subject: Portfolio Contact from {{from_name}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
Sent from your portfolio contact form
```

4. Configure template settings:
   - **To Email**: Your email (e.g., `jaime.abad@example.com`)
   - **From Name**: `{{from_name}}`
   - **Reply To**: `{{from_email}}`
5. Save and note your **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `1a2b3c4d5e6f7g8h9i`)
3. This is used for client-side authentication

## Step 5: Update Your Code

Open `app/page.tsx` and replace the placeholders:

```typescript
// Find these lines around line 45:
const serviceId = 'YOUR_SERVICE_ID'      // Replace with your Service ID
const templateId = 'YOUR_TEMPLATE_ID'    // Replace with your Template ID
const publicKey = 'YOUR_PUBLIC_KEY'      // Replace with your Public Key
```

**Example:**
```typescript
const serviceId = 'service_abc123'
const templateId = 'template_xyz789'
const publicKey = '1a2b3c4d5e6f7g8h9i'
```

## Step 6: Test the Form

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Navigate to http://localhost:3000

3. Scroll to the Contact section

4. Fill out the form and submit

5. Check your email inbox for the message

## Troubleshooting

### Emails not arriving?

1. **Check spam folder** - EmailJS emails might be filtered
2. **Verify email service** - Make sure it's properly connected
3. **Check template** - Ensure "To Email" is set correctly
4. **Look at EmailJS logs** - Dashboard shows all sent emails

### Getting errors?

1. **Invalid credentials** - Double-check Service ID, Template ID, and Public Key
2. **CORS errors** - EmailJS works from any domain, but check browser console
3. **Rate limiting** - Free tier is 200/month, upgrade if needed

## EmailJS Dashboard Overview

Your dashboard shows:
- **Email Services**: Connected email accounts
- **Email Templates**: Template configurations
- **Auto-Reply**: Optional automatic responses
- **Analytics**: Email statistics
- **Quota**: Remaining emails this month

## Security Notes

- ✅ Public Key is safe to expose (it's meant for client-side use)
- ✅ Service ID and Template ID are also safe to commit
- ✅ Your actual email credentials stay secure on EmailJS servers
- ✅ EmailJS includes spam protection

## Alternative: Environment Variables (Optional)

For extra security, you can use environment variables:

```bash
# .env.local
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=1a2b3c4d5e6f7g8h9i
```

Then update the code:
```typescript
const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
```

## Free Tier Limits

- **200 emails per month**
- **Email history for 1 month**
- **1 email template**
- **Spam protection included**

Upgrade to paid plans for more capacity.

## Testing Checklist

- [ ] EmailJS account created
- [ ] Email service connected
- [ ] Email template created
- [ ] Public key obtained
- [ ] Credentials added to app/page.tsx
- [ ] Test form submission successful
- [ ] Email received in inbox
- [ ] Form fields clear after submission
- [ ] Error handling works

---

🎉 Once setup is complete, your contact form will be fully functional!

**Need help?** Check [EmailJS Documentation](https://www.emailjs.com/docs/)
