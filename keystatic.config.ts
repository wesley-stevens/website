import { collection, config, fields, singleton } from "@keystatic/core";
import { projectCategories } from "./src/lib/project-categories";

// Content editor at /keystatic (run `npm run dev`). Entries are saved as YAML
// files under content/, which the site reads at build time (src/lib/keystatic.ts).

const order = fields.integer({
  label: "Order",
  description: "Lower numbers are shown first.",
  validation: { isRequired: true },
});

// Puts an entry in the homepage Featured row. Lives on each entry (instead of a list
// on the Homepage) so renaming an entry's slug never breaks the Featured row.
const featured = fields.integer({
  label: "Featured on homepage",
  description:
    "Position in the homepage Featured row (1 = first). Leave empty to not feature it.",
});

// A photo or video on a project page.
const mediaSrc = fields.text({
  label: "File",
  description:
    'Put files in the project\'s folder, public/project-media/<slug>/, and enter ' +
    '"/project-media/<slug>/<file>". The folder doesn\'t rename itself if you change the ' +
    "slug, so enter the folder's actual name. Videos can also be a YouTube link. " +
    "Use .mp4 (H.264) for videos.",
  validation: { isRequired: true },
});
const mediaLabel = fields.text({
  label: "Label",
  description: 'Short title shown above, e.g. "Win condition".',
});
const mediaCaption = fields.text({
  label: "Caption",
  description: "Sentence shown below.",
  multiline: true,
});

// Title + description for a Projects tab (its card on /projects and its own banner).
const categoryText = (label: string) =>
  fields.object(
    {
      title: fields.text({ label: "Title" }),
      description: fields.text({ label: "Description", multiline: true }),
    },
    { label },
  );

// --- Page sections ---------------------------------------------------------------
// Every page is a list of sections, shown top to bottom (rendered by
// src/components/PageSections.tsx). Any section can go on any page.

const tabTitle = fields.text({
  label: "Browser tab title",
  description: 'Shown in the browser tab as "<this> · <Name>".',
});

const hidden = fields.checkbox({
  label: "Hide this section",
  description: "Keeps it saved, but leaves it off the page.",
});

const columns = fields.select({
  label: "Columns",
  description: "Cards per row on wide screens (phones always show 1).",
  options: [
    { label: "3", value: "3" },
    { label: "2", value: "2" },
    { label: "1", value: "1" },
  ],
  defaultValue: "3",
});

const width = fields.select({
  label: "Width",
  options: [
    { label: "Wide", value: "wide" },
    { label: "Narrow", value: "narrow" },
  ],
  defaultValue: "wide",
});

const buttonList = (label: string) =>
  fields.array(
    fields.object({
      label: fields.text({ label: "Label" }),
      href: fields.text({
        label: "Link",
        description: 'A page like "/projects", or a full URL like "https://…".',
      }),
      style: fields.select({
        label: "Style",
        options: [
          { label: "Solid", value: "primary" },
          { label: "Outline", value: "secondary" },
        ],
        defaultValue: "primary",
      }),
    }),
    { label, itemLabel: (props) => props.fields.label.value },
  );

// Section-list label: "<Type>: <first text field>", plus "(hidden)" when hidden.
const sectionLabel =
  (type: string, key?: string) =>
  (props: { fields: Record<string, unknown> }) => {
    const value = (k: string) => (props.fields[k] as { value?: unknown } | undefined)?.value;
    const text = key ? String(value(key) ?? "") : "";
    const name = text ? `${type}: ${text.slice(0, 50)}` : type;
    return value("hidden") ? `${name} (hidden)` : name;
  };

