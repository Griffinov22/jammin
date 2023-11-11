import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ResultsSection from "./components/ResultsSection";
import PlayListSection from "./components/PlayListSection";

import { Container } from "@mui/material";
import { Grid } from "@mui/material";

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="md">
        <SearchBar />
        <Grid container spacing={2} mt={4}>
          <ResultsSection />
          <PlayListSection />
        </Grid>
      </Container>
    </>
  );
}

export default App;
