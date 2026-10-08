import { Fragment, useState, type CSSProperties, type MouseEvent } from 'react';
import { Section } from '../../components/layout/Section.tsx';
import { Develop } from '../../components/ui/Develop.tsx';
import { TagList } from '../../components/ui/TagList.tsx';
import { sections } from '../../content/site.ts';
import { toolkit, type TechName } from '../../content/tech.ts';
import { cx } from '../../lib/cx.ts';
import { buildProficiencyMatrix, coreStack } from '../../lib/proficiency.ts';
import { scrollToHash } from '../../lib/scroll.ts';
import styles from './Proficiency.module.css';

type Focus = { kind: 'row'; name: TechName } | { kind: 'column'; index: number } | null;

// The content is static, so the matrix is computed once when the module loads.
const matrix = buildProficiencyMatrix();
const core = coreStack(matrix, 6);

function listOf(items: string[]): string {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

/**
 * Proficiency as a darkroom "test strip": one strip per technology, one
 * frame per project or role (oldest on the left). A frame is exposed when
 * that technology was used there. Counts come straight from the content.
 */
export function Proficiency() {
  const [focus, setFocus] = useState<Focus>(null);
  const columnCount = matrix.columns.length;

  const caption = (() => {
    if (focus?.kind === 'row') {
      const row = matrix.rows.find((r) => r.name === focus.name);
      if (!row) return null;
      const where = matrix.columns.filter((_, i) => row.uses[i]).map((c) => c.label);
      return (
        <>
          <strong>{row.name}</strong> appears in {row.count} of {columnCount}: {listOf(where)}.
        </>
      );
    }
    if (focus?.kind === 'column') {
      const column = matrix.columns[focus.index];
      return (
        <>
          <strong>{column.title}</strong> was built with {listOf([...column.stack])}.
        </>
      );
    }
    return <>Point at a row or a column to trace it. Columns run from the oldest project on the left to the newest.</>;
  })();

  const isLit = (rowName: TechName, columnIndex: number) => {
    if (!focus) return false;
    return focus.kind === 'row' ? focus.name === rowName : focus.index === columnIndex;
  };

  const onColumnLink = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToHash(event.currentTarget.getAttribute('href') ?? '#projects');
  };

  return (
    <Section config={sections.proficiency}>
      <div className={styles.layout}>
        <Develop className={styles.stripCard}>
          <div className={styles.scroller} role="region" aria-label="Technology matrix" tabIndex={0}>
            <table
              className={cx(styles.matrix, focus && styles.focusing)}
              style={{ '--cols': columnCount } as CSSProperties}
              onMouseLeave={() => setFocus(null)}
            >
              <caption className="visually-hidden">
                Which technologies were used in each project and role, from oldest to newest.
              </caption>
              <thead>
                <tr>
                  <td className={styles.corner} />
                  {matrix.columns.map((column, index) => (
                    <th
                      key={column.id}
                      scope="col"
                      className={cx(styles.colHead, focus?.kind === 'column' && focus.index === index && styles.lit)}
                    >
                      <a
                        href={column.href}
                        onClick={onColumnLink}
                        onMouseEnter={() => setFocus({ kind: 'column', index })}
                        onFocus={() => setFocus({ kind: 'column', index })}
                        title={column.title}
                      >
                        <span>{column.label}</span>
                      </a>
                    </th>
                  ))}
                  <th scope="col" className={styles.countHead}>
                    <span className="visually-hidden">Number of uses</span>
                  </th>
                </tr>
              </thead>

              {matrix.groups.map((group) => (
                <tbody key={group.category}>
                  <tr className={styles.groupRow}>
                    <th scope="rowgroup" colSpan={columnCount + 2}>
                      {group.label}
                    </th>
                  </tr>
                  {group.rows.map((row) => {
                    const rowActive = focus?.kind === 'row' && focus.name === row.name;
                    return (
                      <tr key={row.name} className={cx(styles.row, rowActive && styles.rowActive)}>
                        <th scope="row" className={styles.rowHead}>
                          <button
                            type="button"
                            onMouseEnter={() => setFocus({ kind: 'row', name: row.name })}
                            onFocus={() => setFocus({ kind: 'row', name: row.name })}
                            onClick={() => setFocus({ kind: 'row', name: row.name })}
                          >
                            {row.name}
                          </button>
                        </th>
                        {row.uses.map((used, index) => (
                          <td
                            key={matrix.columns[index].id}
                            className={cx(styles.cell, used && styles.used, isLit(row.name, index) && styles.lit)}
                            onMouseEnter={() => setFocus({ kind: 'row', name: row.name })}
                          >
                            <span className={styles.frame} aria-hidden="true" />
                            <span className="visually-hidden">{used ? 'Used' : 'Not used'}</span>
                          </td>
                        ))}
                        <td className={styles.count}>{row.count}</td>
                      </tr>
                    );
                  })}
                </tbody>
              ))}
            </table>
          </div>
          <p className={styles.caption} aria-live="polite">
            {caption}
          </p>
        </Develop>

        <div className={styles.side}>
          <Develop className={styles.block}>
            <h3 className={styles.blockTitle}>Most used</h3>
            <p className={styles.blockNote}>How many of the {matrix.columns.length} projects and roles used each one.</p>
            <ol role="list" className={styles.core}>
              {core.map((row) => (
                <li key={row.name}>
                  <span className={styles.coreCount}>{row.count}</span>
                  <span className={styles.coreName}>{row.name}</span>
                </li>
              ))}
            </ol>
          </Develop>

          <Develop className={styles.block} delay={80}>
            <h3 className={styles.blockTitle}>Also in the toolkit</h3>
            <dl className={styles.toolkit}>
              {toolkit.map((group) => (
                <Fragment key={group.group}>
                  <dt>{group.group}</dt>
                  <dd>
                    <TagList items={group.items} label={group.group} />
                  </dd>
                </Fragment>
              ))}
            </dl>
          </Develop>
        </div>
      </div>
    </Section>
  );
}
