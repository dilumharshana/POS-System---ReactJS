import axios from "axios";
import { toast } from "react-toastify";

//styles
import "react-toastify/dist/ReactToastify.css";

//configs
import { config } from "../../../../configs/jsonConfig";

export const restore = async (
  isPremium,
  possystems,
  systemID,
  systemName,
  _id,
  history
) => {
  try {
    if (isPremium) {
      //check for name availability
      const nameIsInPosSystems = possystems.some(
        (system) => system.name === systemName
      );

      if (nameIsInPosSystems)
        return toast.error(
          `You  have " ${systemName}" in currently using Systems. 
      Rename that system to recover previous one `,
          { position: "bottom-left", theme: "colored", autoClose: false }
        );

      const response = await axios.post(
        "http://localhost:2001/api/possystems/restore",
        { systemID, _id },
        config
      );

      return toast.success(response);
    }

    return history.push("/payments");
  } catch (error) {
    toast.error(error.response.data);
  }
};
