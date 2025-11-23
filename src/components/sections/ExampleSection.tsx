import { Section } from "@/components/ui/section";
import { useLanguage } from "@/hooks/useLanguage";

export const ExampleSection = () => {
  const { t } = useLanguage();

  return (
    <Section
      id="example"
      title={{
        title: t.projects.title,
        subtitle: t.projects.subtitle,
        gradient: "primary",
        align: "center",
      }}
      background="gradient-dark"
      containerWidth="7xl"
      paddingY="lg"
      paddingX="md"
      dataTour="example-section"
    >
      {/* Your section content here */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Content cards, grids, etc */}
      </div>
    </Section>
  );
};
