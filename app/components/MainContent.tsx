import HeroVisual from "./HeroVisual";
import ContentBlock from "./ContentBlock";

export default function MainContent() {
  return (
    <main className="flex-1 flex flex-col lg:flex-row">
      <HeroVisual />
      <ContentBlock />
    </main>
  );
}
