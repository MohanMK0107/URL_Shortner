import type { Request, Response } from "express";
import Url from "../models/url.model.ts";
import crypto from "crypto"


export const createShortUrl = async (
    req: Request,
    res: Response
) => {
    try {
        console.log(JSON.stringify(req.body))
        const { url, alias } = req.body;
        const existingUrl = await Url.findOne({
            originalUrl: url
        });
        if (existingUrl) {
            return res.status(200).json({
                success: true,
                message: "URL already exists",
                shortUrl: `${process.env.BASE_URL}/${existingUrl.shortCode}`
            });
        }
        let code = crypto.randomBytes(7).toString("base64url").slice(0, 7);

        while (await Url.exists({ shortCode: code })) {
            code = crypto.randomBytes(7).toString("base64url").slice(0, 7);
        }

        const generatedUrl = await Url.create({
            originalUrl: url,
            alias: alias ?? '',
            shortCode: code
        })
        const shortUrl = `http://shrinkly/${generatedUrl.alias ? `${generatedUrl.alias}/${generatedUrl.shortCode}` : generatedUrl.shortCode}`;

        return res.status(201).json({
            success: true,
            message: "URL generated Successfully",
            shortUrl
        });

    }
    catch (error) {
        console.error("Create URL Error:", error);

        return res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Internal server error",
        });
    }
}