import User from "../model/User.js";

export const getAllUser = async (req, res) => {
    try {
        const users = await User.find({}).select('_id name email createdAt');
        const formattedUsers = users.map(user => ({
            id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        }));
        res.status(200).json(formattedUsers);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};
