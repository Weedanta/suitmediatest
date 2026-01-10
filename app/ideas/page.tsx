import React from "react";
import Banner from "@/shared/components/banner/Banner";
import { ArticleList } from "@/shared/components/articles/ArticleList";
import { fetchIdeasServer } from "@/lib/api/ideas-server";

const IdeasPage = async () => {
  const bannerImage = "/placeholder-banner.jpg";

  let initialData;
  try {
    initialData = await fetchIdeasServer({
      page: 1,
      size: 10,
      sort: "-published_at",
    });
  } catch (error) {
    console.error("Failed to fetch initial data:", error);
    initialData = { data: [], meta: undefined };
  }

  return (
    <div className="bg-white min-h-screen">
      <Banner
        image={bannerImage}
        title="Ideas"
        subtitle="Where all our great things begin"
        height="large"
        imageAlt="Ideas banner"
        backgroundColor="var(--background-page)"
      />

      <ArticleList initialData={initialData} />
    </div>
  );
};

export default IdeasPage;
