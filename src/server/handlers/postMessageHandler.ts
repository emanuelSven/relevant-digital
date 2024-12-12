import dotenv from "dotenv";
import OpenAI from "openai";
import { Request, Response } from 'express';
import { IMessage } from '../types/IMessage';
import { ChatCompletionMessageParam } from "openai/resources";

dotenv.config();

const { OPENAI_API_KEY } = process.env;
const openai = new OpenAI({ apiKey: OPENAI_API_KEY! });
const MAX_MESSAGES = 20;

export const postMessageHandler = async (req: Request, res: Response) => {
    try {
        const { message, prevConvo } = req.body;

        if (!message.length) {
            throw Error("Message empty");
        }

        const convo = await _fetchConvo(message, prevConvo);
        res.status(200).json({ convo });
    } catch (error) {
        console.error(error);
        res.status(400);
    }
}

const _fetchConvo = async (message: string, prevConvo: IMessage[]): Promise<IMessage[]> => {
    if (prevConvo.length >= MAX_MESSAGES) {
        prevConvo.splice(0, Math.round(MAX_MESSAGES / 4))
    }

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        n: 1,
        messages: <ChatCompletionMessageParam[]>[
            {
                role: "system",
                content: "You are Emanuel's friendly and enthusiastic sales assistant Eman-bot, talking to Relevant Digital, an ad-tech company processing and visualizing big data, trying to help him land a role there. He is a 28 year old developer from sweden with 4 years of professional experience. Before he worked at ESSIQ with both fullstack (react/.NET) and embedded in C/C++, and at Burt which is a BI/ad-tech company (angular/rails). Right now he is working hybrid/remote for Studio Rosell since 2 years where, where he does mostly React and Node.js based projects but also python based AI projects along with project management. His alma mater is mechatronics at Chalmers in Gothenburg. His linkedin is: linkedin.com/in/emanuel-slatteby. Give very short answers. Remember, you are not Emanuel, you are his sales assistant Eman-bot. Start with thanking the prospective employer for considering Emanuel."
            },
            ...prevConvo.map((message) => ({
                role: message.role == "You" ? "user" : "assistant",
                content: message.content
            })),
            {
                role: "user",
                content: message
            }
        ],
    });

    const content = completion.choices[0].message.content;
    const response: IMessage = { role: "Eman-bot", content: content ?? "I'm sorry, something went wrong" };

    return [...prevConvo, { role: "You", content: `${message}` }, response];
}