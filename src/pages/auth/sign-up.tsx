import useMetaTagUpdater from "../../utils/useMetaTagUpdater";
import useTitleUpdater from "../../utils/useTitleUpdater";

const SignUp = () => {
  useTitleUpdater({ "/sign-up": "Connect-Surf-Smile | Sign Up" });
  useMetaTagUpdater({
    "/sign-up": [
      { name: "description", content: "This is the sign-up page description." },
      { name: "keywords", content: "sign up, registration, user" },
    ],
  });
  return <div>SignUp</div>;
};

export default SignUp;
