import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const htmlModules = import.meta.glob('../legacy/**/*.html', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const scriptModules = import.meta.glob('../legacy/**/*.inline.js', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

function moduleKey(section: string, page: string, ext: string) {
  return `../legacy/${section}/${page}.${ext}`;
}

function routeFromLegacyHref(href: string, section: string) {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('javascript:')) return null;
  const [path, query] = href.split('?');
  const normalized = path.replace(/^\.\//, '').replace(/^\.\.\//, '');
  let target: string | null = null;

  if (normalized === 'index.html' || normalized === '') target = '/';
  else if (normalized.startsWith('admin/')) target = `/admin/${normalized.slice(6).replace(/\.html$/, '')}`;
  else if (normalized.startsWith('user/')) target = `/candidate/${normalized.slice(5).replace(/\.html$/, '')}`;
  else if (section === 'admin') target = `/admin/${normalized.replace(/\.html$/, '')}`;
  else if (section === 'user') target = `/candidate/${normalized.replace(/\.html$/, '')}`;

  return target ? target + (query ? `?${query}` : '') : null;
}

async function loadScript(src: string) {
  const id = `legacy-${src.replace(/[^a-z0-9]/gi, '-')}`;
  if (document.getElementById(id)) return;
  await new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.id = id;
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });
}

export function LegacyPage({ section, page }: { section: string; page: string }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [ready, setReady] = useState(false);
  const html = useMemo(() => htmlModules[moduleKey(section, page, 'html')] ?? '', [section, page]);
  const inline = useMemo(() => scriptModules[moduleKey(section, page, 'inline.js')] ?? '', [section, page]);

  useEffect(() => {
    let cancelled = false;
    setReady(false);
    const mount = async () => {
      if (!html) { setReady(true); return; }
      // Common legacy runtime is retained only as a compatibility bridge while pages are refactored.
      for (const file of ['mock-data.js', 'api.js', 'components.js', 'notifications.js', 'app.js']) {
        await loadScript(`/legacy/js/${file}`);
      }
      if (cancelled) return;
      setReady(true);
      // The markup is already mounted when this effect runs; allow legacy page initializers to query it.
      if (inline.trim()) {
        try { new Function(inline)(); } catch (error) { console.error(`PrepPilot legacy initializer failed: ${section}/${page}`, error); }
      }
      document.dispatchEvent(new Event('DOMContentLoaded'));
    };
    mount().catch((error) => console.error(error));
    return () => { cancelled = true; };
  }, [html, inline, section, page]);

  useEffect(() => {
    const click = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest('a') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute('href') || '';
      const route = routeFromLegacyHref(href, section);
      if (!route) return;
      event.preventDefault();
      navigate(route);
    };
    document.addEventListener('click', click);
    return () => document.removeEventListener('click', click);
  }, [navigate, section]);

  useEffect(() => {
    // Keep document title useful while React owns routing.
    document.title = `PrepPilot — ${section === 'admin' ? 'Admin' : section === 'user' ? 'Candidate' : 'Enterprise Career Platform'}`;
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);

  if (!html) return <div className="react-route-loading">Page not found.</div>;

  return (
    <div className="legacy-react-page" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
