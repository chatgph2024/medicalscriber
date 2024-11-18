import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { RecordingView } from './components/RecordingView';
import { AccountView } from './components/AccountView';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<RecordingView />} />
          <Route path="/record" element={<RecordingView />} />
          <Route path="/scribes" element={<div>My Scribes</div>} />
          <Route path="/templates" element={<div>AI Templates</div>} />
          <Route path="/account" element={<AccountView />} />
        </Routes>
      </Layout>
    </Router>
  );
}