# Bike Rent Cape Town

A mobile-first website and booking platform for mountain bike rental in Cape Town.

## Features

- **Hero Section**: Eye-catching hero with background image and call-to-action buttons
- **Bike Selection**: Horizontal carousel showcasing available bikes
- **How it Works**: Animated timeline explaining the booking process
- **Booking Form**: Comprehensive form with real-time price calculation
- **FAQs**: Accordion-style frequently asked questions
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Webhook Configuration

The booking form is set up to send data to a webhook. To configure:

1. Open `src/components/BookingForm.tsx`
2. Replace `YOUR_WEBHOOK_URL_HERE` with your actual webhook URL

## Image Assets

Place bike images in the `public/media/` directory. The current hero image is already referenced:
- `media/sunset-at-signal-hill-cape-town-south-africa-suns-2025-01-09-01-52-10-utc Large.jpeg`

## Price Calculation

- Hardtail: €35/day
- Full suspension: Cross Country: €45/day
- Full Suspension: Trail / Enduro: €45/day
- Full Suspension: eBike: €60/day

Discounts:
- 15% off for rentals longer than 6 days
- 25% off for rentals longer than 14 days
