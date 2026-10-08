import type { CSSProperties } from 'react';
import { CourtArt, PitchArt } from '../../components/figures/SafelightArt.tsx';
import { DarkroomImage } from '../../components/ui/DarkroomImage.tsx';
import { Develop } from '../../components/ui/Develop.tsx';
import { beyond } from '../../content/beyond.ts';
import { cx } from '../../lib/cx.ts';
import { toSafelight } from '../../lib/safelight.ts';
import styles from './Sports.module.css';
import blockStyles from './Beyond.module.css';
import { BlockHead } from './BlockHead.tsx';

/** Hard-edged stripes, like a supporter's scarf. */
function stripes(colors: string[]): string {
  const step = 100 / colors.length;
  const stops = colors.flatMap((c, i) => [`${c} ${i * step}%`, `${c} ${(i + 1) * step}%`]);
  return `linear-gradient(90deg, ${stops.join(', ')})`;
}

/** Football and basketball, as match tickets. */
export function Sports() {
  return (
    <section className={blockStyles.block} aria-labelledby="beyond-sports">
      <BlockHead
        id="beyond-sports"
        title="Football and basketball"
        note="Real Madrid and Argentina on the pitch, Golden State Warriors on the court."
      />
      <ul role="list" className={styles.tickets}>
        {beyond.sports.map((team, index) => (
          <Develop as="li" key={team.id} delay={index * 90} className={styles.slot}>
            <article
              className={cx(styles.ticket, 'lights-scope')}
              style={
                {
                  '--scarf-night': stripes(team.colors.map(toSafelight)),
                  '--scarf-day': stripes(team.colors),
                } as CSSProperties
              }
            >
              <span className={styles.scarf} aria-hidden="true" />
              <DarkroomImage
                src={team.image}
                alt={team.imageAlt ?? team.team}
                fallback={team.sport === 'Football' ? <PitchArt /> : <CourtArt />}
                className={styles.art}
              />
              <div className={styles.body}>
                <p className={styles.relation}>
                  {team.sport}, {team.relation.charAt(0).toLowerCase() + team.relation.slice(1)}
                </p>
                <h4 className={styles.team}>{team.team}</h4>
                <p className={styles.nickname}>{team.nickname}</p>
              </div>
              <div className={styles.stub}>
                <span>{team.home}</span>
                <span className={styles.admit}>Admit one</span>
              </div>
            </article>
          </Develop>
        ))}
      </ul>
    </section>
  );
}
