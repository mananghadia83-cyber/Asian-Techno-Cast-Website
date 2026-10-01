import { makeContentPage } from "@/components/GenericPage";

// Required for German-facing business sites; exists only under /de/impressum.
const { generateMetadata, ContentPage } = makeContentPage("impressum", "/impressum", {
  only: ["de"],
  cta: false,
});
export { generateMetadata };
export default ContentPage;
