import ConnectDB from "@/lib/mongodb";
import Page from "@/models/Page";

async function getHomeContent() {
  await ConnectDB();
  const page = await Page.findOne({ pageName : "home" });
  return page;
}

export default async function Home() {
  const content = await getHomeContent();
  const sections = content?.sections || [];
  const hero = sections.find(s=>s.sectionName === "hero");
  const about = sections.find(s=>s.sectionName === "about");

  return (
    <main>
      <div className="bg-blue-900 text-white py-20 px-6 text-center">
                <h1 className="text-4xl font-bold mb-4">{hero?.titleEn || "Indian Hardware and Sanitary News"}</h1>
                <p className="text-xl">
                    {hero?.contentEn || "India's leading trade magazine since 1994"}
                </p>
            </div>

            {/* About Section */}
            <div className="max-w-4xl mx-auto py-16 px-6">
                <h2 className="text-3xl font-bold mb-6">
                    {about?.titleEn || "About Us"}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                    {about?.contentEn || "Welcome to IHSN"}
                </p>
            </div>
        </main>
  )

}