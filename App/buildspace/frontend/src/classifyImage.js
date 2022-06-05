import mobilenet from "@tensorflow-models/mobilenet";

const model = await mobilenet.load()

/**
 * Classify the object pictured in the image stored in `img`
 * @param {Element} img the <img> tag containing the image to classify
 */
export default async function classifyImage(img) {
  const predictions = await model.classify(img)
  return predictions.reduce((prev, curr) => {
    return (prev.probability > curr.probability) ? prev : curr;
  });
}