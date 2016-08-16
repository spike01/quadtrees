// your code should live in ../index.js
const mod = process.env.VS_EXAMPLE ? require("../example") : require("..");
const quadtree = mod.tree;
const topLeft = mod.topLeft;
const topRight = mod.topRight;
const bottomLeft = mod.bottomLeft;
const bottomRight = mod.bottomRight;
const expand = mod.expand;
const _ = require("lodash");

const assert = require("chai").assert;

const t = true;
const f = false;

describe('quadtree', function() {

  describe('compression', function() {

    it('compresses 1bit images', function() {
      const tree = quadtree([
        t,t,
        t,t
      ]);
        
      assert.equal(tree, true);
    })

    it('compresses 1bit subnodes', function() {
      const tree = quadtree([
        t,t,t,f,
        t,t,f,t,
        f,f,t,t,
        f,f,t,t]);


      assert.deepEqual(tree, [t,[t,f,f,t],f,t]);
    });

    it('finds the top left quadrant of a 4x4 square', function() {
      const image = [0,1,2,3,
                    4,5,6,7,
                    8,9,10,11,
                    12,13,14,15]
      assert.deepEqual(topLeft(image), [0,1,4,5])
    })

    it('finds the top right quadrant of a 4x4 square', function() {
      const image = [0,1,2,3,
                    4,5,6,7,
                    8,9,10,11,
                    12,13,14,15]
      assert.deepEqual(topRight(image), [2,3,6,7])
    })

    it('finds the bottom left quadrant of a 4x4 square', function() {
      const image = [0,1,2,3,
                    4,5,6,7,
                    8,9,10,11,
                    12,13,14,15]
      assert.deepEqual(bottomLeft(image), [8,9,12,13])
    })

    it('finds the bottom right quadrant of a 4x4 square', function() {
      const image = [0,1,2,3,
                    4,5,6,7,
                    8,9,10,11,
                    12,13,14,15]
      assert.deepEqual(bottomRight(image), [10,11,14,15])
    })

    it('compresses 4bit nodes', function() {
      const tree = quadtree([
        t,t,
        t,f]);


      assert.deepEqual(tree, [t,t,t,f]);
    });


    it.skip('compresses beyond 1 level', function() {
      // quadtree with final bit false - should
      // have three top level booleans
      const trues = fill(true, 64);
      trues[63] = false;

      const compressed = quadtree(trues);

      assert.equal(compressed[0], true);
      assert.equal(compressed[1], true);
      assert.equal(compressed[2], true);
      assert.deepEqual(compressed[3].slice(0,3), [t,t,t]);
    })
    
    function assertQuadtree(x, msg) {
      assert.isArray(x, msg + " should be a quadtree");
      return x;
    }
    


  })

})

describe.skip('round-trip', function() {

  it.skip('round-trips 4x4', function() {
    const original = [
      t,t,t,t,
      t,t,f,f,
      f,t,f,t,
      f,f,f,f
    ];
    const tree = quadtree(original.slice());

    assert.deepEqual(expand(tree, 4), original);
  })

  it('round trips 32x32', function() {
    const input = fill(true, 32 * 32);
    input[77] = false;
    input[942] = false;
    input[1023] = false;

    const tree = quadtree(input.slice());

    assert.deepEqual(expand(tree, 32), input);
  })

  it.skip('round trips a thumbnail sized image', function() {
    const input = fill(true, 512 * 512);
    
    input[77] = false;
    input[942] = false;
    input[input.length - 1] = false;

    const tree = quadtree(input.slice());

    assert(_.isEqual(expand(tree, 512), input), "unequal (diff too large to display)");
  })

})

describe("expansion", function() {


  it.skip('expands compressed nodes', function() {

    const image = expand(t, 2);

    assert.deepEqual(image, [
      t,t,
      t,t]);

  })

  it.skip('expands base-case trees', function() {
    
    const image = expand([t,t,f,t], 2);

    assert.deepEqual(image, [t,t,f,t]);
  })

  it.skip('expands single depth trees', function() {

    const image = expand([t,[f,t,f,t],t,f], 4);

    assert.deepEqual(image, [
      t,t,f,t,
      t,t,f,t,
      t,t,f,f,
      t,t,f,f]);

    /*
    1 = O
    2 = O + w * 1 + 1
    3 = O + w * 2 + 3

    1xxx
    x2xx
    xxx3 
    */

  })

  it.skip('expands multiple depth trees', function() {

    const image = expand([t,[f,t,[t,f,t,f],t],t,f], 8);

    assert.deepEqual(image, [
      t,t,t,t,f,f,t,t,
      t,t,t,t,f,f,t,t,
      t,t,t,t,t,f,t,t,
      t,t,t,t,t,f,t,t,
      t,t,t,t,f,f,f,f,
      t,t,t,t,f,f,f,f,
      t,t,t,t,f,f,f,f,
      t,t,t,t,f,f,f,f,
    ]);

    /*
    1 = O
    2 = O + w * 1 + 1
    3 = O + w * 2 + 3

    1xxx
    x2xx
    xxx3 
    */

  })

})

function fill(x, n) {
  return Array.from({ length: n }, () => x);
}
