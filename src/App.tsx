import { useCallback, useEffect, useState, type ComponentType } from 'react';
import { ArtDefs } from './components/figures/SafelightArt.tsx';
import { IntroLoader } from './components/intro/IntroLoader.tsx';
import { BackToTop } from './components/layout/BackToTop.tsx';
import { Navbar } from './components/layout/Navbar.tsx';
import { intro } from './content/site.ts';
import type { SectionKey } from './content/site.ts';
import { prefersReducedMotion } from './hooks/usePrefersReducedMotion.ts';
import { navItems, visibleSections } from './lib/sections.ts';
import { readSession, writeSession } from './lib/storage.ts';
import { Achievements } from './sections/Achievements/Achievements.tsx';
import { Beyond } from './sections/Beyond/Beyond.tsx';
import { Certifications } from './sections/Certifications/Certifications.tsx';
import { Contact } from './sections/Contact/Contact.tsx';
import { Education } from './sections/Education/Education.tsx';
import { Experience } from './sections/Experience/Experience.tsx';
import { Hero } from './sections/Hero/Hero.tsx';
import { Proficiency } from './sections/Proficiency/Proficiency.tsx';
import { Projects } from './sections/Projects/Projects.tsx';
import { WhatIDo } from './sections/WhatIDo/WhatIDo.tsx';

/** Maps each section key in content/site.ts to its component. */
const SECTION_COMPONENTS: Record<SectionKey, ComponentType> = {
  whatIDo: WhatIDo,
  experience: Experience,
  proficiency: Proficiency,
  education: Education,
  projects: Projects,
  achievements: Achievements,
  certifications: Certifications,
  beyond: Beyond,
  contact: Contact,
};

const INTRO_SEEN_KEY = 'portfolio:intro-seen';

function shouldPlayIntro(): boolean {
  if (!intro.enabled || prefersReducedMotion()) return false;
  return !(intro.oncePerSession && readSession(INTRO_SEEN_KEY));
}

export default function App() {
  const [playIntro] = useState(shouldPlayIntro);
  const [introMounted, setIntroMounted] = useState(playIntro);
  const [ready, setReady] = useState(!playIntro);

  // Keep the page still while the intro plays.
  useEffect(() => {
    if (playIntro) document.body.classList.add('is-locked');
  }, [playIntro]);

  const reveal = useCallback(() => {
    document.body.classList.remove('is-locked');
    writeSession(INTRO_SEEN_KEY, '1');
    setReady(true);
  }, []);

  const removeIntro = useCallback(() => setIntroMounted(false), []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ArtDefs />

      {introMounted && (
        <IntroLoader word={intro.word} durationMs={intro.durationMs} onReveal={reveal} onDone={removeIntro} />
      )}

      <div id="top" inert={!ready}>
        <Navbar items={navItems()} />
        <main id="main">
          <Hero ready={ready} />
          {visibleSections().map((key) => {
            const SectionComponent = SECTION_COMPONENTS[key];
            return <SectionComponent key={key} />;
          })}
        </main>
        <BackToTop />
      </div>
    </>
  );
}
