# Quick Start: Form Backend & CV Download

Practical implementation guide for adding backend functionality to your portfolio.

## 🚀 Fastest Solutions (No Backend Required)

### 1. Contact Form - Web3Forms (Recommended)

**Time to implement: 5 minutes**

```bash
# 1. Sign up at https://web3forms.com (free)
# 2. Get your access key
# 3. Update app/page.tsx
```

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  const formDataToSend = {
    access_key: 'YOUR_WEB3FORMS_ACCESS_KEY', // Get from web3forms.com
    name: formData.name,
    email: formData.email,
    message: formData.message,
    subject: 'New Portfolio Contact Form Submission'
  }
  
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formDataToSend)
    })
    
    const result = await response.json()
    
    if (result.success) {
      alert('Thank you! Your message has been sent successfully.')
      setFormData({ name: '', email: '', message: '' })
    } else {
      alert('Something went wrong. Please try again.')
    }
  } catch (error) {
    console.error('Form submission error:', error)
    alert('Failed to send message. Please try again later.')
  }
}
```

**Benefits:**
- ✅ No backend code needed
- ✅ Email notifications
- ✅ Spam protection built-in
- ✅ Free for 250 submissions/month
- ✅ Works with static sites

### 2. CV Download - Static PDF

**Time to implement: 2 minutes**

```bash
# 1. Create your CV as PDF
# 2. Place it in public folder
cp ~/Documents/Jaime_Abad_CV.pdf public/
```

```typescript
// Update in app/page.tsx - find the Download CV button:
<a 
  href="/Jaime_Abad_CV.pdf" 
  download="Jaime_Abad_CV.pdf"
  className="button-group__btn button-group__btn--active"
>
  Download CV
</a>
```

**That's it!** The file will download when clicked.

---

## 🔧 Alternative Solutions

### Contact Form Options

#### Option A: Formspree (Easiest)

```bash
# 1. Sign up at formspree.io
# 2. Create form, get endpoint
# 3. Update form in app/page.tsx
```

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  
  if (response.ok) {
    alert('Message sent successfully!')
    setFormData({ name: '', email: '', message: '' })
  }
}
```

#### Option B: EmailJS (Client-Side Email)

```bash
npm install @emailjs/browser
```

```typescript
import emailjs from '@emailjs/browser'

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',      // From emailjs.com dashboard
      'YOUR_TEMPLATE_ID',     // Create template on emailjs.com
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      },
      'YOUR_PUBLIC_KEY'       // From emailjs.com dashboard
    )
    
    alert('Message sent successfully!')
    setFormData({ name: '', email: '', message: '' })
  } catch (error) {
    alert('Failed to send message')
  }
}
```

#### Option C: Netlify Forms (If hosting on Netlify)

```typescript
// Just add netlify attribute to form
<form 
  className="contact-form" 
  name="contact"
  method="POST"
  data-netlify="true"
  data-netlify-honeypot="bot-field"
  onSubmit={handleSubmit}
>
  <input type="hidden" name="form-name" value="contact" />
  {/* Rest of form fields */}
</form>

// Update handleSubmit
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  const form = e.target as HTMLFormElement
  
  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(new FormData(form) as any).toString()
  })
    .then(() => {
      alert('Message sent!')
      setFormData({ name: '', email: '', message: '' })
    })
    .catch(() => alert('Error sending message'))
}
```

### CV Download Options

#### Option A: Multiple Format Downloads

```typescript
// Offer PDF, DOCX, and view online
<div className="button-group">
  <a 
    href="/Jaime_Abad_CV.pdf" 
    download="Jaime_Abad_CV.pdf"
    className="button-group__btn button-group__btn--active"
  >
    <i className="fas fa-file-pdf"></i> Download PDF
  </a>
  <a 
    href="/Jaime_Abad_CV.docx" 
    download="Jaime_Abad_CV.docx"
    className="button-group__btn"
  >
    <i className="fas fa-file-word"></i> Download DOCX
  </a>
  <a 
    href="/cv" 
    className="button-group__btn"
  >
    <i className="fas fa-eye"></i> View Online
  </a>
</div>
```

#### Option B: Google Drive/Dropbox Link

```typescript
// Link to cloud storage
<a 
  href="https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing" 
  target="_blank"
  rel="noopener noreferrer"
  className="button-group__btn button-group__btn--active"
>
  Download CV <i className="fas fa-external-link-alt"></i>
</a>
```

#### Option C: Track Downloads with Google Analytics

