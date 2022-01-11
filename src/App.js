import "./App.css";
import Layout from "./components/layout/Layout";
import CoinsProvider from "./contexts/pagePortfolioContext";
import Portfolio from "./pages/Portfolio";

function App() {
  return (
    <div className="App">
      <CoinsProvider>
        <Layout>
          <Portfolio />
        </Layout>
      </CoinsProvider>
    </div>
  );
}

export default App;
