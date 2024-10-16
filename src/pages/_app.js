
import "@/styles/base.css"
import 'ol/ol.css';

import '@/styles/index.css'
import '@/styles/candidate.css'

import '@/styles/footer.css'
import "@/styles/header.css"
import '@/styles/nav.css'

import '@/styles/components/district-map.css'
import '@/styles/components/candidate-search.css'
import '@/styles/components/election-coverage.css'
import '@/styles/components/race-candidates.css'
import '@/styles/components/state-races.css'
import '@/styles/components/candidate-links.css'
import '@/styles/components/candidate-opponents.css'
import '@/styles/components/candidate-page-summary.css'
import '@/styles/components/election-coverage.css'
import '@/styles/components/race-results.css'
import '@/styles/components/judge-list.css'

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
}