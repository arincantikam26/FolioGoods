import { siteConfig } from '@/app/configuration/site-config';

/**
 * Interface copy for the whole public site. Page content (projects,
 * products, profile, legal text) lives in each feature's data folder.
 *
 * Strings that depend on voice are written once per voice; switch with
 * siteConfig.voice ("studio" → we/us, "personal" → I/me).
 */
const voice = <T>(options: { studio: T; personal: T }): T =>
    options[siteConfig.voice];

export const copy = {
    common: {
        skipToContent: 'Skip to content',
        breadcrumb: 'Breadcrumb',
        home: 'Home',
        backToTop: 'Back to top',
        scrollToTop: 'Scroll back to the top of the page',
        previewBadge: 'UI preview',
        opensInNewTab: '(opens in a new tab)',
        copy: 'Copy',
        copied: 'Copied',
        copyFailed: 'Copy failed — select the text instead',
        retry: 'Try again',
        clearFilters: 'Clear filters',
        all: 'All',
    },

    navigation: {
        primaryLabel: 'Primary',
        openMenu: 'Menu',
        closeMenu: 'Close menu',
        menuTitle: 'Site navigation',
        footerLabel: 'Footer',
    },

    home: {
        hero: {
            eyebrow: 'Portfolio & digital goods',
            headline:
                'Selected work, useful products, and *the thinking behind both.*',
            body: 'A flexible portfolio for presenting thoughtful work, sharing the process, and offering digital products in one place.',
            primaryCta: 'View selected work',
            secondaryCta: 'Browse templates',
            /** Project whose cover anchors the hero. */
            projectSlug: 'tidewater',
            mediaLabel: 'Now showing',
            mediaCta: 'View the project',
            meta: {
                practice: 'Practice',
                location: 'Based in',
                availability: 'Availability',
            },
        },
        work: {
            label: 'Selected work',
            heading: 'Projects with a reason behind every decision.',
            cta: 'View all projects',
            rowCta: 'Read the case study',
        },
        statement: {
            label: 'How the work is shown',
            heading:
                'Each project is told as a sequence: the context, the decisions, the process, and what came out of it.',
            body: voice({
                studio: 'Images show the result. The writing around them shows how we got there — what was asked, what we tried, and what we would do differently next time.',
                personal:
                    'Images show the result. The writing around them shows how I got there — what was asked, what I tried, and what I would do differently next time.',
            }),
            capabilities: [
                'Brand and visual systems',
                'Editorial and web design',
                'Product interfaces',
                'Photography and image making',
                'Tools, templates and documentation',
            ],
        },
        shop: {
            label: 'From the shop',
            heading: 'Templates, kits and assets made from the same practice.',
            cta: 'View all products',
        },
        about: {
            label: 'About',
            cta: 'Read the full profile',
            capabilitiesTitle: 'Capabilities',
            experienceTitle: 'Selected experience',
        },
    },

    closing: {
        label: 'Contact',
        heading: 'Have a project, product, or idea worth shaping?',
        cta: 'Discuss a project',
        emailLabel: 'Or write directly',
        socialLabel: 'Elsewhere',
    },

    work: {
        title: 'Work',
        intro: 'An index of commissioned and self-initiated projects. Each one opens into a full case study.',
        searchLabel: 'Search projects',
        searchPlaceholder: 'Title, medium or context',
        categoryLabel: 'Category',
        yearLabel: 'Year',
        anyYear: 'Any year',
        filtersToggle: 'Filter projects',
        updating: 'Updating results',
        count: (shown: number, total: number) =>
            shown === total
                ? `${total} projects`
                : `Showing ${shown} of ${total} projects`,
        featured: 'Featured',
        role: 'Role',
        indexHeading: 'Index',
        emptyTitle: 'No work matches these filters.',
        emptyBody: 'Try another category or clear the current selection.',
        noneTitle: 'No projects published yet.',
        noneBody: 'Projects added to the content source will appear here.',
        viewProject: 'View the project',
        caseStudy: 'Read the case study',
    },

    caseStudy: {
        chapters: 'Chapters',
        jumpTo: 'Jump to chapter',
        facts: 'Project details',
        contributions: 'Contribution',
        results: 'What changed',
        learnings: voice({
            studio: 'What we learned',
            personal: 'What I learned',
        }),
        related: 'More work',
        relatedEmpty: 'No related projects yet.',
        notFoundTitle: 'This project is not in the index.',
        notFoundBody:
            'It may have been renamed or unpublished. The full index lists everything that is currently public.',
        backToIndex: 'Back to the work index',
        closing: voice({
            studio: 'Working on something with a similar shape?',
            personal: 'Working on something with a similar shape?',
        }),
    },

    shop: {
        title: 'Shop',
        intro: 'Templates, starter kits and assets for people who make things on the web. Every product lists what is included, what it needs, and how it may be used.',
        categoryLabel: 'Category',
        sortLabel: 'Sort by',
        sorts: {
            featured: 'Featured first',
            newest: 'Newest',
            'price-asc': 'Price, low to high',
            'price-desc': 'Price, high to low',
        },
        filtersToggle: 'Filter and sort',
        updating: 'Updating results',
        count: (count: number) =>
            count === 1 ? '1 product' : `${count} products`,
        from: 'From',
        viewDetails: 'View product details',
        unavailable: 'Not available right now',
        emptyTitle: 'No products in this category yet.',
        emptyBody: 'Choose another category or browse the full catalogue.',
        noneTitle: 'The shop is empty for now.',
        noneBody: 'Products added to the content source will appear here.',
        licenseNoteTitle: 'Licensing in plain language',
        licenseNote:
            'Every purchase includes a license for the stated use. Personal covers your own projects; Commercial covers client and paid work. The full terms are on one page.',
        licenseNoteCta: 'Read the license',
        faqTitle: 'Before you buy',
        faqCta: 'Ask a question',
        faqLabel: 'Questions',
    },

    product: {
        price: 'Price',
        version: 'Version',
        released: 'Released',
        license: 'License',
        chooseLicense: 'Choose a license',
        requirements: 'Requirements',
        compatibility: 'Works with',
        primaryCta: (noun: string) => `Get this ${noun}`,
        previewCta: 'View live preview',
        docsCta: 'Read the documentation',
        oneTimeNote:
            'One-time payment. Updates within the major version included.',
        unavailableTitle: 'This product is not available right now.',
        unavailableBody:
            'It is being updated. The page stays up so you can read what it includes.',
        sections: {
            overview: 'Overview',
            includes: 'In the package',
            audience: 'Who it is for',
            suits: 'A good fit if',
            notSuited: 'Probably not for you if',
            requirements: 'Requirements',
            gallery: 'Preview',
            features: 'Walkthrough',
            source: 'Folder structure',
            license: 'License',
            changelog: 'Changelog',
            support: 'Support',
            faq: 'Questions',
            related: 'Related products',
            delivery: 'How you get it',
        },
        delivery: [
            {
                title: 'Check out without an account',
                detail: 'Enter a name and email, choose the license, and confirm the total.',
            },
            {
                title: 'Transfer and upload the receipt',
                detail: 'Pay the exact amount by bank transfer, then upload a screenshot or PDF of the receipt.',
            },
            {
                title: 'Download after verification',
                detail: 'Once the transfer is matched, the download link and invoice are sent to your email and shown on the order page.',
            },
        ],
        closing: {
            label: 'Purchase',
            license: (name: string) => `${name} license`,
            note: 'One-time payment. The price shown is the total — no fees are added at checkout.',
        },
        supportIncluded: 'Included',
        supportExcluded: 'Not included',
        galleryLabel: 'Product images',
        galleryControls: 'Choose an image',
        stages: {
            stable: 'Stable',
            beta: 'Beta',
            'early-access': 'Early access',
        },
        notFoundTitle: 'This product is not in the shop.',
        notFoundBody:
            'It may have been renamed or retired. The catalogue lists everything currently available.',
        backToShop: 'Back to the shop',
        mobileBarLabel: 'Purchase',
    },

    checkout: {
        title: 'Checkout',
        steps: ['Details', 'Payment', 'Delivery'],
        intro: 'No account needed. Your receipt and download link go to the email you enter.',
        backToProduct: 'Back to the product',
        contactHeading: 'Your details',
        name: 'Full name',
        email: 'Email',
        emailHint: 'The download link and receipt are sent here.',
        whatsapp: 'WhatsApp',
        whatsappHint: 'Optional. Only used if there is a problem with payment.',
        optional: 'optional',
        licenseHeading: 'License',
        agreement: { before: 'I have read the', middle: 'and the', after: '.' },
        agreementLinks: { license: 'license', terms: 'terms of sale' },
        submit: 'Continue to payment',
        submitting: 'Preparing checkout',
        summaryHeading: 'Order summary',
        subtotal: 'Subtotal',
        fees: 'Fees',
        noFees: 'None',
        total: 'Total',
        totalNote:
            'This is the full amount. Payment is a manual bank transfer on the next step.',
        errors: {
            summary: (count: number) =>
                count === 1
                    ? 'One field needs attention.'
                    : `${count} fields need attention.`,
            nameRequired: 'Enter your name.',
            emailRequired: 'Enter your email address.',
            emailInvalid: 'Enter an email address like name@example.com.',
            whatsappInvalid:
                'Use digits only, with country code, e.g. 6281234567890.',
            agreementRequired: 'Confirm that you have read the license.',
        },
        states: {
            failedTitle: 'The order could not be created.',
            failedBody:
                'Nothing was charged and your details are still in the form. Try again in a moment.',
            networkTitle: 'Connection lost.',
            networkBody:
                'Your details are kept. Check your connection, then submit again.',
            unavailableTitle: 'This product is not available for purchase.',
            unavailableBody:
                'It is temporarily withdrawn while it is being updated. You have not been charged.',
            priceChangedTitle:
                'The price has changed since you opened this page.',
            priceChangedBody: (previous: string, current: string) =>
                `It was ${previous} and is now ${current}. Review the new total before continuing.`,
            successTitle: 'Order created.',
            successBody: 'Opening payment instructions…',
        },
        missingProductTitle: 'Choose a product to check out.',
        missingProductBody:
            'Checkout starts from a product page, so the right license and price are selected.',
    },

    payment: {
        title: 'Payment',
        orderNumber: 'Order number',
        total: 'Amount to transfer',
        deadline: 'Pay before',
        bankHeading: 'Transfer to',
        bank: 'Bank',
        accountNumber: 'Account number',
        accountHolder: 'Account holder',
        reference: 'Transfer note',
        exactAmount:
            'Transfer the exact amount so the payment can be matched to your order.',
        steps: [
            'Transfer the exact amount',
            'Upload proof of transfer',
            'Wait for verification',
        ],
        uploadHeading: 'Proof of transfer',
        uploadHint: 'A screenshot or PDF receipt from your banking app.',
        submit: 'Submit payment proof',
        submitting: 'Submitting payment proof',
        help: 'Problem with payment?',
        helpCta: 'Contact support',
        statusCta: 'Check order status',
        statuses: {
            waiting_payment: {
                title: 'Waiting for your transfer',
                body: 'Transfer the amount below, then upload your proof of transfer.',
            },
            proof_uploaded: {
                title: 'Payment proof submitted.',
                body: 'The order will remain under review until it has been verified.',
            },
            under_review: {
                title: 'Payment under review',
                body: 'Proof received and being checked against the bank statement. This usually takes a few working hours.',
            },
            rejected: {
                title: 'The payment proof was not accepted',
                body: 'See the reason below. Upload a new proof to continue — the order stays open until the deadline.',
            },
            approved: {
                title: 'Payment approved',
                body: 'Your files are ready. The download link has also been sent to your email.',
            },
            expired: {
                title: 'This order has expired',
                body: 'No transfer was confirmed before the deadline. Start a new checkout if you still want the product — nothing has been charged.',
            },
        },
        rejectionLabel: 'Reason',
        expiredCta: 'Return to the product',
    },

    upload: {
        choose: 'Choose a file',
        dropHint: 'or drop it here',
        replace: 'Replace file',
        remove: 'Remove file',
        selected: 'Selected file',
        tooLarge: (limit: string) => `This file is larger than ${limit}.`,
        wrongType: 'This file type is not accepted. Use JPG, PNG or PDF.',
        required: 'Choose a file to upload.',
    },

    orders: {
        lookupTitle: 'Check order status',
        lookupIntro:
            'Enter the order number from your confirmation email. The email address confirms it is your order.',
        orderNumber: 'Order number',
        orderNumberHint: 'Looks like FG-2610-4821.',
        email: 'Email used at checkout',
        submit: 'Check order status',
        submitting: 'Checking order',
        errors: {
            orderRequired: 'Enter your order number.',
            orderFormat: 'Order numbers look like FG-2610-4821.',
            emailRequired: 'Enter the email used at checkout.',
            emailInvalid: 'Enter an email address like name@example.com.',
            notFoundTitle: 'No order matches these details.',
            notFoundBody:
                'Check the order number and email against your confirmation email. Both must match.',
            rateLimitedTitle: 'Too many attempts.',
            rateLimitedBody:
                'For your security, lookups are paused for a few minutes. Try again shortly.',
            networkTitle: 'The lookup could not be completed.',
            networkBody: 'Check your connection and try again.',
        },
        statusTitle: 'Order',
        placed: 'Placed',
        product: 'Product',
        license: 'License',
        total: 'Total',
        timeline: 'Progress',
        timelineStates: {
            done: 'Completed',
            current: 'In progress',
            upcoming: 'Not started',
            failed: 'Stopped',
        },
        actions: {
            pay: 'View payment instructions',
            invoice: 'Download invoice',
            download: 'Download files',
            newOrder: 'Start a new order',
            support: 'Contact support',
        },
        actionPreview:
            'Preview only: invoices and downloads are generated in the Commerce Edition.',
        deliveryHeading: 'Delivery',
        licenseHeading: 'Your license',
        supportHeading: 'Support',
        statuses: {
            waiting_payment: {
                title: 'Waiting for payment',
                body: 'The order is created. Transfer the total and upload your proof before the deadline.',
            },
            waiting_verification: {
                title: 'Waiting for verification',
                body: 'Payment proof received. It is checked against the bank statement, usually within a few working hours.',
            },
            paid: {
                title: 'Paid',
                body: 'Payment confirmed. Your invoice and files are available below.',
            },
            rejected: {
                title: 'Payment not accepted',
                body: 'The proof could not be matched to a transfer. Upload a new proof or contact support.',
            },
            expired: {
                title: 'Expired',
                body: 'No payment was confirmed before the deadline. Nothing was charged.',
            },
            fulfilled: {
                title: 'Delivered',
                body: 'Files delivered and the license is active. Downloads stay available for 12 months.',
            },
        },
    },

    about: {
        title: 'About',
        description:
            'Background, experience and ways of working of an independent practice in Bandung.',
        biography: 'Background',
        tools: 'Tools and media',
        principles: 'Ways of working',
        availability: 'Availability',
    },

    contact: {
        title: 'Contact',
        heading: voice({
            studio: 'Tell us what you are working on.',
            personal: 'Tell me what you are working on.',
        }),
        body: 'Share the context, expected outcome, and timeline. A concise outline is enough to begin.',
        name: 'Name',
        email: 'Email',
        company: 'Company or organisation',
        projectType: 'Type of project',
        projectTypePlaceholder: 'Choose one',
        optionalPlaceholder: 'Not specified',
        budget: 'Budget range',
        timeline: 'Timeline',
        message: 'Message',
        messageHint: 'What you need, why now, and anything already decided.',
        optional: 'optional',
        consent:
            'I agree that these details are used to reply to this inquiry.',
        consentLink: 'Privacy notice',
        submit: 'Send inquiry',
        submitting: 'Sending inquiry',
        responseNote: voice({
            studio: 'Replies usually go out within two working days.',
            personal: 'I usually reply within two working days.',
        }),
        directHeading: 'Direct',
        errors: {
            nameRequired: 'Enter your name.',
            emailRequired: 'Enter your email address.',
            emailInvalid: 'Enter an email address like name@example.com.',
            projectTypeRequired: 'Choose the type of project.',
            messageRequired: 'Add a short message.',
            messageShort: 'Add a little more context — at least 20 characters.',
            consentRequired: 'Agree to the privacy notice to send the inquiry.',
        },
        states: {
            successTitle: 'Message received.',
            successBody: 'A reply will be sent to the email provided.',
            successAgain: 'Send another inquiry',
            failedTitle: 'The message was not sent.',
            failedBody:
                'Your message is still in the form. Try again, or email directly.',
            rateLimitedTitle: 'Too many messages in a short time.',
            rateLimitedBody:
                'Please wait a few minutes before sending again. Your message is kept.',
        },
    },

    legal: {
        contents: 'On this page',
        updated: 'Last updated',
        placeholder: 'Replace with reviewed legal content before production.',
        placeholderBody:
            'This text is a structural placeholder, not legal advice. Have it reviewed for your jurisdiction and business before publishing.',
        print: 'Print this page',
    },

    errors: {
        404: {
            title: 'This page is not here.',
            body: 'The address may be mistyped, or the page has moved. The links below cover most of the site.',
        },
        403: {
            title: 'This page is not available.',
            body: 'You do not have access to it. If you followed a link from an email, it may have expired.',
        },
        500: {
            title: 'Something broke on our side.',
            body: 'The error has been logged. Try again in a minute — if it keeps happening, email us and mention the page you were on.',
        },
        503: {
            title: 'Back shortly.',
            body: 'The site is being updated. Please try again in a few minutes.',
        },
        render: {
            title: 'This part of the page could not be shown.',
            body: 'Something went wrong while displaying it. Try again, or go back to the home page — nothing you entered elsewhere is lost.',
        },
        code: 'Error',
        home: 'Go to the home page',
        work: 'Browse the work',
        contact: 'Contact',
    },

    transaction: {
        progressLabel: 'Checkout progress',
        completed: '(completed)',
        terms: 'Terms of sale',
        backToShop: 'Back to the shop',
    },

    preview: {
        transactionNotice:
            'This is a UI preview. No order is created, no payment is taken, and nothing is stored.',
        formNotice: 'This form is a UI preview. Nothing is sent.',
        stateLabel: 'Preview state',
    },

    footer: {
        colophon: 'Built with FolioGoods.',
        rights: (year: number, name: string) => `© ${year} ${name}`,
    },
} as const;
