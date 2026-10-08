import { Lightbulb, LightbulbOff } from 'lucide-react';
import { useState } from 'react';
import { Section } from '../../components/layout/Section.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { Develop } from '../../components/ui/Develop.tsx';
import { beyond } from '../../content/beyond.ts';
import { sections } from '../../content/site.ts';
import styles from './Beyond.module.css';
import { Extracurricular } from './Extracurricular.tsx';
import { Photography } from './Photography.tsx';
import { Sitcoms } from './Sitcoms.tsx';
import { Sports } from './Sports.tsx';

/**
 * Beyond academics. The whole section sits under a red safelight; the
 * switch (or hovering any picture) turns the white light on.
 */
export function Beyond() {
  const [lightsOn, setLightsOn] = useState(false);

  const lightSwitch = (
    <div className={styles.switchRow}>
      <Button
        variant="ghost"
        pressed={lightsOn}
        onClick={() => setLightsOn((on) => !on)}
        icon={lightsOn ? <LightbulbOff /> : <Lightbulb />}
      >
        {lightsOn ? 'Back to safelight' : 'Turn the lights on'}
      </Button>
      <p className={styles.switchNote}>Pictures here sit under a red safelight. Hover one, or switch the lights on, to see it in colour.</p>
    </div>
  );

  return (
    <Section config={sections.beyond} aside={lightSwitch}>
      <div data-lights={lightsOn ? 'on' : 'off'} className={styles.room}>
        <Develop>
          <dl className={styles.facts}>
            {beyond.facts.map((fact) => (
              <div key={fact.label} className={styles.fact}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Develop>

        <Sports />
        <Sitcoms />
        <Photography />
        <Extracurricular />
      </div>
    </Section>
  );
}
