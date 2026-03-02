import { render, screen } from "@testing-library/react";
import App from "./App";

// Smoke test: Contact section "Get In Touch" heading is present when App renders.
test("renders contact heading", () => {
  render(<App />);
  const headingElement = screen.getByRole("heading", { name: /get in touch/i });
  expect(headingElement).toBeInTheDocument();
});
