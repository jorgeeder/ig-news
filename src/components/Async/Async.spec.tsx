import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { Async } from ".";

it("renders correctly", async () => {
  render(<Async/>)

  expect(screen.getByText("Hello World")).toBeInTheDocument()

  await waitForElementToBeRemoved(screen.queryByText("Button"))

  // await waitFor(() => {
  //   expect(screen.getByText("Button")).toBeInTheDocument()
  // })

  // await waitFor(() => {
  //   expect(screen.queryByText("Button")).not.toBeInTheDocument()
  // })
})