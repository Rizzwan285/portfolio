import { Section } from '../../components/layout/Section.tsx';
import { CountUp } from '../../components/ui/CountUp.tsx';
import { Develop } from '../../components/ui/Develop.tsx';
import { TextLink } from '../../components/ui/TextLink.tsx';
import { achievements } from '../../content/achievements.ts';
import { sections } from '../../content/site.ts';
import { cx } from '../../lib/cx.ts';
import styles from './Achievements.module.css';

const isNumeric = (value: string) => /^\d/.test(value);

/** Achievements as a results board: the result first, then the event. */
export function Achievements() {
  return (
    <Section config={sections.achievements}>
      <ol role="list" className={styles.board}>
        {achievements.map((item, index) => (
          <Develop as="li" key={`${item.event}-${item.result}`} className={styles.row} delay={index * 70}>
            <p className={cx(styles.result, !isNumeric(item.result) && styles.word)}>
              {item.resultPrefix && (
                <span className={cx(styles.prefix, item.resultPrefix.length === 1 && styles.symbol)}>
                  {item.resultPrefix}
                </span>
              )}
              <CountUp value={item.result} className={styles.value} />
            </p>
            <div className={styles.text}>
              <h3 className={styles.event}>{item.event}</h3>
              <p className={styles.detail}>{item.detail}</p>
              {item.link && <TextLink href={item.link.href}>{item.link.label}</TextLink>}
            </div>
          </Develop>
        ))}
      </ol>
    </Section>
  );
}
