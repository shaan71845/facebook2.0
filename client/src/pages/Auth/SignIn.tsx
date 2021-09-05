import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../../actions/auth";
import { useHistory } from "react-router-dom";
import { RootState } from "../../reducers/index";
import { toast, Flip } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
import FormInput from "../../components/FormInput";
import GoogleAuth from "../../components/GoogleAuth";
import Button from "../../components/Button";
import { useMutation } from "react-query";
import { AUTH } from "../../constants";

interface FormData {
  email: string;
  password: string;
}

const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const error = useSelector((state: RootState) => state.error);

  const mutation = useMutation((formData: FormData) => signIn(formData), {
    onSuccess: (profile) => {
      localStorage.setItem("profile", JSON.stringify(profile));
      dispatch({ type: AUTH, payload: profile });
      history.push("/");
    },
    onError: (err: any) => {
      toast.error(err.response.data.err, {
        transition: Flip,
      });
      formik.resetForm();
    },
  });

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("You must provide valid email")
        .required("Email is required!"),
      password: yup.string().trim().required("Password is required!"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      await mutation.mutateAsync(values);
      setSubmitting(false);
    },
  });

  useEffect(() => {
    // Redirect to home if the user is already logged in
    const profile = JSON.parse(localStorage.getItem("profile") || "{}");

    if (profile.token || profile.tokenId) {
      history.push("/");
    }
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-blue-50">
      <div className="p-6 rounded-lg flex sm:flex-row flex-col sm:w-full md:w-3/4">
        <div className="hero mb-6 block sm:mr-6 sm:w-full">
          <h1 className="text-fb text-4xl text-center sm:text-left sm:text-7xl font-extrabold">
            facebook
          </h1>
          <p className="text-lg text-center sm:text-left sm:text-xl my-3">
            Facebook helps you connect and share with people.
          </p>
        </div>
        <div className="login w-full sm:w-3/4 bg-white p-4 sm:p-10 rounded-lg shadow-md">
          <form onSubmit={formik.handleSubmit}>
            <FormInput
              as="normal"
              type="email"
              placeholder="Your Email"
              id="email"
              name="email"
              formik={formik}
              className="focus:ring-2 focus:ring-bg-blue-400 bg-gray-100 mb-5 w-full rounded-lg px-4 py-3 outline-none"
            />
            <FormInput
              as="password"
              type="psasword"
              placeholder="Your Password"
              id="password"
              name="password"
              formik={formik}
              className="focus:ring-2 focus:ring-bg-blue-400 bg-gray-100 mb-5 w-full rounded-lg px-4 py-3 outline-none"
            />
            <Button
              type="submit"
              isLoading={formik.isSubmitting}
              text="Login"
              variant="primary"
              className="py-2 px-4"
            />
            <div className="text-center mt-3">
              <Link to="/auth/signup" className="text-fb">
                New to Facebook? Create an Account
              </Link>
            </div>
            <div className="h-1 w-full my-8 bg-gray-200"></div>
            <GoogleAuth />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
