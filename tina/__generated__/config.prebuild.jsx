// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  // Get this from tina.io in production
  clientId: process.env.TINA_CLIENT_ID || "dummy",
  // Get this from tina.io in production
  token: process.env.TINA_TOKEN || "dummy",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  // See https://tina.io/docs/schema/ for more information
  schema: {
    collections: [
      {
        name: "project",
        label: "Projects",
        path: "content/projects",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            required: true
          },
          {
            type: "string",
            name: "year",
            label: "Year",
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true
          },
          {
            type: "image",
            name: "imageUrl",
            label: "Image"
          }
        ]
      },
      {
        name: "services",
        label: "Services",
        path: "content",
        match: {
          include: "services"
        },
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          {
            type: "object",
            name: "services",
            label: "Services Categories List",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.title || "New Category" };
              }
            },
            fields: [
              {
                type: "string",
                name: "id",
                label: "ID (e.g. 01, 02)"
              },
              {
                type: "string",
                name: "title",
                label: "Title"
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "object",
                name: "items",
                label: "Service Items",
                list: true,
                ui: {
                  itemProps: (item) => {
                    return { label: item?.name || "New Item" };
                  }
                },
                fields: [
                  {
                    type: "string",
                    name: "id",
                    label: "ID"
                  },
                  {
                    type: "string",
                    name: "name",
                    label: "Name"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: "settings",
        label: "Settings",
        path: "content",
        match: {
          include: "settings"
        },
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          {
            type: "object",
            name: "socialLinks",
            label: "Social Links",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.name || "New Link" };
              }
            },
            fields: [
              {
                type: "string",
                name: "name",
                label: "Name"
              },
              {
                type: "string",
                name: "url",
                label: "URL"
              },
              {
                type: "string",
                name: "label",
                label: "Label"
              },
              {
                type: "string",
                name: "icon",
                label: "Icon (e.g. Instagram)"
              }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
