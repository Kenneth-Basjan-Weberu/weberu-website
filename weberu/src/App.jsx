import { Navbar, Hero, About, PinnedSection } from "./components";

function App() {
  return (
    <div className="container mx-auto">
      <Navbar/>
      <Hero/>
      <PinnedSection />
      <About />
    </div>
  );
}

export default App;
