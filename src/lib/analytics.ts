// Analytics Tracker Utility

export interface AnalyticsMetric {
  totalVisitors: number;
  uniqueVisitors: number;
  liveVisitors: number;
  bounceRate: number;
  devices: { desktop: number; mobile: number; tablet: number };
  browsers: { chrome: number; safari: number; firefox: number; edge: number; other: number };
  recentLogs: Array<{ id: string; page: string; timestamp: string; device: string; browser: string }>;
}

const STORAGE_KEY = 'portfolio_analytics_data';

export const getAnalyticsData = (): AnalyticsMetric => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}

  return {
    totalVisitors: 1420,
    uniqueVisitors: 980,
    liveVisitors: 3,
    bounceRate: 24.5,
    devices: { desktop: 68, mobile: 28, tablet: 4 },
    browsers: { chrome: 62, safari: 20, firefox: 12, edge: 4, other: 2 },
    recentLogs: [
      { id: '1', page: '/#hero', timestamp: '2 mins ago', device: 'Desktop', browser: 'Chrome' },
      { id: '2', page: '/#projects', timestamp: '5 mins ago', device: 'Mobile', browser: 'Safari' },
      { id: '3', page: '/#skills', timestamp: '12 mins ago', device: 'Desktop', browser: 'Firefox' },
    ],
  };
};

export const logPageView = (page: string) => {
  const data = getAnalyticsData();
  data.totalVisitors += 1;
  data.recentLogs.unshift({
    id: Date.now().toString(),
    page,
    timestamp: 'Just now',
    device: window.innerWidth < 768 ? 'Mobile' : 'Desktop',
    browser: navigator.userAgent.includes('Chrome')
      ? 'Chrome'
      : navigator.userAgent.includes('Safari')
      ? 'Safari'
      : 'Browser',
  });
  if (data.recentLogs.length > 20) data.recentLogs.pop();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
};
