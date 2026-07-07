import { ServiceCategory, Project, SocialLink } from "./types";
import settingsData from "../content/settings.json";
import servicesData from "../content/services.json";

// Dynamic type cast for loaded singletons
export const SETTINGS_DATA = settingsData;
export const SOCIAL_LINKS: SocialLink[] = settingsData.socialLinks as SocialLink[];
export const SERVICES_DATA: ServiceCategory[] = servicesData.services as ServiceCategory[];

// We load all JSON files under '../content/projects/*.json' dynamically at build time
const projectFiles = import.meta.glob("../content/projects/*.json", { eager: true });

export const PROJECTS_DATA: Project[] = Object.entries(projectFiles).map(
  ([filePath, module]: [string, any]) => {
    // Extract file name as id, e.g. "../content/projects/obsidian-geometrics.json" -> "obsidian-geometrics"
    const fileName = filePath.split("/").pop() || "";
    const id = fileName.replace(".json", "");

    return {
      id,
      ...module.default,
    } as Project;
  }
);
