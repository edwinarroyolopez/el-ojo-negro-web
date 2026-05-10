'use client';

import styled from 'styled-components';
import type { DiagnosisSlideSectionKey, ProspectDiagnosis } from '../types';
import {
  deriveMinimumSystem,
  deriveOpportunityList,
  derivePositiveSignals,
  deriveQuickWin,
  parseMarkdown,
} from '../utils';

const Shell = styled.section`
  display: grid;
  gap: 1rem;

  @media (min-width: 1120px) {
    grid-template-columns: minmax(260px, 0.62fr) minmax(0, 1fr);
    align-items: start;
  }
`;

const Index = styled.aside`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 1.25rem;
  background: rgba(255,255,255,0.03);

  @media (min-width: 1120px) {
    position: sticky;
    top: 92px;
  }
`;

const IndexTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontSerif};
  font-size: 2rem;
  line-height: 0.96;
`;

const IndexLead = styled.p`
  margin: 0.85rem 0 0;
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.7;
`;

const IndexList = styled.div`
  display: grid;
  gap: 0.65rem;
  margin-top: 1rem;
`;

const IndexItem = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  padding-top: 0.75rem;
  border-top: ${({ theme }) => theme.borders.subtle};
  color: ${({ theme }) => theme.colors.textMuted};

  b {
    color: ${({ theme }) => theme.colors.accent};
    font-family: ${({ theme }) => theme.typography.fontSerif};
    font-size: 1.1rem;
    min-width: 2rem;
  }
`;

const Chapters = styled.div`
  display: grid;
  gap: 0.9rem;
`;

const Chapter = styled.article`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: clamp(1.2rem, 4vw, 2rem);
  background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
  display: grid;
  grid-template-columns: 58px minmax(0, 1fr);
  gap: 1rem;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const Number = styled.div`
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  border: ${({ theme }) => theme.borders.emphasized};
  color: ${({ theme }) => theme.colors.accent};
  font-family: ${({ theme }) => theme.typography.fontSerif};
  font-size: 1.2rem;
`;

const ChapterTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontSerif};
  font-size: clamp(1.8rem, 3vw, 3rem);
  line-height: 0.96;
`;

const ChapterBody = styled.div`
  display: grid;
  gap: 0.75rem;
  margin-top: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.75;

  p {
    margin: 0;
  }

  ul {
    margin: 0;
    padding-left: 1.1rem;
  }
`;

type StorylineProspect = {
  name: string;
  website?: string;
  instagram?: string;
  category?: string;
  city?: string;
};

type StoryChapter = {
  key: DiagnosisSlideSectionKey;
  title: string;
  body: string[];
};

function toParagraphs(value: unknown) {
  if (typeof value === 'string' && value.trim()) {
    return value
      .split(/\n{2,}/)
      .map((entry) => entry.trim())
      .filter(Boolean);
  }

  if (Array.isArray(value)) {
    return value
      .map((entry) => {
        if (typeof entry === 'string') return entry.trim();
        if (entry && typeof entry === 'object' && 'text' in entry && typeof entry.text === 'string') {
          return entry.text.trim();
        }
        return '';
      })
      .filter(Boolean);
  }

  return [] as string[];
}

function getStructuredSection(
  diagnosis: ProspectDiagnosis | undefined,
  key: DiagnosisSlideSectionKey,
) {
  const sections = diagnosis?.structured?.sections;

  if (Array.isArray(sections)) {
    const match = sections.find(
      (section) =>
        section &&
        typeof section === 'object' &&
        'key' in section &&
        section.key === key,
    ) as Record<string, unknown> | undefined;

    if (!match) return [] as string[];
    return toParagraphs(match.body ?? match.content ?? match.text ?? match.summary);
  }

  if (sections && typeof sections === 'object' && !Array.isArray(sections)) {
    return toParagraphs((sections as Record<string, unknown>)[key]);
  }

  return [] as string[];
}

function getMarkdownFallback(diagnosis?: ProspectDiagnosis) {
  const blocks = parseMarkdown(diagnosis?.markdown);
  return blocks
    .filter((block) => block.type === 'p')
    .map((block) => block.text.trim())
    .filter(Boolean);
}

function buildChapters(prospect: StorylineProspect, diagnosis?: ProspectDiagnosis): StoryChapter[] {
  const markdownParagraphs = getMarkdownFallback(diagnosis);
  const strengthsFallback = derivePositiveSignals(prospect);
  const opportunitiesFallback = deriveOpportunityList(diagnosis ?? {}, prospect.name);
  const nextStepFallback = [diagnosis?.publicNotes, deriveQuickWin(diagnosis ?? {}), deriveMinimumSystem(diagnosis ?? {})]
    .filter((value): value is string => Boolean(value?.trim()));

  const chapters: StoryChapter[] = [
    {
      key: 'executiveReading',
      title: 'Lectura ejecutiva',
      body: getStructuredSection(diagnosis, 'executiveReading'),
    },
    {
      key: 'strengths',
      title: 'Lo que ya esta bien',
      body: getStructuredSection(diagnosis, 'strengths'),
    },
    {
      key: 'opportunities',
      title: 'Oportunidades principales',
      body: getStructuredSection(diagnosis, 'opportunities'),
    },
    {
      key: 'nextStep',
      title: 'Siguiente paso recomendado',
      body: getStructuredSection(diagnosis, 'nextStep'),
    },
  ];

  return chapters.map((chapter) => {
    if (chapter.body.length) return chapter;

    if (chapter.key === 'executiveReading') {
      return {
        ...chapter,
        body: [diagnosis?.summary, ...markdownParagraphs].filter((value): value is string => Boolean(value?.trim())).slice(0, 3),
      };
    }

    if (chapter.key === 'strengths') {
      return { ...chapter, body: strengthsFallback };
    }

    if (chapter.key === 'opportunities') {
      return { ...chapter, body: opportunitiesFallback };
    }

    return { ...chapter, body: nextStepFallback.slice(0, 3) };
  });
}

export function DiagnosisStoryline({
  prospect,
  diagnosis,
}: {
  prospect: StorylineProspect;
  diagnosis?: ProspectDiagnosis;
}) {
  const chapters = buildChapters(prospect, diagnosis).filter((chapter) => chapter.body.length > 0);

  if (!chapters.length) {
    return null;
  }

  return (
    <Shell>
      <Index>
        <IndexTitle>Narrativa ordenada</IndexTitle>
        <IndexLead>
          El diagnostico se presenta en capitulos conectados al deck publico, sin exponer notas internas.
        </IndexLead>
        <IndexList>
          {chapters.map((chapter, index) => (
            <IndexItem key={chapter.key}>
              <b>{`0${index + 1}`.slice(-2)}</b>
              <span>{chapter.title}</span>
            </IndexItem>
          ))}
        </IndexList>
      </Index>

      <Chapters>
        {chapters.map((chapter, index) => (
          <Chapter key={chapter.key}>
            <Number>{`0${index + 1}`.slice(-2)}</Number>
            <div>
              <ChapterTitle>{chapter.title}</ChapterTitle>
              <ChapterBody>
                {chapter.body.length > 1 ? (
                  <ul>
                    {chapter.body.map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
                ) : (
                  chapter.body.map((entry) => <p key={entry}>{entry}</p>)
                )}
              </ChapterBody>
            </div>
          </Chapter>
        ))}
      </Chapters>
    </Shell>
  );
}
