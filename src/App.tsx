import NavBar from "./components/Layout/NavBar";
import TicketsPage from "./pages/TicketsPage/TicketsPage";
import PageLayout from "./components/Layout/PageLayout";
import { ThemeProvider } from "./context/ThemeProvider";

function App() {
  return (
    <ThemeProvider
      // Force color mode to simplify this example.
      enableSystem={false}
      defaultTheme="dark"
    >
      <NavBar />
      <PageLayout>
        <TicketsPage />
      </PageLayout>
    </ThemeProvider>
  );
}

export default App;
