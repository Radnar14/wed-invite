# 💍 Sarah & Michael's Wedding Invitation

A premium, elegant, and responsive wedding invitation web application built with **Next.js 15+**, **React 19**, and **Tailwind CSS 4**. This project features a modern aesthetic with smooth animations, interactive components, and a seamless user experience.

---

## ✨ Features

- **🕒 Real-time Countdown**: Anticipate the big day with a live countdown timer.
- **📖 Our Story**: A beautiful narrative section sharing the couple's journey.
- **👥 Entourage**: Interactive grid showcasing the bridal party and groomsmen.
- **📍 Event Details**: Clear information about the ceremony and reception venues.
- **📅 Interactive Timeline**: A chronological guide to the wedding day events.
- **🖼️ Gallery**: A stunning image showcase using Embla Carousel.
- **💌 RSVP System**: A fully functional RSVP form with validation.
- **🎵 Music Player**: Background music integration for an immersive experience.
- **📱 Responsive Design**: Optimized for mobile, tablet, and desktop viewing.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: Custom CSS Animations & Tailwind Utilities
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Fonts**: [Google Fonts](https://fonts.google.com/) (Cormorant Garamond & Montserrat)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm, pnpm, or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SimplyLouie/wed-invite.git
   cd wed-invite
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open the application:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the site.

---

## 📂 Project Structure

```text
wed-invite/
├── app/                # Next.js App Router pages and layouts
├── components/         # Reusable UI and Wedding-specific components
│   ├── ui/             # Base UI components (Radix/Shadcn)
│   └── wedding/        # Core wedding invitation sections
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and shared logic
├── public/             # Static assets (images, icons, audio)
└── styles/             # Global styles and Tailwind configuration
```

---

## 🎨 Customization

To personalize the invitation:
1. Update couple names and dates in `app/layout.tsx` and `components/wedding/hero.tsx`.
2. Replace images in the `public/images/` directory.
3. Modify the countdown target date in `components/wedding/countdown.tsx`.
4. Update the RSVP deadline in `components/wedding/rsvp.tsx`.

---

## 📄 License

This project is private and intended for personal use.

---

Built with ❤️ for Sarah & Michael.
