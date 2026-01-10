import React from "react";
import Banner from "@/shared/components/banner/Banner";

const IdeasPage = () => {
  const bannerImage = "/placeholder-banner.jpg";

  return (
    <div className="bg-white min-h-screen">
      <Banner
        image={bannerImage}
        title="Ideas"
        subtitle="Where all our great things begin"
        height="large"
        imageAlt="Ideas banner"
        backgroundColor="#ffffff"
      />

      <div className="bg-white min-h-screen py-20 px-4 md:px-6 lg:px-8"></div>
    </div>
  );
};

export default IdeasPage;
