import "./App.css";
import { Container } from "@mui/material";
import MainContent from "./components/MainContent";

function App() {
  return (
    <>
      <section
        style={{
          // width: "100vw",
          padding: "40px 10%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="xl">
          <MainContent />
        </Container>
      </section>
    </>
  );
}

export default App;