```typescript
const handleDownloadCV = (e: React.MouseEvent) => {
  // Track download event
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'download', {
      event_category: 'CV',
      event_label: 'Jaime_Abad_CV.pdf',
      value: 1
    })
  }
  
  // Download will proceed automatically via href
}

<a 
  href="/Jaime_Abad_CV.pdf" 
  download="Jaime_Abad_CV.pdf"
  onClick={handleDownloadCV}
  className="button-group__btn button-group__btn--active"
>
  Download CV
</a>
```

---

## 🚀 Full Backend Implementation (Advanced)

### Step 1: Create API Route

```bash
# Convert to hybrid Next.js app (static + API)
# Remove 'output: export' from next.config.js temporarily
```

```typescript
// pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, message } = req.body

  // Validate
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields required' })
  }

  // Send email
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_EMAIL,
      subject: `Portfolio Contact: ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      replyTo: email,
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}
```

### Step 2: Install Dependencies

```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

### Step 3: Environment Variables

```bash
# .env.local
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@yourdomain.com
CONTACT_EMAIL=jaime.abad@example.com
```

### Step 4: Update Form Handler

```typescript
// app/page.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    
    const data = await response.json()
    
    if (response.ok) {
      alert('Thank you! Your message has been sent.')
      setFormData({ name: '', email: '', message: '' })
    } else {
      alert(`Error: ${data.error}`)
    }
  } catch (error) {
    alert('Failed to send message. Please try again.')
  }
}
```

### Step 5: Deploy with API Support

**Note:** Full backend requires server hosting (not static)

```bash
# Deploy to Vercel (supports API routes)
vercel --prod

# Or deploy to traditional server with Node.js
npm run build
npm run start  # Runs Next.js server
```

---

## 📧 Email Service Providers

### Free Tier Comparison

| Service | Free Tier | Setup Difficulty |
|---------|-----------|------------------|
| **Web3Forms** | 250/month | ⭐ Easy |
| **Formspree** | 50/month | ⭐ Easy |
| **EmailJS** | 200/month | ⭐⭐ Medium |
| **Netlify Forms** | 100/month | ⭐ Easy (Netlify only) |
| **SendGrid** | 100/day | ⭐⭐⭐ Complex |
| **Gmail SMTP** | 500/day | ⭐⭐⭐ Complex |

### Recommendation

**For Static Site (Current Setup):**
→ Use **Web3Forms** or **Formspree**

**For Dynamic Site with API:**
→ Use **SendGrid** or **Nodemailer**

---

## 🔒 Security Best Practices

### For Client-Side Forms (Web3Forms, etc.)

```typescript
// Add honeypot field (spam protection)
<input 
  type="text" 
  name="honeypot" 
  style={{ display: 'none' }}
  tabIndex={-1}
  autoComplete="off"
/>

// Check honeypot in submission
if (formData.honeypot) {
  return // Likely spam, don't submit
}
```

### For Server-Side API

```typescript
// Rate limiting
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // 5 requests per window
})

// Add CORS headers
res.setHeader('Access-Control-Allow-Origin', 'https://yourdomain.com')
res.setHeader('Access-Control-Allow-Methods', 'POST')

// Sanitize input
import DOMPurify from 'isomorphic-dompurify'
const cleanMessage = DOMPurify.sanitize(message)
```

---

## ✅ Testing Checklist

### Before Deploying

- [ ] Test form submission (success case)
- [ ] Test form validation (empty fields)
- [ ] Test email delivery (check spam folder)
- [ ] Test CV download (opens/downloads correctly)
- [ ] Test on mobile devices
- [ ] Check error handling
- [ ] Verify analytics tracking (if implemented)
- [ ] Test in different browsers

### After Deploying

- [ ] Submit test form from production URL
- [ ] Verify email arrives at correct address
- [ ] Test CV download from production
- [ ] Check console for errors
- [ ] Monitor submission logs

---

## 🆘 Troubleshooting

### Form not submitting

1. Check browser console for errors
2. Verify API endpoint URL is correct
3. Check CORS headers if using API
4. Verify access key/credentials

### Emails not arriving

1. Check spam folder
2. Verify email service credentials
3. Check service dashboard for logs
4. Test with different email providers

### CV not downloading

1. Verify file exists in `public/` folder
2. Check file path (case-sensitive on Linux)
3. Verify `download` attribute is present
4. Test with direct URL: `yourdomain.com/filename.pdf`

---

Need help? Check the main [README.md](README.md) for more details!
