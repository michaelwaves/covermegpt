import { useNavigate } from "react-router-dom";

const navigator = useNavigate()

export const navigate = (path: string) => {
    navigator(path)
}
