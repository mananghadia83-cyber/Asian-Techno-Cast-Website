import { makeContentPage } from "@/components/GenericPage";

const { generateMetadata, ContentPage } = makeContentPage("privacy", "/privacy", { cta: false });
export { generateMetadata };
export default ContentPage;
