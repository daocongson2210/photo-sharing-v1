import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders TopBar with user name", () => {
  render(<App />);
  const nameElement = screen.getByText(/Đào Công Sơn/i);
  expect(nameElement).toBeInTheDocument();
});
