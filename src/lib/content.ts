import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type {
  ConferenceData,
  SpeakersDataFile,
  PartnersData,
  PolicyData,
} from '@/types/content';

const contentDir = path.join(process.cwd(), 'content');

export function readMarkdownFile(relativePath: string) {
  const fullPath = path.join(contentDir, relativePath);
  const raw = fs.readFileSync(fullPath, 'utf-8');
  const { data, content } = matter(raw);
  return { frontmatter: data, body: content };
}

export function getConferenceData(): ConferenceData {
  return readMarkdownFile('conf/vinnytsiajs-2022-conference.md').frontmatter as ConferenceData;
}

export function getSpeakersData(): SpeakersDataFile {
  return readMarkdownFile('conf/speakersdata/speakers-2022.md').frontmatter as SpeakersDataFile;
}

export function getPartnersData(): PartnersData {
  return readMarkdownFile('conf/partnersdata/partners-2022.md').frontmatter as PartnersData;
}

export function getPolicyData(): { frontmatter: PolicyData; body: string } {
  const { frontmatter, body } = readMarkdownFile('policy/policy.md');
  return { frontmatter: frontmatter as PolicyData, body };
}

export function getNavData() {
  return getConferenceData().nav;
}
