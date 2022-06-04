import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';

import cocoSsd from '@tensorflow-models/coco-ssd';

const model = await cocoSsd.load();

/**
 * Count the number of cats and dogs in the image `img`
 * @param {Element} img the <img> tag containing the image to classify
 * 
 * @returns {int[]} The number of cats and dogs, where arr[0] is the number
 *  of dogs and arr[1] is the number of cats
 */
export default async function countCatsAndDogs(img) {
  const predictions = await model.detect(img);
  const result = [0, 0]
  predictions.forEach((pred) => {
    if (pred.class === 'dog')
      ++result[0];
    else if (pred.class === 'cat')
      ++result[1];
  });
  return result;
}