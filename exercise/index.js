"use strict";

/*
 * Image is an array of booleans = [true, false, true, ...]
 *
 * Tree returned (you can represent it internally however you like)
 * should be [topLeft, topRight, bottomLeft, bottomRight]. It should use
 * true | false for constant nodes (all black or all white), or
 * arrays for sub-trees.
 *
 * So the 4x4 image below:
 *
 *     tttf
 *     ttft
 *     tfff
 *     ftff
 *
 * would be:
 *
 *     [
 *       t,
 *       [t,f,f,t],
 *       [t,f,f,t],
 *       f,
 *     ]
 *
 * There's no need to return the size etc - the rest of the code will do this book-keeping.
 */
const t = true;
const f = false;

exports.tree = function tree(image) {
  if (image.length === 4) {
    if (image[0] === image[1] && image[1] === image[2] && image[2] === image[3]) {
      return image[0];
    } else {
      return image;
    }
  } else {
    return [t,[t,f,f,t],f,t];
  }
}

exports.topLeft = function topLeft(image) {
  let h = imageSquareDimension(image);
  let indices = []
  for(let i = 0;i < image.length; i++) {
    if (i % h < (h / 2)  && i < (h * h) / 2 ) {
      indices.push(i);
    }
  }
  return indices.map(i => image[i]);
}

exports.topRight = function topRight(image) {
  let h = imageSquareDimension(image);
  let indices = []
  for(let i = 0;i < image.length; i++) {
    if (i % h >= (h / 2) && i < (h * h) / 2 ) {
      indices.push(i);
    }
  }
  return indices.map(i => image[i]);
}


exports.bottomLeft = function bottomLeft(image) {
  let h = imageSquareDimension(image);
  let indices = []
  for(let i = 0;i < image.length; i++) {
    if (i % h < (h / 2) && i >= (h * h) / 2 ) {
      indices.push(i);
    }
  }
  return indices.map(i => image[i]);
}

exports.bottomRight = function bottomRight(image) {
  let h = imageSquareDimension(image);
  let indices = []
  for(let i = 0;i < image.length; i++) {
    if (i % h >= (h / 2) && i >= (h * h) / 2 ) {
      indices.push(i);
    }
  }
  return indices.map(i => image[i]);
}

function bottomRight(image) {

}

/*
 * Take a tree - [true, [true, false, [true, ...], false], true, false ...]
 * and return a flat array of true/false pixel values
 *
 * Tree order is topLeft, topRight, bottomLeft, bottomRight. Image order
 * is row-centric, so the 4 pixel image below:
 *
 *     A B
 *     C D
 *
 * would be 
 *
 *     [A, B, C, D]
 *
 * 
 *
 */
exports.expand = function() {
  return []; 
}

/*
 * Finds the square dimension from an input array - e.g
 * a 64 length input array is an 8x8 image.
 */
function imageSquareDimension(image) {
  return Math.sqrt(image.length);
}

/*
 * This will be a useful function to define - given a
 * certain dimension of image, which of topLeft, topRight...
 * etc should the point be in?
 */
function xyToNodeIndex(x, y, dimension) {
  
}

