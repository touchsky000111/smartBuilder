import axios from "axios";

export const domain = process.env.NEXT_PUBLIC_API_DOMAIN || "http://localhost:8080";
// export const domain = "http://198.23.235.73:8080";

export async function SignUp({
  email,
  password,
  passwordConfirmation,
  fullName,
  userAvatar,
  userName,
  phoneNumber,
  companyName,
  companyLogo,
  role,
  comments,
}: {
  email: string;
  password: string;
  passwordConfirmation: string;
  fullName: string;
  userAvatar: Blob | null;
  userName: string;
  phoneNumber: string;
  companyName: string;
  companyLogo: Blob | null;
  role: string;
  comments: string;
}) {
  try {
    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", passwordConfirmation); // match backend name
    formData.append("fullName", fullName);
    formData.append("userName", userName);
    formData.append("phoneNumber", phoneNumber);
    formData.append("companyName", companyName);
    formData.append("role", role);
    formData.append("comments", comments);

    if (userAvatar) {
      formData.append("userLogo", userAvatar, "avatar.png"); // add filename
    }

    if (companyLogo) {
      formData.append("companyLogo", companyLogo, "logo.png"); // add filename
    }

    const response = await axios.post(`${domain}/api/v1/auth/register`, {
      email,
      password,
      passwordConfirmation,
      fullName,
      userName,
      phoneNumber,
      companyName,
      role,
      comments
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log("User registered successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Registration failed:",
      error?.response?.data || error.message,
    );
    throw error;
  }
}

export async function SignIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const response = await axios.post(`${domain}/api/v1/auth/login`, {
      email,
      password,
    });

    const { token, type, expires_in } = response.data.authorization;
    const user = response.data.user;

    console.log("Login successful:", user);

    return {
      success: true,
      user,
      token,
      type,
      expires_in,
    };
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Login failed. Please try again.";
    // console.error("Login error:", message);

    return {
      success: false,
      message,
      status: error?.response?.status || 500,
    };
  }
}
