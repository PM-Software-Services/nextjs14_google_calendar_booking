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

Note the current .env.example file

```
GOOGLE_OAUTH_CLIENT_ID=
GOOGLE_OAUTH_SECRET=
GOOGLE_OAUTH_REFRESH=

STRIPE_ID=

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=

STRIPE_WEBHOOK_SECRET=

NEXT_PUBLIC_API_URL= 

STRIPE_DEPOSIT_PRODUCT_ID=

CONTACT_EMAIL=

CONTACT_NUMBER=

CONTACT_NAME=
```

You can get the google oauth client id, secret, and refresh as per this [guide.](https://timfeeley.com/posts/nextjs-self-scheduler-calendly-alternative) 

Retrieve the stripe publishable key, secret key, webhook secret from stripe. Make sure to create a prodcut valued at 100, and insert that product id as the stripe_deposit_product_ID.

The next_public_api_url can initially be set to http://localhost:3000

Contact email and number will be displayed in error/success pages. make sure these are the client/public details.

# Learn More

This tool was developed by PM Software Services. Submit any issues/concerns, or email peter.philips@pmsoftware.org.
