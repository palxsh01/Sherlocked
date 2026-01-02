import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit("my-limit-key");

        if (!success) return res.status(429).json({ message: "Too many requests have been made at this time, please wait before trying again." });
        
        next();
    } catch (error) {
        console.error("Error in rateLimiter", error);
        next(error);
    }
}

export default rateLimiter;