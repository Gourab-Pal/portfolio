import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const DATA_FILE = new URL('../src/data/portfolio.json', import.meta.url);
const PAGE_PATHS = new Set(['/', '/summary', '/experience', '/skills', '/links']);
const MONTH_PATTERN = /^\d{4}-(0[1-9]|1[0-2])$/;
const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const IMAGE = { src: 'asset', alt: 'string' };
const LINK = { label: 'text', url: 'url' };

const SCHEMA = {
  site: {
    title: 'text', description: 'text',
    navigation: [{ label: 'text', path: 'text' }],
  },
  profile: {
    name: 'text', headline: 'text', currentCompany: 'string',
    location: 'text', email: 'text', phone: 'text',
    availability: { visible: 'boolean', text: 'text' },
    heroImage: { ...IMAGE, position: 'text' },
    resume: { label: 'text', url: 'asset' },
  },
  summary: { title: 'text', paragraphs: ['text'] },
  experiences: [{
    id: 'id', company: 'text', role: 'text', type: 'text',
    startDate: 'month', endDate: 'endMonth',
    description: ['text'], highlights: ['text'], tools: ['text'],
  }],
  projects: [{
    id: 'id', experienceId: 'id', title: 'text', subtitle: 'string',
    isDraft: 'boolean', cover: IMAGE, overview: 'text',
    responsibilities: ['text'], outcomes: ['text'], tools: ['text'],
    gallery: [IMAGE], links: [LINK],
  }],
  skillGroups: [{ id: 'id', title: 'text', items: ['text'] }],
  education: [{ id: 'id', qualification: 'text', institution: 'text', period: 'text' }],
  languages: ['text'],
  links: [{ id: 'id', ...LINK }],
};

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isWebUrl(value) {
  if (typeof value !== 'string') return false;
  try {
    const url = new URL(value);
    return (url.protocol === 'https:' || url.protocol === 'http:') && Boolean(url.hostname);
  } catch {
    return false;
  }
}

function isAsset(value) {
  return typeof value === 'string' && (
    value === '' || isWebUrl(value) ||
    (value.startsWith('/') && !value.startsWith('//') && !value.includes('\\'))
  );
}

const CHECKS = {
  text: [value => typeof value === 'string' && value.trim().length > 0, 'must be non-empty text'],
  string: [value => typeof value === 'string', 'must be text (an empty string is allowed)'],
  boolean: [value => typeof value === 'boolean', 'must be true or false, without quotes'],
  id: [value => typeof value === 'string' && ID_PATTERN.test(value), 'must use lowercase letters, numbers, and single hyphens'],
  month: [value => typeof value === 'string' && MONTH_PATTERN.test(value), 'must use YYYY-MM, for example 2026-02'],
  endMonth: [value => value === null || (typeof value === 'string' && MONTH_PATTERN.test(value)), 'must be null or a YYYY-MM date'],
  url: [isWebUrl, 'must be a complete http:// or https:// URL'],
  asset: [isAsset, 'must be an http(s) URL, a /path/from/public, or an empty string'],
};

export function validatePortfolio(data) {
  const errors = [];

  function check(value, schema, path) {
    if (Array.isArray(schema)) {
      if (!Array.isArray(value)) {
        errors.push(`${path}: must be an array; use [] when empty.`);
        return;
      }
      value.forEach((item, index) => check(item, schema[0], `${path}[${index}]`));
    } else if (isObject(schema)) {
      if (!isObject(value)) {
        errors.push(`${path}: must be an object containing its named fields.`);
        return;
      }
      for (const [key, fieldSchema] of Object.entries(schema)) {
        check(value[key], fieldSchema, `${path}.${key}`);
      }
    } else {
      const [test, message] = CHECKS[schema];
      if (!test(value)) errors.push(`${path}: ${message}.`);
    }
  }

  function unique(values, field, path) {
    if (!Array.isArray(values)) return;
    const seen = new Set();
    values.forEach((item, index) => {
      const value = item?.[field];
      if (typeof value !== 'string') return;
      if (seen.has(value)) errors.push(`${path}[${index}].${field}: duplicates another entry; choose a unique value.`);
      seen.add(value);
    });
  }

  check(data, SCHEMA, 'portfolio');
  if (!isObject(data)) return errors;

  for (const key of ['experiences', 'projects', 'skillGroups', 'education', 'links']) {
    unique(data[key], 'id', key);
  }
  unique(data.site?.navigation, 'path', 'site.navigation');

  if (Array.isArray(data.site?.navigation)) {
    data.site.navigation.forEach((item, index) => {
      if (item && !PAGE_PATHS.has(item.path)) errors.push(`site.navigation[${index}].path: does not match an existing page. Use /, /summary, /experience, /skills, or /links.`);
    });
  }

  const experiences = Array.isArray(data.experiences) ? data.experiences : [];
  const experienceIds = new Set(experiences.filter(isObject).map(item => item.id));
  experiences.forEach((item, index) => {
    if (!isObject(item)) return;
    if (typeof item.startDate === 'string' && typeof item.endDate === 'string' &&
        MONTH_PATTERN.test(item.startDate) && MONTH_PATTERN.test(item.endDate) && item.endDate < item.startDate) {
      errors.push(`experiences[${index}].endDate: cannot be earlier than startDate.`);
    }
  });

  if (Array.isArray(data.projects)) {
    data.projects.forEach((item, index) => {
      if (!isObject(item)) return;
      if (!experienceIds.has(item.experienceId)) errors.push(`projects[${index}].experienceId: must match an id in experiences.`);
      unique(item.gallery, 'src', `projects[${index}].gallery`);
      unique(item.links, 'url', `projects[${index}].links`);
      if (Array.isArray(item.gallery)) {
        item.gallery.forEach((image, imageIndex) => {
          if (isObject(image) && image.caption !== undefined) check(image.caption, 'string', `projects[${index}].gallery[${imageIndex}].caption`);
        });
      }
    });
  }

  const mobilePosition = data.profile?.heroImage?.mobilePosition;
  if (mobilePosition !== undefined) check(mobilePosition, 'text', 'profile.heroImage.mobilePosition');
  return errors;
}

async function main() {
  const file = process.argv[2] ? resolve(process.argv[2]) : DATA_FILE;
  let data;
  try {
    data = JSON.parse(await readFile(file, 'utf8'));
  } catch (error) {
    console.error('Cannot read portfolio JSON. Check the file path, double quotes, commas, and brackets.');
    console.error(error.message);
    process.exitCode = 1;
    return;
  }

  const errors = validatePortfolio(data);
  if (errors.length) {
    console.error(`Portfolio data needs ${errors.length} correction(s):`);
    errors.forEach(error => console.error(`- ${error}`));
    process.exitCode = 1;
    return;
  }
  console.log(`Portfolio data is valid: ${data.experiences.length} experiences, ${data.projects.length} projects, ${data.skillGroups.length} skill groups.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  await main();
}
