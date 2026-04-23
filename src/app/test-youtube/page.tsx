'use client';

import { useEffect, useState } from 'react';

interface TestResult {
  type: string;
  data: any;
}

export default function TestYouTube() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const runTests = async () => {
      const testResults: TestResult[] = [];
      
      // Test 1: Fetch from settings API
      try {
        const res = await fetch('/api/settings');
        const data = await res.json();
        testResults.push({ type: '1. /api/settings', data });
      } catch (error: any) {
        testResults.push({ type: 'API Error', data: error.message });
      }

      // Test 2: Check YouTube-specific API
      try {
        const res = await fetch('/api/check-youtube');
        const data = await res.json();
        testResults.push({ type: '2. /api/check-youtube (Direct DB)', data });
      } catch (error: any) {
        testResults.push({ type: 'Check YouTube API Error', data: error.message });
      }

      // Test 3: Check localStorage
      const stored = localStorage.getItem('richkid_settings');
      if (stored) {
        try {
          testResults.push({ type: '3. localStorage', data: JSON.parse(stored) });
        } catch (e: any) {
          testResults.push({ type: 'localStorage parse error', data: e.message });
        }
      } else {
        testResults.push({ type: '3. localStorage', data: 'No data found' });
      }

      setResults(testResults);
      setLoading(false);
    };

    runTests();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8">YouTube Integration Test</h1>
      
      {loading ? (
        <p>Running tests...</p>
      ) : (
        <div className="space-y-8">
          {results.map((result, index) => (
            <div key={index} className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold text-[#C9A84C] mb-4">{result.type}</h2>
              <pre className="text-sm text-gray-300 overflow-auto max-h-96">
                {JSON.stringify(result.data, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
        <h3 className="font-bold mb-2">How to use:</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>Go to /admin/settings and add a YouTube video</li>
          <li>Click "Save Changes"</li>
          <li>Check this page to see if data is saved</li>
          <li>Check the main page to see if videos appear</li>
          <li>Open browser console (F12) for detailed logs</li>
        </ol>
      </div>
    </div>
  );
}
