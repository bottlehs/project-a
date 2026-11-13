"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import Reveal from "@/components/ui/Reveal";
import {
  portfolioCategories,
  type PortfolioCategory,
} from "@/data/site";

type PortfolioProject = {
  category: Exclude<PortfolioCategory, "전체">;
  title: string;
  desc: string;
};

type PortfolioTabsProps = {
  projects: readonly PortfolioProject[];
};

export default function PortfolioTabs({ projects }: PortfolioTabsProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<PortfolioCategory>("전체");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const selectedTabId = `portfolio-tab-${portfolioCategories.indexOf(selectedCategory)}`;
  const filteredProjects =
    selectedCategory === "전체"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  function handleTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let nextIndex: number | undefined;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (index + 1) % portfolioCategories.length;
        break;
      case "ArrowLeft":
        nextIndex =
          (index - 1 + portfolioCategories.length) % portfolioCategories.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = portfolioCategories.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    setSelectedCategory(portfolioCategories[nextIndex]);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <>
      <div
        aria-label="포트폴리오 분류"
        className="-mx-5 mb-8 overflow-x-auto px-5 md:mx-0 md:px-0"
        role="tablist"
      >
        <div className="flex w-max gap-3">
          {portfolioCategories.map((category, index) => {
            const isSelected = selectedCategory === category;

            return (
              <button
                aria-controls="portfolio-projects-panel"
                aria-selected={isSelected}
                className={`shrink-0 rounded-full border px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main ${
                  isSelected
                    ? "border-ink bg-ink text-white"
                    : "border-line bg-white text-ink hover:border-ink"
                }`}
                id={`portfolio-tab-${index}`}
                key={category}
                onClick={() => setSelectedCategory(category)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                role="tab"
                tabIndex={isSelected ? 0 : -1}
                type="button"
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <div
        aria-labelledby={selectedTabId}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        id="portfolio-projects-panel"
        role="tabpanel"
        tabIndex={0}
      >
        {filteredProjects.map((project) => (
          <Reveal key={project.title}>
            <article className="portfolio-card overflow-hidden rounded-[20px] border border-line bg-white">
              <div
                aria-hidden="true"
                className={`portfolio-card__art portfolio-card__art--${project.category === "브랜딩" ? "branding" : project.category === "웹 디자인" ? "web" : "dashboard"}`}
              >
                <span>{project.category}</span>
              </div>
              <div className="p-7">
                <p className="mb-3 text-sm font-semibold tracking-eyebrow text-main">
                  {project.category}
                </p>
                <h3 className="mb-3 text-2xl font-semibold tracking-[-0.04em] text-ink">
                  {project.title}
                </h3>
                <p className="text-base leading-7 text-sub">{project.desc}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </>
  );
}
