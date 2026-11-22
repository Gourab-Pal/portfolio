// Bootstrap Icons: https://icons.getbootstrap.com/
// The pinned icon stylesheet is loaded once in index.html.
const ICON_NAMES = {
  home: 'person',
  summary: 'briefcase',
  experience: 'file-earmark-text',
  skills: 'lightning-charge',
  links: 'link-45deg',
  email: 'envelope',
  phone: 'telephone',
  linkedin: 'linkedin',
  location: 'geo-alt',
  status: 'circle-fill',
};

export default function Icon({ name, className = '' }) {
  const icon = ICON_NAMES[name];
  if (!icon) return null;
  return <i className={`bi bi-${icon} ui-icon ${className}`} aria-hidden="true" />;
}
