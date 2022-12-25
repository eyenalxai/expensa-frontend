import { Button } from "@components/button"
import { useNavigate } from "@solidjs/router"
import clsx from "clsx"

export const BackButton = () => {
  const navigate = useNavigate()
  return (
    <Button
      onClick={() => navigate("/categories")}
      class={clsx("button-height", "px-2")}
    >
      categories
    </Button>
  )
}
