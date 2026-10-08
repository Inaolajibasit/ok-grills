import { HomeHero } from "@/components/home/home-hero";
import { CategoryDiscovery } from "@/components/home/category-discovery";
import { GrillStory } from "@/components/home/grill-story";
import { FamilyFeast } from "@/components/home/family-feast";
import { HomeMenuFeature } from "@/components/home/home-menu-feature";
import { getProductBySlug, getProductsByCategory } from "@/services/products";
import { getFeaturedCategories } from "@/services/categories";
import { getSiteSettings } from "@/services/settings";

export default async function Home() {
  const [settings, categories] = await Promise.all([
    getSiteSettings(),
    getFeaturedCategories(),
  ]);
  const [familyFeast, breakfastProducts, localProducts] = await Promise.all([
    getProductBySlug(settings.familyFeast.productSlug),
    getProductsByCategory("breakfast"),
    getProductsByCategory("local"),
  ]);
  const breakfastCategory = categories.find((category) => category.id === "breakfast");
  const localCategory = categories.find((category) => category.id === "local");

  return (
    <>
      <HomeHero content={settings.hero} />
      <CategoryDiscovery categories={categories} />
      <GrillStory content={settings.grillStory} />
      {familyFeast && <FamilyFeast content={settings.familyFeast} product={familyFeast} />}
      {breakfastCategory && <HomeMenuFeature category={breakfastCategory} products={breakfastProducts} content={settings.homeMenuFeatures.breakfast} theme="light" />}
      {localCategory && <HomeMenuFeature category={localCategory} products={localProducts} content={settings.homeMenuFeatures.local} theme="dark" />}
    </>
  );
}
