import { statusCode } from "../constants/statusCodes.js";
import token from "../helper/jwt.js";
import authService from "../services/userAuth.js";

const addUser = async (req, res, next) => {
  try {
    const bodyData = req.body;
    const response = await authService.addUser(bodyData);
    const accessToken = token.generateToken(
      { ...response },
      { expiresIn: "1d" }
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: true,
      secure: true,
      path: "/",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });
    return res.status(statusCode.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const response = await authService.login(email, password);

    const accessToken = token.generateToken(
      { ...response },
      { expiresIn: "1d" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: true,
      secure: true,
      path: "/",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    return res.status(statusCode.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: true,
    path: "/",
  });
  return res
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
};

const authController = {
  addUser,
  login,
  logout,
};

export default authController;
