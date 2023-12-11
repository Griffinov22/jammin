import Header from "../Header";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("header component", () => {
  it("renders header", () => {
    render(<Header />);
    const headerText = screen.getByTestId("header");
    expect(headerText).toHaveTextContent("Jammin'");
  });
});
