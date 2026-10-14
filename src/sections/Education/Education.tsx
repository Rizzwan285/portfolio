import { Section } from '../../components/layout/Section.tsx';
import { CountUp } from '../../components/ui/CountUp.tsx';
import { Develop } from '../../components/ui/Develop.tsx';
import { TagList } from '../../components/ui/TagList.tsx';
import { education } from '../../content/education.ts';
import { sections } from '../../content/site.ts';
import { cx } from '../../lib/cx.ts';
import styles from './Education.module.css';

export function Education() {
  return (
    <Section config={sections.education}>
      <ol role="list" className={styles.list}>
        {education.map((item, index) => (
          <Develop as="li" key={item.id} className={cx(styles.item, item.coursework && styles.feature)} delay={index * 80}>
            <p className={styles.years}>{item.years}</p>

            <div className={styles.main}>
              <h3 className={styles.qualification}>
                {item.qualification}
                {item.status && <span className={styles.status}>{item.status}</span>}
              </h3>
              <p className={styles.institution}>
                {item.institution}
                {item.place && `, ${item.place}`}
              </p>

              {item.coursework && (
                <div className={styles.coursework}>
                  <h4 className={styles.courseworkTitle}>Relevant coursework</h4>
                  <div className={styles.groups}>
                    {item.coursework.map((group) => (
                      <div key={group.group} className={styles.group}>
                        <p className={styles.groupName}>{group.group}</p>
                        <TagList items={group.courses} label={group.group} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {item.score && (
              <p className={styles.score}>
                <CountUp value={item.score} className={styles.scoreValue} />
                <span className={styles.scoreLabel}>Score</span>
              </p>
            )}
          </Develop>
        ))}
      </ol>
    </Section>
  );
}