const sections = fields.blocks(
  {
    banner: {
      label: "Banner",
      itemLabel: sectionLabel("Banner", "title"),
      schema: fields.object({
        title: fields.text({ label: "Title" }),
        subtitle: fields.text({ label: "Subtitle", multiline: true }),
        size: fields.select({
          label: "Size",
          options: [
            { label: "Tall", value: "tall" },
            { label: "Compact (content starts higher)", value: "compact" },
          ],
          defaultValue: "tall",
        }),
        hidden,
      }),
    },
    heading: {
      label: "Heading",
      itemLabel: sectionLabel("Heading", "title"),
      schema: fields.object({
        title: fields.text({ label: "Title" }),
        description: fields.text({ label: "Description", multiline: true }),
        size: fields.select({
          label: "Size",
          options: [
            { label: "Large", value: "xl" },
            { label: "Medium", value: "lg" },
            { label: "Small", value: "md" },
          ],
          defaultValue: "xl",
        }),
        hidden,
      }),
    },
    text: {
      label: "Text",
      itemLabel: sectionLabel("Text", "text"),
      schema: fields.object({
        text: fields.text({
          label: "Text",
          description: "A blank line starts a new paragraph.",
          multiline: true,
        }),
        style: fields.select({
          label: "Style",
          options: [
            { label: "Plain", value: "plain" },
            { label: "In a box", value: "panel" },
          ],
          defaultValue: "plain",
        }),
        width,
        hidden,
      }),
    },
    media: {
      label: "Image or video",
      itemLabel: sectionLabel("Image or video", "src"),
      schema: fields.object({
        type: fields.select({
          label: "Type",
          options: [
            { label: "Image", value: "image" },
            { label: "Video", value: "video" },
          ],
          defaultValue: "image",
        }),
        src: fields.text({
          label: "File",
          description:
            'A file in public/, e.g. "/about/me.jpg" for public/about/me.jpg. ' +
            "Videos can also be a YouTube link.",
          validation: { isRequired: true },
        }),
        label: mediaLabel,
        caption: mediaCaption,
        width,
        hidden,
      }),
    },
    buttons: {
      label: "Buttons",
      itemLabel: sectionLabel("Buttons"),
      schema: fields.object({
        buttons: buttonList("Buttons"),
        align: fields.select({
          label: "Alignment",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
          ],
          defaultValue: "left",
        }),
        hidden,
      }),
    },
    spacer: {
      label: "Spacer",
      itemLabel: sectionLabel("Spacer", "size"),
      schema: fields.object({
        size: fields.select({
          label: "Size",
          options: [
            { label: "Small", value: "small" },
            { label: "Medium", value: "medium" },
            { label: "Large", value: "large" },
          ],
          defaultValue: "medium",
        }),
        hidden,
      }),
    },
    about: {
      label: "About (intro card with photo)",
      itemLabel: sectionLabel("About", "heading"),
      schema: fields.object({
        status: fields.text({ label: "Status tag", description: "Small tag at the top." }),
        heading: fields.text({ label: "Heading" }),
        body: fields.text({
          label: "Intro",
          description: "A blank line starts a new paragraph.",
          multiline: true,
        }),
        skills: fields.array(fields.text({ label: "Skill" }), {
          label: "Skills",
          description: "Tags under the intro.",
          itemLabel: (props) => props.value,
        }),
        showSocials: fields.checkbox({
          label: "Show GitHub and LinkedIn buttons",
          defaultValue: true,
        }),
        photo: fields.text({
          label: "Photo",
          description: 'An image in public/, e.g. "/about/me.jpg" for public/about/me.jpg.',
        }),
        photoPosition: fields.select({
          label: "Photo position",
          options: [
            { label: "Right", value: "right" },
            { label: "Left", value: "left" },
            { label: "No photo", value: "none" },
          ],
          defaultValue: "right",
        }),
        buttons: fields.array(
          fields.object({
            label: fields.text({ label: "Label" }),
            href: fields.text({ label: "Link", description: 'e.g. "/projects"' }),
          }),
          {
            label: "Buttons under the photo",
            itemLabel: (props) => props.fields.label.value,
            validation: { length: { max: 2 } },
          },
        ),
        hidden,
      }),
    },
    featured: {
      label: "Featured cards",
      itemLabel: sectionLabel("Featured", "heading"),
      schema: fields.object({
        heading: fields.text({
          label: "Heading",
          description:
            'To choose what\'s featured, set "Featured on homepage" on a project or ' +
            "experience entry.",
        }),
        columns,
        hidden,
      }),
    },
    projectTabs: {
      label: "Project tab cards",
      itemLabel: sectionLabel("Project tab cards"),
      schema: fields.object({ columns, hidden }),
    },
    projectCards: {
      label: "Project cards",
      itemLabel: sectionLabel("Project cards", "category"),
      schema: fields.object({
        category: fields.select({
          label: "Which projects",
          options: [
            { label: "All projects", value: "all" },
            ...projectCategories.map((c) => ({ label: c.label, value: c.slug })),
          ],
          defaultValue: "all",
        }),
        columns,
        hidden,
      }),
    },
    courses: {
      label: "Coursework cards",
      itemLabel: sectionLabel("Coursework cards"),
      schema: fields.object({ columns, hidden }),
    },
    experience: {
      label: "Experience windows",
      itemLabel: sectionLabel("Experience windows"),
      schema: fields.object({
        clubsHeading: fields.text({ label: "Clubs & Research Labs heading" }),
        workHeading: fields.text({ label: "Work Experience heading" }),
        arrangement: fields.select({
          label: "Arrangement",
          options: [
            { label: "Side by side (wide screens)", value: "side" },
            { label: "Stacked", value: "stacked" },
          ],
          defaultValue: "side",
        }),
        first: fields.select({
          label: "Shown first",
          options: [
            { label: "Clubs & Research Labs", value: "clubs" },
            { label: "Work Experience", value: "work" },
          ],
          defaultValue: "clubs",
        }),
        hidden,
      }),
    },
    resume: {
      label: "Resume",
      itemLabel: sectionLabel("Resume", "title"),
      schema: fields.object({
        title: fields.text({ label: "Title" }),
        description: fields.text({ label: "Description", multiline: true }),
        updated: fields.text({
          label: "Last updated",
          description: 'Shown as "Updated <this>". Bump it when you replace the PDF.',
        }),
        file: fields.text({
          label: "Resume PDF",
          description: 'Path to the PDF in public/, e.g. "/resume.pdf" for public/resume.pdf.',
        }),
        downloadName: fields.text({
          label: "Download file name",
          description: "Name visitors' browsers save the PDF as.",
        }),
        showViewer: fields.checkbox({
          label: "Show the PDF viewer",
          description: "Off: just the heading and Download button.",
          defaultValue: true,
        }),
        hidden,
      }),
    },
    contact: {
      label: "Contact cards",
      itemLabel: sectionLabel("Contact", "title"),
      schema: fields.object({
        title: fields.text({ label: "Title" }),
        description: fields.text({ label: "Description", multiline: true }),
        columns,
        hidden,
      }),
    },
  },
  {
    label: "Sections",
    description: "The page, top to bottom. Drag to reorder; Add to insert a new section.",
  },
);

