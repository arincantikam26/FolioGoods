import type { Project } from '@/features/portfolio/types';
import type { MediaAsset } from '@/types/site';

/**
 * Mock projects. Every studio, client and place below is fictional.
 * Replace with your own work, or swap project-source.ts for a backend.
 */

const SIZES = {
    wide: [1920, 1080],
    landscape: [1600, 1200],
    portrait: [1200, 1500],
    square: [1400, 1400],
} as const;

function media(
    path: string,
    alt: string,
    size: keyof typeof SIZES,
    tone: string,
): MediaAsset {
    const [width, height] = SIZES[size];

    return { src: `/folio/media/${path}.svg`, alt, width, height, tone };
}

export const projects: Project[] = [
    {
        slug: 'fieldnote-identity',
        title: 'Fieldnote Roasters',
        shortTitle: 'Fieldnote',
        category: 'identity',
        context: 'Independent coffee roaster',
        year: 2025,
        summary:
            'An identity built from the roaster’s own tasting cards: a stamp-like wordmark, a modular label grid, and colour that signals roast level.',
        mediums: ['Identity system', 'Packaging', 'Signage'],
        featured: true,
        cover: media(
            'projects/fieldnote/cover',
            'Coffee bags with stamped labels in teal, rust and cream on a pale shelf',
            'landscape',
            '#d9d2c3',
        ),
        caseStudy: {
            deck: 'A small roaster needed packaging that could change every season without being redesigned every season.',
            facts: [
                { label: 'Role', value: 'Identity and packaging design' },
                { label: 'Duration', value: '10 weeks' },
                { label: 'Team', value: 'Designer, two owners, local printer' },
                {
                    label: 'Deliverables',
                    value: 'Wordmark, label system, signage, guidelines',
                },
            ],
            background: [
                'The roastery had grown from a weekend stall to supplying a dozen cafés. Each new bean arrived with a hand-lettered label, which was charming at five products and confusing at thirty.',
                'The owners wanted to keep the handmade feel while making the shelf readable at a glance.',
            ],
            problem: {
                body: [
                    'Every bag looked different, so regular customers struggled to find the coffee they already liked. Seasonal lots also meant new labels every few months, printed in small runs on an office printer.',
                ],
                quote: {
                    text: 'The label has to carry the origin, the roast and the story — and still print cleanly on a desktop machine.',
                    source: 'Project brief',
                },
            },
            role: {
                body: [
                    'Led the identity from research to print, working directly with the owners. Their printer joined reviews from the second week, which changed several decisions for the better.',
                ],
                contributions: [
                    'Shelf audit and research',
                    'Wordmark and type selection',
                    'Label grid and editable templates',
                    'Signage and menu boards',
                    'Guidelines for in-house use',
                ],
            },
            approach: [
                'The tasting cards the team already used became the starting point. Their structure — origin, process, notes — turned into a fixed grid with one variable area for each lot.',
                'Colour carries roast level rather than origin, so a customer can find “medium” across any country. Typography stays to one family in two weights to keep printing predictable.',
            ],
            process: [
                {
                    title: 'Shelf audit',
                    description:
                        'Photographed every bag in stock and sorted them the way customers do: by roast first, then origin.',
                },
                {
                    title: 'Card to grid',
                    description:
                        'Mapped the tasting-card fields onto a label grid that holds at both 250 g and 1 kg.',
                },
                {
                    title: 'Print tests',
                    description:
                        'Ran the grid on the roastery’s own printer and two paper stocks before anything was final.',
                },
                {
                    title: 'Hand-off',
                    description:
                        'Built editable templates and a two-page guide so the team can make new labels without a designer.',
                },
            ],
            gallery: [
                {
                    id: 'fieldnote-shelf',
                    layout: 'full',
                    images: [
                        {
                            id: 'fieldnote-shelf-image',
                            media: media(
                                'projects/fieldnote/gallery-1',
                                'A row of coffee bags with the new label system on a wooden shelf',
                                'wide',
                                '#d6cdb9',
                            ),
                            caption:
                                'The label system across the seasonal range.',
                        },
                    ],
                },
                {
                    id: 'fieldnote-label',
                    layout: 'inset-start',
                    images: [
                        {
                            id: 'fieldnote-label-image',
                            media: media(
                                'projects/fieldnote/gallery-2',
                                'Close view of a label: origin grid, roast colour band and a hand-drawn mark',
                                'portrait',
                                '#e3dccd',
                            ),
                            caption:
                                'One grid, one variable field per lot, one mark drawn by the owners.',
                        },
                    ],
                },
                {
                    id: 'fieldnote-pair',
                    layout: 'pair',
                    images: [
                        {
                            id: 'fieldnote-stamp',
                            media: media(
                                'projects/fieldnote/gallery-3',
                                'The wordmark stamped in rust ink on kraft paper',
                                'square',
                                '#cdb89a',
                            ),
                            caption: 'Wordmark as a rubber stamp.',
                        },
                        {
                            id: 'fieldnote-menu',
                            media: media(
                                'projects/fieldnote/gallery-4',
                                'Menu board listing coffees grouped by roast colour',
                                'square',
                                '#2a3a37',
                            ),
                            caption: 'Menu boards follow the roast colours.',
                        },
                    ],
                },
            ],
            challenges: [
                {
                    title: 'Small print runs',
                    body: 'Labels are printed fifty at a time. The colour system had to survive cheap toner and uncoated paper, so every swatch was tested on the actual printer rather than on screen.',
                },
                {
                    title: 'Keeping the hand',
                    body: 'A fully typeset label felt cold next to the old ones. A single hand-drawn mark per lot, drawn by the owners, kept their voice inside the system.',
                },
            ],
            outcome: {
                body: [
                    'The team now produces new labels in-house. The guidelines are short enough to be pinned above the printer, and new seasonal lots slot into the shelf without a redesign.',
                ],
                results: [
                    'New labels made in-house without design support',
                    'One template covers every bag size',
                    'Roast level readable from across the shop',
                ],
                learnings: [
                    'Testing on the client’s own equipment early saved two rounds of revisions.',
                    'A system that leaves room for the client’s hand gets used; a rigid one gets worked around.',
                ],
            },
        },
        related: ['quarterly-ledger', 'small-hours'],
    },
    {
        slug: 'tidewater',
        title: 'Tidewater',
        shortTitle: 'Tidewater',
        category: 'photography',
        context: 'Self-initiated series',
        year: 2024,
        summary:
            'Twenty-four photographs of the north coast at low tide, made over one dry season on medium-format film.',
        mediums: ['Medium-format film', 'Archival pigment print', 'Book dummy'],
        featured: true,
        cover: media(
            'projects/tidewater/cover',
            'Low tide at dusk: wet sand reflecting a pale sky, a thin line of sea on the horizon',
            'portrait',
            '#c9d3cf',
        ),
        caseStudy: {
            deck: 'A slow series about a coastline that changes twice a day, and a printed sequence that tries to keep that rhythm.',
            facts: [
                { label: 'Role', value: 'Photographer and editor' },
                { label: 'Duration', value: '7 months' },
                { label: 'Format', value: '6×7 film, 24 prints' },
                { label: 'Output', value: 'Exhibition prints, book dummy' },
            ],
            background: [
                'The series started as a walk repeated at the same hour each week. The same rocks, the same piers, a different sea every time.',
                'It became a test of patience as much as of image making: one roll per visit, no more.',
            ],
            problem: {
                body: [
                    'Single images of the coast looked like postcards. The work only made sense as a sequence, which meant the edit and the order mattered more than any individual frame.',
                ],
                quote: {
                    text: 'Photograph the interval, not the view.',
                    source: 'Working note',
                },
            },
            role: {
                body: [
                    'Made every photograph, developed and scanned the film, and edited the sequence. Worked with a local lab on the final prints.',
                ],
                contributions: [
                    'Photography',
                    'Film development and scanning',
                    'Sequencing and edit',
                    'Print supervision',
                    'Book dummy layout',
                ],
            },
            approach: [
                'Each visit followed the same constraints: same hour, same route, one roll of ten frames. The constraints removed the temptation to chase dramatic weather.',
                'The edit happened on the floor with work prints, moving pairs around until the tide seemed to rise and fall across the spreads.',
            ],
            process: [
                {
                    title: 'Walk and repeat',
                    description:
                        'Thirty visits along the same two kilometres of shore, one roll each.',
                },
                {
                    title: 'Develop and scan',
                    description:
                        'Film developed in small batches so mistakes stayed small.',
                },
                {
                    title: 'Pair and sequence',
                    description:
                        'Work prints arranged in pairs, then spreads, then the full sequence.',
                },
                {
                    title: 'Print',
                    description:
                        'Final prints proofed with the lab on two papers before choosing a matte stock.',
                },
            ],
            gallery: [
                {
                    id: 'tidewater-wide',
                    layout: 'full',
                    images: [
                        {
                            id: 'tidewater-wide-image',
                            media: media(
                                'projects/tidewater/gallery-1',
                                'Wide view of wet sand mirroring a pale sky at low tide',
                                'wide',
                                '#cfd8d4',
                            ),
                            caption:
                                'Plate 07. Late afternoon, lowest tide of the month.',
                        },
                    ],
                },
                {
                    id: 'tidewater-pier',
                    layout: 'inset-end',
                    images: [
                        {
                            id: 'tidewater-pier-image',
                            media: media(
                                'projects/tidewater/gallery-2',
                                'Old wooden pier posts exposed by the receding water',
                                'portrait',
                                '#b9c4bf',
                            ),
                            caption:
                                'Plate 12. The pier only appears below a certain tide.',
                        },
                    ],
                },
                {
                    id: 'tidewater-pair',
                    layout: 'pair',
                    images: [
                        {
                            id: 'tidewater-pool',
                            media: media(
                                'projects/tidewater/gallery-3',
                                'A still rock pool reflecting cloud',
                                'square',
                                '#d4dcd8',
                            ),
                            caption: 'Plate 15.',
                        },
                        {
                            id: 'tidewater-steps',
                            media: media(
                                'projects/tidewater/gallery-4',
                                'Footprints in sand slowly filling with seawater',
                                'square',
                                '#c2ccc8',
                            ),
                            caption: 'Plate 16.',
                        },
                    ],
                },
            ],
            challenges: [
                {
                    title: 'Weather on its own schedule',
                    body: 'Several visits produced nothing usable. Keeping them in the contact sheets — rather than skipping bad days — is what made the sequence honest.',
                },
                {
                    title: 'Colour across batches',
                    body: 'Film from different batches shifted slightly green. Scans were matched by hand against a reference print rather than corrected per frame.',
                },
            ],
            outcome: {
                body: [
                    'The sequence was prepared as twenty-four exhibition prints and a hand-bound dummy for a future book.',
                ],
                results: [
                    'A 24-print exhibition sequence',
                    'A hand-bound book dummy',
                    'A repeatable method for long-form series',
                ],
                learnings: [
                    'Constraints made the work, not the equipment.',
                    'Sequencing deserves as much time as shooting.',
                ],
            },
        },
        related: ['small-hours', 'fieldnote-identity'],
    },
    {
        slug: 'quarterly-ledger',
        title: 'The Quarterly Ledger',
        shortTitle: 'Ledger',
        category: 'editorial',
        context: 'Nonprofit publication on public budgets',
        year: 2025,
        summary:
            'A reading-first website for long investigations into public budgets, with tables that stay legible on a phone.',
        mediums: ['Art direction', 'Web design', 'CMS templates'],
        featured: false,
        cover: media(
            'projects/ledger/cover',
            'Article layout with a large serif headline, narrow text columns and a budget table',
            'landscape',
            '#e7e3d8',
        ),
        caseStudy: {
            deck: 'Long investigations, dense numbers, mostly read on phones. The design had to make all three feel calm.',
            facts: [
                { label: 'Role', value: 'Art direction and web design' },
                { label: 'Duration', value: '4 months' },
                {
                    label: 'Team',
                    value: 'Two editors, two developers, designer',
                },
                {
                    label: 'Deliverables',
                    value: 'Type system, article templates, table patterns',
                },
            ],
            background: [
                'The publication releases four long investigations a year, each built on months of budget documents. Most readers arrive from messaging apps, on a phone, partway through their day.',
            ],
            problem: {
                body: [
                    'The old site squeezed wide tables into narrow screens and broke articles into pages to increase views. Readers abandoned long pieces halfway, and editors had stopped using tables altogether.',
                ],
                quote: {
                    text: 'If a reader has to pinch to read a number, we have already lost the argument.',
                    source: 'Editor’s note in the brief',
                },
            },
            role: {
                body: [
                    'Set the art direction and designed the reading templates. Worked alongside the developers on the table component and the CMS fields editors use every day.',
                ],
                contributions: [
                    'Art direction and type system',
                    'Article and series templates',
                    'Responsive table patterns',
                    'CMS field design with editors',
                ],
            },
            approach: [
                'Reading comes first: a single column, generous line height, and a type scale tested on the smallest phones readers actually used.',
                'Tables were redesigned as stacked comparisons on small screens. Each row reads as a sentence — this line, this year, this change — instead of a grid to be scrolled sideways.',
            ],
            process: [
                {
                    title: 'Reading sessions',
                    description:
                        'Watched eight readers go through a full investigation on their own phones.',
                },
                {
                    title: 'Type on device',
                    description:
                        'Tested three type pairings on real articles, not lorem ipsum.',
                },
                {
                    title: 'Tables as sentences',
                    description:
                        'Rebuilt the five most common table shapes as stacked, readable rows.',
                },
                {
                    title: 'Editor fields',
                    description:
                        'Shaped the CMS around how editors write, including pull quotes and notes.',
                },
            ],
            gallery: [
                {
                    id: 'ledger-spread',
                    layout: 'full',
                    images: [
                        {
                            id: 'ledger-spread-image',
                            media: media(
                                'projects/ledger/gallery-1',
                                'Desktop article page with a large headline and a narrow reading column',
                                'wide',
                                '#ece8de',
                            ),
                            caption: 'Article template at desktop width.',
                        },
                    ],
                },
                {
                    id: 'ledger-phones',
                    layout: 'pair',
                    images: [
                        {
                            id: 'ledger-phone-text',
                            media: media(
                                'projects/ledger/gallery-2',
                                'Phone screen showing body text and a pull quote',
                                'portrait',
                                '#e1ddd2',
                            ),
                            caption:
                                'Body text and pull quote on a small phone.',
                        },
                        {
                            id: 'ledger-phone-table',
                            media: media(
                                'projects/ledger/gallery-3',
                                'Phone screen showing a budget table as stacked rows',
                                'portrait',
                                '#d8e2de',
                            ),
                            caption: 'A budget table, stacked into rows.',
                        },
                    ],
                },
            ],
            challenges: [
                {
                    title: 'Numbers that do not fit',
                    body: 'Some tables had twelve columns. Rather than shrinking them, editors now choose which comparison matters and the full table is offered as a download.',
                },
                {
                    title: 'Old habits in the CMS',
                    body: 'Editors were used to pasting from word processors. Clean paste rules and named styles made the right way the easy way.',
                },
            ],
            outcome: {
                body: [
                    'Editors publish tables again, and investigations run as single pages. The templates are shared with partner newsrooms as an open starting point.',
                ],
                results: [
                    'Single-page investigations restored',
                    'Tables readable without horizontal scrolling',
                    'Editors work in named styles instead of manual formatting',
                ],
                learnings: [
                    'Watching readers on their own devices beats any analytics dashboard.',
                    'The CMS is part of the design; editors are users too.',
                ],
            },
        },
        related: ['groundwater-atlas', 'margin-kit'],
    },
    {
        slug: 'pace-commuter',
        title: 'Pace',
        shortTitle: 'Pace',
        category: 'product',
        context: 'Commuter app concept, tested with daily riders',
        year: 2024,
        summary:
            'A commuter app built around one question — will I make my train? — and tested with daily riders over six weeks.',
        mediums: ['Product design', 'Prototyping', 'Usability testing'],
        featured: false,
        cover: media(
            'projects/pace/cover',
            'Two phone screens showing a departure countdown and a walking route to the platform',
            'landscape',
            '#cfe0da',
        ),
        caseStudy: {
            deck: 'Most transit apps answer every question. Pace answers the one people ask while already walking.',
            facts: [
                { label: 'Role', value: 'Product design and research' },
                { label: 'Duration', value: '6 weeks' },
                { label: 'Participants', value: '12 daily commuters' },
                {
                    label: 'Deliverables',
                    value: 'Prototype, test reports, design specs',
                },
            ],
            background: [
                'This was a self-directed concept study. The aim was to learn how commuters actually use transit information in the minutes before departure.',
            ],
            problem: {
                body: [
                    'Interviews showed the same moment again and again: someone walking quickly, phone in one hand, trying to decide whether to run. Existing apps showed full timetables in that moment.',
                ],
                quote: {
                    text: 'I don’t need the schedule. I need to know whether to hurry.',
                    source: 'Participant, first interview round',
                },
            },
            role: {
                body: [
                    'Ran the interviews, designed and prototyped every screen, and facilitated the weekly tests.',
                ],
                contributions: [
                    'Interviews and diary study',
                    'Interaction and visual design',
                    'Clickable and coded prototypes',
                    'Weekly usability sessions',
                ],
            },
            approach: [
                'Everything is built around a single glanceable answer: on time, hurry, or next train. Detail is one tap away, never on top.',
                'Each week a new prototype went to the same participants, so changes could be judged against last week rather than against a blank slate.',
            ],
            process: [
                {
                    title: 'Diary study',
                    description:
                        'Participants logged every time they checked transit info for a week.',
                },
                {
                    title: 'One-answer screen',
                    description:
                        'Reduced the home screen to a single status and a walking estimate.',
                },
                {
                    title: 'Weekly rounds',
                    description:
                        'Four rounds of testing with the same people, on their real commute.',
                },
                {
                    title: 'Specs',
                    description:
                        'Documented states, edge cases and copy for a future build.',
                },
            ],
            gallery: [
                {
                    id: 'pace-screens',
                    layout: 'full',
                    images: [
                        {
                            id: 'pace-screens-image',
                            media: media(
                                'projects/pace/gallery-1',
                                'Three phone screens: on time, hurry, and next train states',
                                'wide',
                                '#d3e3dd',
                            ),
                            caption: 'The three states of the home screen.',
                        },
                    ],
                },
                {
                    id: 'pace-detail',
                    layout: 'inset-end',
                    images: [
                        {
                            id: 'pace-detail-image',
                            media: media(
                                'projects/pace/gallery-2',
                                'Phone screen with a walking route drawn to the platform entrance',
                                'portrait',
                                '#c6d9d2',
                            ),
                            caption: 'Route detail, one tap from the status.',
                        },
                    ],
                },
            ],
            challenges: [
                {
                    title: 'Unreliable live data',
                    body: 'Live positions were sometimes minutes stale. The design shows confidence honestly — “estimated” in plain words — instead of a precise number that might be wrong.',
                },
                {
                    title: 'Testing on the move',
                    body: 'Lab sessions missed the stress of walking. Most tests moved to real commutes, with consent and short debriefs afterwards.',
                },
            ],
            outcome: {
                body: [
                    'The study produced a tested prototype and a specification ready for development, along with notes on where live data needs to improve first.',
                ],
                results: [
                    'A prototype tested across four weekly rounds',
                    'A state-by-state design specification',
                    'Research notes on live-data confidence',
                ],
                learnings: [
                    'Testing in context surfaced problems the lab never would.',
                    'Showing uncertainty clearly builds more trust than false precision.',
                ],
            },
        },
        related: ['groundwater-atlas', 'margin-kit'],
    },
    {
        slug: 'groundwater-atlas',
        title: 'Groundwater Atlas',
        shortTitle: 'Groundwater',
        category: 'data',
        context: 'Research group monitoring field wells',
        year: 2023,
        summary:
            'A monitoring platform that turns readings from field sensors into maps and trend lines researchers can check, compare and share.',
        mediums: ['Data visualisation', 'Laravel', 'PostGIS'],
        featured: true,
        cover: media(
            'projects/groundwater/cover',
            'Map of monitoring wells with colour-coded water levels beside a trend chart',
            'landscape',
            '#dde5e1',
        ),
        caseStudy: {
            deck: 'Researchers had good data and no way to look at it together. The atlas puts every reading on one shared map.',
            facts: [
                {
                    label: 'Role',
                    value: 'Product design and full-stack development',
                },
                { label: 'Duration', value: '5 months' },
                { label: 'Team', value: 'Three researchers, two developers' },
                {
                    label: 'Stack',
                    value: 'Laravel, PostgreSQL with PostGIS, React',
                },
            ],
            background: [
                'Field sensors logged water levels every hour across dozens of wells. Readings arrived as spreadsheets by email and were merged by hand once a month.',
            ],
            problem: {
                body: [
                    'Nobody could see the whole picture until the monthly merge, and by then a failing sensor had often been sending bad readings for weeks.',
                ],
                quote: {
                    text: 'We find out a sensor died when the graph looks strange a month later.',
                    source: 'Field researcher, kickoff',
                },
            },
            role: {
                body: [
                    'Designed the interface and built most of the backend: ingestion, validation and the map API. Worked closely with the researchers on what “a bad reading” means.',
                ],
                contributions: [
                    'Interface and chart design',
                    'Ingestion and validation pipeline',
                    'Spatial queries and map API',
                    'Data export for publications',
                ],
            },
            approach: [
                'Validation comes first. Readings are checked as they arrive, and anything odd is flagged on the map instead of silently averaged into a trend.',
                'Charts use the researchers’ own conventions — the same units and reference lines as their papers — so nothing needs to be translated.',
            ],
            process: [
                {
                    title: 'Data audit',
                    description:
                        'Collected a year of spreadsheets and listed every kind of error in them.',
                },
                {
                    title: 'Validation rules',
                    description:
                        'Turned those errors into rules the system checks on arrival.',
                },
                {
                    title: 'Map and trends',
                    description:
                        'Designed one map view and one comparison view, nothing more at first.',
                },
                {
                    title: 'Exports',
                    description:
                        'Added citation-ready exports once the team began using it for papers.',
                },
            ],
            gallery: [
                {
                    id: 'groundwater-map',
                    layout: 'full',
                    images: [
                        {
                            id: 'groundwater-map-image',
                            media: media(
                                'projects/groundwater/gallery-1',
                                'Full map of wells, with flagged sensors outlined in rust',
                                'wide',
                                '#e1e8e4',
                            ),
                            caption:
                                'Flagged sensors are outlined on the map, not hidden.',
                        },
                    ],
                },
                {
                    id: 'groundwater-trend',
                    layout: 'inset-start',
                    images: [
                        {
                            id: 'groundwater-trend-image',
                            media: media(
                                'projects/groundwater/gallery-2',
                                'Comparison chart of water levels at three wells over a year',
                                'landscape',
                                '#e9ede9',
                            ),
                            caption:
                                'Comparing wells using the team’s own reference lines.',
                        },
                    ],
                },
            ],
            challenges: [
                {
                    title: 'Defining “wrong”',
                    body: 'A sudden drop can be a broken sensor or a real event. The system flags and asks; it never deletes.',
                },
                {
                    title: 'Slow connections in the field',
                    body: 'Researchers check the map from the field on weak signal. Map tiles and charts load progressively, with the latest reading first.',
                },
            ],
            outcome: {
                body: [
                    'Readings are visible within the hour instead of once a month, and failing sensors are noticed in days rather than weeks.',
                ],
                results: [
                    'Hourly visibility instead of a monthly merge',
                    'Failing sensors flagged automatically',
                    'Exports used directly in publications',
                ],
                learnings: [
                    'Show doubtful data clearly instead of hiding it.',
                    'Matching the users’ existing conventions removed a whole training session.',
                ],
            },
        },
        related: ['quarterly-ledger', 'pace-commuter'],
    },
    {
        slug: 'margin-kit',
        title: 'Margin',
        shortTitle: 'Margin',
        category: 'tools',
        context: 'Design system for a four-person product team',
        year: 2023,
        summary:
            'A shared library of tokens, components and writing guidelines that lets a small team ship consistent screens without a dedicated designer.',
        mediums: ['Design tokens', 'Component library', 'Documentation'],
        featured: false,
        cover: media(
            'projects/margin/cover',
            'Sheet of interface components: buttons, inputs and type specimens on a grid',
            'landscape',
            '#e4e8e3',
        ),
        caseStudy: {
            deck: 'A design system sized for a team of four: small enough to remember, strict enough to keep screens consistent.',
            facts: [
                { label: 'Role', value: 'System design and documentation' },
                { label: 'Duration', value: '8 weeks' },
                { label: 'Team', value: 'Designer, three developers' },
                {
                    label: 'Deliverables',
                    value: 'Tokens, 24 components, writing guide',
                },
            ],
            background: [
                'The team built screens quickly but each developer had their own spacing, colours and wording. Nobody owned design full time.',
            ],
            problem: {
                body: [
                    'Similar screens looked different, and every new feature restarted the same debates about buttons and error messages.',
                ],
            },
            role: {
                body: [
                    'Audited the product, defined the tokens and components, and wrote the documentation with the developers who would use it.',
                ],
                contributions: [
                    'Interface audit',
                    'Token architecture',
                    'Component specs',
                    'Writing and error-message guide',
                ],
            },
            approach: [
                'Start with what exists. Every component in Margin came from a pattern already in the product, cleaned up and named.',
                'Documentation is written as decisions, not rules: why a component exists and when not to use it.',
            ],
            process: [
                {
                    title: 'Audit',
                    description:
                        'Screenshotted every screen and grouped repeated patterns.',
                },
                {
                    title: 'Tokens',
                    description:
                        'Reduced 40 greys and 19 spacings to a short, named scale.',
                },
                {
                    title: 'Components',
                    description:
                        'Specified 24 components with states and edge cases.',
                },
                {
                    title: 'Guides',
                    description:
                        'Wrote short guides for layout, writing and error messages.',
                },
            ],
            gallery: [
                {
                    id: 'margin-sheet',
                    layout: 'full',
                    images: [
                        {
                            id: 'margin-sheet-image',
                            media: media(
                                'projects/margin/gallery-1',
                                'Component sheet showing buttons, fields and alerts in every state',
                                'wide',
                                '#e7ebe6',
                            ),
                            caption:
                                'Every component documented with its states.',
                        },
                    ],
                },
            ],
            challenges: [
                {
                    title: 'Adoption without a mandate',
                    body: 'Nobody could be told to use the system. Migrating the two busiest screens first showed the time saved and did the convincing.',
                },
            ],
            outcome: {
                body: [
                    'New screens are assembled from the library, and design debates now start from a shared vocabulary.',
                ],
                results: [
                    'One token scale across the product',
                    '24 documented components',
                    'A writing guide the team actually quotes',
                ],
                learnings: [
                    'A small system that is used beats a complete one that is not.',
                ],
            },
        },
        related: ['quarterly-ledger', 'pace-commuter'],
    },
    {
        slug: 'small-hours',
        title: 'Small Hours',
        shortTitle: 'Small Hours',
        category: 'illustration',
        context: 'Self-published picture book',
        year: 2022,
        summary:
            'Thirty-two pages of gouache illustrations about a city between midnight and dawn, printed as a short-run picture book.',
        mediums: ['Gouache', 'Digital colour', 'Risograph'],
        featured: false,
        cover: media(
            'projects/small-hours/cover',
            'Illustration of a night street in deep teal with one lit window in warm orange',
            'portrait',
            '#26403c',
        ),
        caseStudy: {
            deck: 'A quiet book about the people who keep a city running at night, painted in three colours and printed by hand.',
            facts: [
                { label: 'Role', value: 'Author and illustrator' },
                { label: 'Duration', value: '9 months' },
                { label: 'Format', value: '32 pages, risograph, 3 colours' },
                { label: 'Edition', value: 'Short run, numbered' },
            ],
            background: [
                'The book grew out of sketches made on night walks: bakers, cleaners, a guard reading under a lamp.',
            ],
            problem: {
                body: [
                    'Risograph printing allows only a few ink colours. The paintings had to be made with that limit in mind from the first sketch, not converted at the end.',
                ],
            },
            role: {
                body: [
                    'Wrote, illustrated, separated the colours and supervised printing.',
                ],
                contributions: [
                    'Story and text',
                    'Gouache illustration',
                    'Colour separation',
                    'Print supervision and binding',
                ],
            },
            approach: [
                'Each spread was painted in three gouache colours matching the riso inks: deep teal, warm orange and a soft grey.',
            ],
            process: [
                {
                    title: 'Night sketches',
                    description: 'Two notebooks of sketches made on location.',
                },
                {
                    title: 'Three-colour paintings',
                    description: 'Paintings made with the ink limits in mind.',
                },
                {
                    title: 'Separation',
                    description:
                        'Each painting split into three layers for the drums.',
                },
                {
                    title: 'Print and bind',
                    description:
                        'Printed and bound by hand in a numbered edition.',
                },
            ],
            gallery: [
                {
                    id: 'small-hours-spread',
                    layout: 'full',
                    images: [
                        {
                            id: 'small-hours-spread-image',
                            media: media(
                                'projects/small-hours/gallery-1',
                                'Book spread: a bakery lit from inside on a dark street',
                                'wide',
                                '#22383a',
                            ),
                            caption: 'Spread 5. The bakery opens at three.',
                        },
                    ],
                },
                {
                    id: 'small-hours-detail',
                    layout: 'inset-start',
                    images: [
                        {
                            id: 'small-hours-detail-image',
                            media: media(
                                'projects/small-hours/gallery-2',
                                'Detail of riso grain where orange and teal inks overlap',
                                'square',
                                '#c6603e',
                            ),
                            caption:
                                'Detail of the overprint where two inks meet.',
                        },
                    ],
                },
            ],
            challenges: [
                {
                    title: 'Registration',
                    body: 'Riso layers never align perfectly. The paintings use loose edges so small shifts read as texture rather than error.',
                },
            ],
            outcome: {
                body: [
                    'The book was printed as a small numbered edition and sold at independent book fairs.',
                ],
                results: [
                    'A 32-page three-colour picture book',
                    'A numbered short-run edition',
                ],
                learnings: [
                    'Designing for the print process from the first sketch saves months.',
                ],
            },
        },
        related: ['tidewater', 'fieldnote-identity'],
    },
];
