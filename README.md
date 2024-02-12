## Introduction

There doesn't seem to be a next js 14 basic booking system which has stripe integration. This is a nextjs and google calendar tool which allows you to take payments and book in slots with potential individuals. Individual prices (line_item) can be set via stripe dashboard. 

## Getting Started
You will need to first fill in your .env.example file, making sure google oauth scope access is given.

Install necessary packages:
```bash
npm i
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Run the webhook listener (for local testing):
```bash
npm run stripe
# or
yarn stripe
# or
pnpm stripe
# or
bun strip
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## Adjusting Settings
Within the config.ts file, adjust timezone, locale, duration of meetings, and limit how many months you want to book in advance until. 

Variations of work day can also be altered/added.


# Learn More

This tool was developed by PM Software Services. Any concerns or issues, please email peter.philips@pmsoftware.org
