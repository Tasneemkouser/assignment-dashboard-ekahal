import AppRouter from "./AppRouter";
import "./styles.css";

import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import PageLayout from "./components/PageLayout";
import ErrorMessage from "./components/ErrorMessage";
import { useAuth } from "./providers/FirebaseAuthProvider";
const engine = new Styletron();

export default function App() {
  const { error } = useAuth();
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <PageLayout>
          <AppRouter />
          <ErrorMessage error={error} />
        </PageLayout>
      </BaseProvider>
    </StyletronProvider>
  );
}
