import { screen, render } from "@testing-library/react";
import EditManga from "./editManga";
import Form from "../form/form";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { MemoryRouter as Router } from "react-router-dom";
import { Manga } from "../../models/manga";
import { UserStructure } from "../../models/user";
import { mangaReducer } from "../../reducers/manga.slice";
import { userReducer } from "../../reducers/slice";
import { configureStore } from "@reduxjs/toolkit";
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => jest.fn().mockImplementation(() => ({})),
}));
describe("Given the ", () => {
  const storeMock = configureStore({
    reducer: { mangas: mangaReducer, users: userReducer },
    preloadedState: {
      users: {
        loggedUser: {} as UserStructure,
        userLogged: {
          email: "asdadasd",
          passwd: "asdasdad",
          role: "admin",
          token: "asdadasd",
        },
        token: "",
        users: [],
      },
      mangas: {
        mangas: [
          {
            author: "kentaro",
            category: "seinen",
            description: "berserk desc",
            firstChap: ["first chap"],
            id: "1",
            image: "image",
            name: "Berserk",
            price: 14,
          },
        ],
        manga: {} as Manga,
        mangaId: "1",
      },
    },
  });
  test("Then it should ", () => {
    render(
      <Provider store={storeMock}>
        <Router>
          <EditManga>
            <Form prop={false}></Form>
          </EditManga>
        </Router>
      </Provider>
    );

    const page = screen.getByText("EditManga");
    expect(page).toBeInTheDocument();
  });
});