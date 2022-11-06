import { styled } from "baseui";
import { Notification, KIND } from "baseui/notification";

export default function ErrorMessage({ error }) {
  if (!error) return null;
  return (
    <Container>
      <Notification closeable kind={KIND.negative} autoHideDuration={2000}>
        {error}
      </Notification>
    </Container>
  );
}

const Container = styled("section", ({ $theme }) => ({
  position: "fixed",
  bottom: "16px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9,
  background: "transparent"
}));
