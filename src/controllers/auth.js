import User from "../models/user";
import { singupSchema, singinSchema } from "../Schema/auth";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const singup = async (req, res) => {
    try {
        const { error } = singupSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors
            });
        }
        const userExit = await User.findOne({ email: req.body.email });
        if (userExit) {
            return res.status(400).json({
                message: "Email đã tồn tại",
            });

        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            ...req.body,
            password: hashedPassword
        });
        const token = jwt.sign({ id: user._id }, "banThayDat", { expiresIn: "1d" });
        user.password = undefined;
        return res.status(201).json({
            message: "Tạo tài khoản thành công",
            accessToken: token,
            user,
        });
    } catch (error) {

    }

}
// B1: Kiểm tra thông tin req.body có hợp lệ hay không
// B2: Kiểm tra email đã tồn tại hay chưa?
// B2.1: Mã hóa mật khẩu trước khi tạo user mới
// B3: Tạo user mới
// B4: Tạo token mới chứa id của user
// B5: Trả về client

export const singin = async (req, res) => {
    console.log(1);
    try {
        const { error } = singinSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);

            return res.status(400).json({
                messages: errors,
            });
        }

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({
                messages: "Email không tồn tại",
            });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                messages: "Sai mật khẩu",
            });
        }
        const token = jwt.sign({ id: user._id }, "banThayDat", { expiresIn: "1d" });
        user.password = undefined;
        return res.status(200).json({
            message: "Đăng nhập thành công",
            accessToken: token,
            user,
        });
    } catch (error) { }
};
// Đăng nhập
// B1: Kiểm tra thông tin req.body có hợp lệ hay không
// B2: Kiểm tra email đã tồn tại hay chưa?
// B2.1: So sánh password client với password trong db
// B3: Tạo token mới chứa id của user
// B4: Trả về client

export const getuser = async (req, res) => {
    try {
        const user = await User.find()
        if (user.length === 0) {
            res.status(404).json({
                message: "Không có tài khoản nào",
            });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }

}
export const removeUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete({ _id: req.params.id });
        return res.status(200).json({
            message: "User đã được xóa thành công",
            user,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};