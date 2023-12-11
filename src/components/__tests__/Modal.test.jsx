import Modal from "../Modal";
import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("modal component", () => {
  //not all props are passed to this component
  const mockPlayListTitles = ["PlayList 1", "PlayList 2", "PlayList 3"];

  const mockUser = {
    playlists: [
      {
        name: "PlayList 1",
        external_urls: { spotify: "https://1" },
      },
      {
        name: "PlayList 2",
        external_urls: { spotify: "https://2" },
      },
      {
        name: "PlayList 3",
        external_urls: { spotify: "https://3" },
      },
    ],
  };

  it("renders modal component", () => {
    render(
      <Modal
        playListTitles={mockPlayListTitles}
        showDeleteModal={true}
        user={mockUser}
      />
    );
    const modal = screen.getByTestId("delete modal");
    expect(modal).toBeTruthy();
  });

  it("renders correct number of playlists to delete", () => {
    render(
      <Modal
        playListTitles={mockPlayListTitles}
        showDeleteModal={true}
        user={mockUser}
      />
    );
    const header = screen.getByTestId("modal header");
    const headerText = header.innerHTML;
    expect(headerText).toContain(3);
  });

  it("checks that windows open if button clicked", () => {
    window.open = vi.fn();
    const windowSpy = vi.spyOn(window, "open");
    render(
      <Modal
        playListTitles={mockPlayListTitles}
        showDeleteModal={true}
        user={mockUser}
        setShowDeleteModal={(booly) => booly}
        setHasCreated={(booly) => booly}
      />
    );

    const cboxes = screen.queryAllByTestId("modal checkboxes");
    expect(cboxes.length).toBe(3);

    act(() => {
      screen.queryAllByTestId("modal checkboxes").forEach((el) => el.click());
    });
    const submitBtn = screen.getByTestId("modal submit");
    submitBtn.click();

    expect(windowSpy).toBeCalledTimes(3);
  });
});