export default config({
  storage: { kind: "local" },
  ui: {
    brand: { name: "Wesley Stevens" },
    navigation: {
      Pages: ["home", "projectsPage", "experiencePage", "courseworkPage", "resumePage", "contactPage"],
      Content: ["projects", "coursework", "experience"],
      Settings: ["settings"],
    },
  },
  singletons: {
    settings: singleton({
      label: "Site settings",
      path: "content/pages/settings",
      format: { data: "yaml" },
      schema: {
        name: fields.text({ label: "Name", description: "Shown in the navbar and footer." }),
        title: fields.text({
          label: "Browser tab title",
          description: "Used on the homepage; other pages show \"<page> · <Name>\".",
        }),
        description: fields.text({
          label: "Site description",
          description: "Shown in search results and link previews.",
          multiline: true,
        }),
        location: fields.text({ label: "Location", description: "Shown in the footer." }),
        email: fields.text({ label: "Personal email (preferred)" }),
        schoolEmail: fields.text({ label: "School email" }),
        phone: fields.text({ label: "Phone" }),
        github: fields.url({ label: "GitHub URL" }),
        linkedin: fields.url({ label: "LinkedIn URL" }),
      },
    }),

    home: singleton({
      label: "Homepage",
      path: "content/pages/home",
      format: { data: "yaml" },
      schema: { sections },
    }),

    projectsPage: singleton({
      label: "Projects page",
      path: "content/pages/projects",
      format: { data: "yaml" },
      schema: {
        title: tabTitle,
        // One entry per tab in src/lib/project-categories.ts.
        categories: fields.object(
          { personal: categoryText("Personal Projects"), class: categoryText("Class Projects") },
          {
            label: "Project tabs",
            description: "Each tab's card on this page and the banner on the tab's own page.",
          },
        ),
        sections,
      },
    }),

    experiencePage: singleton({
      label: "Experience page",
      path: "content/pages/experience",
      format: { data: "yaml" },
      schema: { title: tabTitle, sections },
    }),

    courseworkPage: singleton({
      label: "Coursework page",
      path: "content/pages/coursework",
      format: { data: "yaml" },
      schema: { title: tabTitle, sections },
    }),

    resumePage: singleton({
      label: "Resume page",
      path: "content/pages/resume",
      format: { data: "yaml" },
      schema: { title: tabTitle, sections },
    }),

    contactPage: singleton({
      label: "Contact page",
      path: "content/pages/contact",
      format: { data: "yaml" },
      schema: { title: tabTitle, sections },
    }),
  },
  collections: {
    projects: collection({
      label: "Projects",
      path: "content/projects/*",
      format: { data: "yaml" },
      slugField: "title",
      entryLayout: "form",
      columns: ["title", "order"],
      schema: {
        title: fields.slug({
          name: { label: "Title" },
          slug: {
            label: "Slug",
            description: "Used in the URL: /projects/<category>/<slug>.",
          },
        }),
        order: order,
        category: fields.select({
          label: "Category",
          description: "The Projects tab this appears under.",
          options: projectCategories.map((c) => ({ label: c.label, value: c.slug })),
          defaultValue: "personal",
        }),
        summary: fields.text({ label: "Summary", multiline: true }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          description: "Key software/hardware, shown in the card's top-right corner.",
          itemLabel: (props) => props.value,
        }),
        year: fields.text({ label: "Year" }),
        course: fields.text({
          label: "Course",
          description: 'e.g. "E E 233" for class projects. Must match the course\'s Code.',
        }),
        finalProject: fields.checkbox({
          label: "Course final project",
          description:
            'Adds a "Final project" link to this on the Coursework card whose Code matches Course.',
        }),
        featured,
        // Content blocks for the project's detail page, shown top to bottom.
        details: fields.blocks(
          {
            heading: {
              label: "Heading",
              itemLabel: (props) => `Heading: ${props.value}`,
              schema: fields.text({ label: "Heading" }),
            },
            text: {
              label: "Text",
              itemLabel: (props) => props.value.slice(0, 60),
              schema: fields.text({
                label: "Text",
                description: "A blank line starts a new paragraph.",
                multiline: true,
              }),
            },
            list: {
              label: "Bullet list",
              schema: fields.array(fields.text({ label: "Bullet", multiline: true }), {
                label: "Bullets",
                itemLabel: (props) => props.value.slice(0, 60),
              }),
            },
            image: {
              label: "Image",
              itemLabel: (props) => `Image: ${props.fields.src.value}`,
              schema: fields.object({ src: mediaSrc, label: mediaLabel, caption: mediaCaption }),
            },
            video: {
              label: "Video",
              itemLabel: (props) => `Video: ${props.fields.src.value}`,
              schema: fields.object({ src: mediaSrc, label: mediaLabel, caption: mediaCaption }),
            },
            gallery: {
              label: "Gallery (side by side)",
              schema: fields.array(
                fields.object({
                  type: fields.select({
                    label: "Type",
                    options: [
                      { label: "Image", value: "image" },
                      { label: "Video", value: "video" },
                    ],
                    defaultValue: "image",
                  }),
                  src: mediaSrc,
                  label: mediaLabel,
                  caption: mediaCaption,
                }),
                {
                  label: "Items",
                  itemLabel: (props) => props.fields.label.value || props.fields.src.value,
                },
              ),
            },
            row: {
              label: "Image row (small, side by side)",
              itemLabel: (props) => `Image row: ${props.elements.length} images`,
              schema: fields.array(
                fields.object({ src: mediaSrc, label: mediaLabel, caption: mediaCaption }),
                {
                  label: "Images",
                  description:
                    "All images sit in one row across the page (2 per row on phones). " +
                    "Click one to open it full size.",
                  itemLabel: (props) => props.fields.label.value || props.fields.src.value,
                  validation: { length: { min: 1, max: 6 } },
                },
              ),
            },
          },
          { label: "Details" },
        ),
      },
    }),

    coursework: collection({
      label: "Coursework",
      path: "content/coursework/*",
      format: { data: "yaml" },
      slugField: "code",
      entryLayout: "form",
      columns: ["code", "order"],
      schema: {
        code: fields.slug({ name: { label: "Code", description: 'e.g. "E E 271"' } }),
        order: fields.integer({
          label: "Order",
          description: "Cards are numbered in this order (lowest first).",
          validation: { isRequired: true },
        }),
        title: fields.text({ label: "Title" }),
        term: fields.text({ label: "Term", description: 'e.g. "Autumn 2025"' }),
        description: fields.text({
          label: "Description",
          description:
            'To link a final project, tick "Course final project" on that project and set ' +
            "its Course to this Code.",
          multiline: true,
        }),
      },
    }),

    experience: collection({
      label: "Experience",
      path: "content/experience/*",
      format: { data: "yaml" },
      slugField: "title",
      entryLayout: "form",
      columns: ["title", "section", "order"],
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            description: 'Role or organization, e.g. "Undergraduate Researcher".',
          },
        }),
        section: fields.select({
          label: "Section",
          description: "Which window on the Experience page this appears in.",
          options: [
            { label: "Clubs & Research Labs", value: "clubs" },
            { label: "Work Experience", value: "work" },
          ],
          defaultValue: "work",
        }),
        order: order,
        subtitle: fields.text({ label: "Subtitle", description: "e.g. the lab, team, or project." }),
        location: fields.text({ label: "Location" }),
        dates: fields.text({ label: "Dates", description: 'e.g. "January 2026 – Present"' }),
        logo: fields.text({
          label: "Logo",
          description:
            'File name (no extension) of an image in public/logos/, e.g. "uw-logo". ' +
            "Hidden until the file exists.",
        }),
        logoOnWhite: fields.checkbox({
          label: "Logo on white",
          description: "Show the logo on a white tile (for dark logos).",
        }),
        bullets: fields.array(fields.text({ label: "Bullet", multiline: true }), {
          label: "Bullets",
          description: "What you do there.",
          itemLabel: (props) => props.value.slice(0, 60),
        }),
        id: fields.text({
          label: "Link ID",
          description:
            'Optional: e.g. "ipl-research" makes /experience#ipl-research scroll to this entry.',
        }),
        featured,
        summary: fields.text({
          label: "Featured summary",
          description: "Optional: short blurb for this role's card in the homepage Featured row.",
          multiline: true,
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Featured tags",
          description: "Optional: tool tags for the homepage Featured card.",
          itemLabel: (props) => props.value,
        }),
      },
    }),
  },
});
