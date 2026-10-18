import { Navigate, Route, Routes } from 'react-router';
import { LegacyPage } from '../components/LegacyPage';
import { ScalableUsersPage } from '../components/ScalableUsersPage';
import { LoginPage } from '../components/LoginPage';

const adminPages = [
  'dashboard','users','user-detail','roles','categories','category-editor','technologies','technology-editor',
  'topics','topic-editor','subtopics','content','content-editor','questions','question-editor','mcqs','mcq-editor',
  'coding-problems','coding-editor','learning-paths','learning-path-editor','jobs','job-sources','applications',
  'automation','analytics','reports','audit-logs','settings',
];

const candidatePages = [
  'dashboard','learn','topic','practice','flashcards','interview','interview-result','resume','resume-builder',
  'jobs','job-detail','automation','applications','application-detail','application-review','notifications',
  'profile','salary-negotiator','system-design','settings',
];

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<LegacyPage section="home" page="page" />} />

      <Route path="/admin">
        <Route index element={<Navigate to="dashboard" replace />} />
        {adminPages.map((page) => (
          <Route
            key={page}
            path={page}
            element={page === 'users' ? <ScalableUsersPage /> : <LegacyPage section="admin" page={page} />}
          />
        ))}
      </Route>

      <Route path="/candidate">
        <Route index element={<Navigate to="dashboard" replace />} />
        {candidatePages.map((page) => (
          <Route key={page} path={page} element={<LegacyPage section="user" page={page} />} />
        ))}
      </Route>

      <Route path="/error/:code" element={<LegacyPage section="error" page="404" />} />
      <Route path="*" element={<LegacyPage section="error" page="404" />} />
    </Routes>
  );
}
