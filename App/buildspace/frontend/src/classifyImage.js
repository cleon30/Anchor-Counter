import mobilenet from "@tensorflow-models/mobilenet";

const model = await mobilenet.load()

/**
 * Classify the object pictured in the image stored in `img`
 * @param {Element} img the <img> tag containing the image to classify
 */
export default async function classifyImage(img) {
  return await model.classify(img)
}