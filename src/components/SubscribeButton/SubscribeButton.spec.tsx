import { render, screen, fireEvent } from "@testing-library/react"
import { signIn, useSession } from "next-auth/react"
import { SubscribeButton } from "."
import { useRouter } from "next/router"

jest.mock("next-auth/react")
jest.mock("next/router")

describe("SubscribeButton component", () => {
  it("renders correctly", () => {
    const useSessionMocked = jest.mocked(useSession)
    
    useSessionMocked.mockReturnValueOnce([null, false] as any)
    
    render(<SubscribeButton />)     

    expect(screen.getByText("Subscribe now")).toBeInTheDocument()
  })

  it("redirect user to sign in when not authenticated", () => {
    const singInMocked = jest.mocked(signIn)

    const useSessionMocked = jest.mocked(useSession)
    
    useSessionMocked.mockReturnValueOnce([null, false] as any)

    render(<SubscribeButton/>)

    const subscribeButton = screen.getByText("Subscribe now")

    fireEvent.click(subscribeButton)

    expect(singInMocked).toHaveBeenCalled()
  })

  it ("redirects to posts when user alredy has a subscription", () => {
    const useRouterMocked = jest.mocked(useRouter)
    const useSessionMocked = jest.mocked(useSession)
    const pushMock = jest.fn()

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "John Doe",
          email: "jhondoe@example.com"
        },
        activeSubscription: "fake-active-subscription",
        expires: "fake-expires"
      },
      status: "authenticated"
    })

    useRouterMocked.mockReturnValueOnce({
      push: pushMock
    } as any)

    render(<SubscribeButton/>)

    const subscribeButton = screen.getByText("Subscribe now")

    fireEvent.click(subscribeButton)

    expect(pushMock).toHaveBeenCalledWith("/posts")
  })
})

