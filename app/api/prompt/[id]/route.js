import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt.model";

// GET (read)
export const GET = async (request, { params }) => {
  const { id } = params;
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) {
      return new Response("Prompt not found.", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to retrieve the prompt.", { status: 500 });
  }
};

// PATCH (updated)
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  const { id } = params;

  try {
    connectToDB();

    const updatedPrompt = await Prompt.findByIdAndUpdate(
      id,
      {
        prompt,
        tag,
      },
      {
        new: true,
      }
    );

    if (!updatedPrompt) {
      return new Response("Prompt not found.", { status: 404 });
    }

    await updatedPrompt.save();

    return new Response(JSON.stringify(updatedPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update the prompt.", { status: 500 });
  }
};

// DELETE (delete)
export const DELETE = async (request, { params }) => {
  const { id } = params;

  try {
    connectToDB();

    const deletedPrompt = await Prompt.findByIdAndDelete(id);

    if (!deletedPrompt) {
      return new Response("Prompt not found.", { status: 404 });
    }

    return new Response("Prompt deleted successfully.", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete the prompt.", { status: 500 });
  }
};
