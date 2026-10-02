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

// Banner at the top of a section page.
const pageTitle = fields.text({ label: "Page title" });
const pageSubtitle = fields.text({ label: "Subtitle", multiline: true });

// Title + description for a Projects tab (its card on /projects and its own banner).
const categoryText = (label: string) =>
  fields.object(
    {
      title: fields.text({ label: "Title" }),
      description: fields.text({ label: "Description", multiline: true }),
    },
    { label },
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
      schema: {
        status: fields.text({
          label: "Status tag",
          description: "Small tag at the top of the About card.",
        }),
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
        photo: fields.text({
          label: "Photo",
          description: 'An image in public/, e.g. "/about/me.jpg" for public/about/me.jpg.',
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
        featuredHeading: fields.text({
          label: "Featured heading",
          description:
            "To choose what's featured, set \"Featured on homepage\" on a project or " +
            "experience entry.",
        }),
      },
    }),

    projectsPage: singleton({
      label: "Projects page",
      path: "content/pages/projects",
      format: { data: "yaml" },
      schema: {
        title: pageTitle,
        subtitle: pageSubtitle,
        // One entry per tab in src/lib/project-categories.ts.
        categories: fields.object(
          { personal: categoryText("Personal Projects"), class: categoryText("Class Projects") },
          { label: "Project tabs" },
        ),
      },
    }),

    experiencePage: singleton({
      label: "Experience page",
      path: "content/pages/experience",
      format: { data: "yaml" },
      schema: {
        title: pageTitle,
        subtitle: pageSubtitle,
        clubsHeading: fields.text({ label: "Left window heading (Clubs & Research Labs)" }),
        workHeading: fields.text({ label: "Right window heading (Work Experience)" }),
      },
    }),

    courseworkPage: singleton({
      label: "Coursework page",
      path: "content/pages/coursework",
      format: { data: "yaml" },
      schema: { title: pageTitle, subtitle: pageSubtitle },
    }),

    resumePage: singleton({
      label: "Resume page",
      path: "content/pages/resume",
      format: { data: "yaml" },
      schema: {
        title: pageTitle,
        description: pageSubtitle,
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
      },
    }),

    contactPage: singleton({
      label: "Contact page",
      path: "content/pages/contact",
      format: { data: "yaml" },
      schema: {
        title: pageTitle,
        description: pageSubtitle,
      },
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
