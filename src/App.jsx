import Hero from './components/Hero'
import Navbar from './components/Navbar'
import ProductViewer from './components/ProductViewer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Showcase from './components/Showcase';
import Performance from './components/Performance';
import Features from './components/Features';
import Hilights from './components/Hilights';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
   <main>

    <Navbar />
    <Hero />
    <ProductViewer />
    <Showcase />
    <Performance />
    <Features />
    <Hilights />
    <Footer />

   </main>
  )
}

export default App
