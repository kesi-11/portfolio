import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Portfolio from '@/components/Portfolio';
import RateCard from '@/components/RateCard';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
return (
<main>
<Navigation />
<Hero />
<About />
<Portfolio />
<RateCard />
<Testimonials />
<Contact />
<Footer />
</main>
);
}