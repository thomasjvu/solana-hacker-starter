import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import GlobalStyles from './globalStyles';
import { WalletConnectionProvider } from './components/wallet/WalletConnect';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Tokenomics from './components/sections/Tokenomics';
import Roadmap from './components/sections/Roadmap';
import Whitepaper from './components/sections/Whitepaper';
import Team from './components/sections/Team';
import Footer from './components/layout/Footer';

function App() {
  return (
    <WalletConnectionProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Tokenomics />
          <Roadmap />
          <Whitepaper />
          <Team />
        </main>
        <Footer />
      </ThemeProvider>
    </WalletConnectionProvider>
  );
}

export default App;
