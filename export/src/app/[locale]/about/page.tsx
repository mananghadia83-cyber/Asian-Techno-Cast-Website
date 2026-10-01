import { makeContentPage } from "@/components/GenericPage";

const { generateMetadata, ContentPage } = makeContentPage("about", "/about");
export { generateMetadata };
export default ContentPage;
