import { BrainCircuit, FlaskConical, Layers, Search, Workflow, type LucideIcon } from 'lucide-react';
import { useRef } from 'react';
import { Section } from '../../components/layout/Section.tsx';
import { ProjectLinks } from '../../components/ui/ProjectLinks.tsx';
import { sections } from '../../content/site.ts';
import { whatIDo, type DisciplineIcon } from '../../content/whatIDo.ts';
import { useInView } from '../../hooks/useInView.ts';
import { cx } from '../../lib/cx.ts';
import styles from './WhatIDo.module.css';

const ICONS: Record<DisciplineIcon, LucideIcon> = {
  workflow: Workflow,
  brain: BrainCircuit,
  flask: FlaskConical,
  search: Search,
  layers: Layers,
};

/**
 * "What I do", laid out as the path data takes — Data → Models → Products —
 * with each discipline placed at the stage where it works.
 */
export function WhatIDo() {
  const flowRef = useRef<HTMLDivElement>(null);
  const flowing = useInView(flowRef, { threshold: 0.2 });

  return (
    <Section config={sections.whatIDo}>
      <div ref={flowRef} className={cx(styles.flow, flowing && styles.flowing)}>
        {whatIDo.stages.map((stage) => {
          const disciplines = whatIDo.disciplines.filter((d) => d.stage === stage.id);
          return (
            <div key={stage.id} className={cx(styles.stage, styles[stage.id])}>
              <div className={styles.stageHead}>
                <span className={styles.node} aria-hidden="true" />
                <h3 className={styles.stageLabel}>{stage.label}</h3>
                <p className={styles.stageCaption}>{stage.caption}</p>
              </div>
              <ul role="list" className={styles.disciplines}>
                {disciplines.map((discipline) => {
                  const Icon = ICONS[discipline.icon];
                  return (
                    <li key={discipline.title} className={styles.discipline}>
                      <Icon className={styles.icon} aria-hidden="true" strokeWidth={1.6} />
                      <h4 className={styles.title}>{discipline.title}</h4>
                      <p className={styles.text}>{discipline.text}</p>
                      <ul className={styles.points}>
                        {discipline.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                      <ProjectLinks ids={discipline.proof} className={styles.proof} />
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
      <p className={styles.also}>{whatIDo.alsoCurious}</p>
    </Section>
  );
}
