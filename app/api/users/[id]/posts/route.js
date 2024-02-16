import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt.model";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const { id } = params;

    const prompts = await Prompt.find({ creator: id }).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to retrieve all prompts.", { status: 500 });
  }
};
