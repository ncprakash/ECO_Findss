import React from "react";

const stories = [
  {
    name: "Sarah's Story",
    title: "I donated my old books and they reached someone in need!",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzgdhmahujhidcCDMybssAlan4SK8cx7oFJ1xHxQmMJfBaF65FZEI_2tVHBUf22OVAEfMchSgDNNziOMS7bvtZV_Q4pyT0sbeUAS_PuwmW2LYQo8mcUHmQNddAxi6f0iBEusMija4cEyHUOjyUHmtBefF05stDosWcdl_DY953F5DYB3Y-Iz-Duqm3L1eGfmXs-fELBzV4cV-hVFckXkjB3JFVl7opfujrSAqk07wFRSsRTvUKap1t4Ro_EzOBcwI83dCXCHJFR1E",
  },
  {
    name: "Mark's Story",
    title: "Found a perfect bike for my son!",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMg_G8aHm41CboH7I0O6Bknqqb-ycFE3NRKH1CJUQP2std03FWhsGhyYqX3vM9iFhZCLAtCdx6q65Liv2EN9e-e3saZIQAh6aIP47VaWzL09XqJD0twPjqbMHz740g6CT9_2Us8mHigGYLTZjso9eQIg_nxKDVRYgDHfLAOvl-PtdhuiNxLlfBJqF5c0Q4hQxiC6diJIDe7ba_kFWkzdTE3VtJQ7xV_LhTgmohnNDYoR4wt_FIgmo04WgoO0vUISNqR-S2L__HoN8",
  },
  {
    name: "Emily's Story",
    title: "Shared my extra furniture with a family in need.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1jqW1CZ7mDblyuq37K-3qsSmRoSXglS9_wNKkKazDl_Agx2nV6CyS_9n0RTRKaUZjXNHpcuks3K6o_Uf0X2pZ2wB3qaDRZeUwvSGn-oztnGWLXayGJa2PNkAcaiEANfzYUvZJLZEvVKIJodR7lxOAnAWETRg0bz_yDnk_eN5LrfT1z1pGNtswAJmCsc-bU6bU1Z67U9t5hatNdhzJw6WWE7VRECz5UyQuF9KvwUQHx6ckZ47sqVfBAGuY07ueAc0eYv3L264XTI8",
  },
];

export default function CommunityStoriesSlider() {
  return (
    <section className="relative w-full overflow-hidden py-10">
      <h2 className="text-2xl font-bold text-background-dark dark:text-background-light mb-6 px-4">
        Community Stories
      </h2>

      {/* First row (left → right) */}
      <div className="relative">
        <div className="flex gap-6 animate-scroll-left">
          {[...stories, ...stories].map((story, i) => (
            <div
              key={i}
              className="min-w-[250px] bg-white dark:bg-background-dark/60 rounded-xl shadow-md overflow-hidden flex flex-col"
            >
              <div
                className="h-40 bg-cover bg-center"
                style={{ backgroundImage: `url(${story.img})` }}
              />
              <div className="p-3">
                <p className="text-sm font-medium text-primary">{story.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {story.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Blur + Fade masks */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background-light/95 dark:from-background-dark/95 via-background-light/60 dark:via-background-dark/60 to-transparent backdrop-blur-md pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-background-light/95 dark:from-background-dark/95 via-background-light/60 dark:via-background-dark/60 to-transparent backdrop-blur-md pointer-events-none" />
      </div>

      {/* Second row (right → left) */}
      <div className="relative mt-8">
        <div className="flex gap-6 animate-scroll-right">
          {[...stories, ...stories].map((story, i) => (
            <div
              key={i}
              className="min-w-[250px] bg-white dark:bg-background-dark/60 rounded-xl shadow-md overflow-hidden flex flex-col"
            >
              <div
                className="h-40 bg-cover bg-center"
                style={{ backgroundImage: `url(${story.img})` }}
              />
              <div className="p-3">
                <p className="text-sm font-medium text-primary">{story.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {story.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Blur + Fade masks */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background-light/95 dark:from-background-dark/95 via-background-light/60 dark:via-background-dark/60 to-transparent backdrop-blur-md pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-background-light/95 dark:from-background-dark/95 via-background-light/60 dark:via-background-dark/60 to-transparent backdrop-blur-md pointer-events-none" />
      </div>
    </section>
  );
}
