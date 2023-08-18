import { ThemeProvider } from "styled-components";
import { Container, GlobalStyles } from "./styles/global";
import { theme } from "./config/theme";
import { Header } from "./components/header";
import { useContextHook } from './context/hook';
import { MainEntry } from "./components/main-entry";

export const App = () => {

  const { state } = useContextHook();

  const currentTheme = (theme as any)[state.themeName];

  return (
    <ThemeProvider theme={currentTheme}>
      <>
        <GlobalStyles />
        <Header />
        <Container>
          <MainEntry />
        </Container>
      </>
    </ThemeProvider>
  )
}
