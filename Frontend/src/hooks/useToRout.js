import { useNavigate } from "react-router-dom";

export const useToRoute = () => {
    const navigate = useNavigate();

    const goToRoute = (path, stateObj) => {
        navigate(`${path}`, { state: stateObj });
    };

    return goToRoute;
};