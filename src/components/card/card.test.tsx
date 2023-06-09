import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router";
import { Card } from "./card";
describe("Given the ", () => {
  const mockManga = {
    author: "kentaro",
    category: "seinen",
    description: "berserk desc",
    firstChap: ["first chap"],
    id: "1",
    image: "image",
    name: "Berserk",
    price: 14,
  };

  render(
    <Router>
      <Card manga={mockManga}></Card>
    </Router>
  );
  describe("When ", () => {
    test("Then it should ", async () => {
      screen.getByText("Berserk");
    });
  });
});
