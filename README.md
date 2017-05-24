# The Puzzle

On May 10th, 2017, Litecoin activated segregated witness. To celebrate the event, Charlie Lee posted a challenge to solve a Litecoin steganographic puzzle designed by Zd3n.

![An image of the Litecoin Segwit puzzle.](https://pbs.twimg.com/media/C_eldu1XsAABDFp.jpg:large "Litecoin Segwit Puzzle")


Charlie's announcement: [https://twitter.com/SatoshiLite/status/862339819619274753](https://twitter.com/SatoshiLite/status/862339819619274753)

Zd3n's site where the puzzle is hosted: [http://crypto.haluska.sk](http://crypto.haluska.sk)

We solved the puzzle in 13.5 days. Our solution and a description of the puzzle is provided here.

# Compiling the code:

g++ -Ofast -std=c++11 walk-backwards-decrypt-with-known-steps.cpp

g++ -Ofast -std=c++11 decrypt-guessing-encryption-with-known-steps.cpp

# Explanation:

This code makes up about 1/5th of what was written in total to solve the puzzle. The C++ code was originally written in JavaScript / Node.JS until I scrapped it and rewrote the entire thing over again to try to eke out the most performance. There were also a number of Python scripts mainly used for computing the SHA-256 hash.

I interpret the puzzle as an encryption scheme for a given private key. Starting with the 256 bits of a private key and the graph in the "hint 1" position, pick a node on the graph that has either a 1 or 0, depending on whether the first bit of your private key is a 1 or 0, respectively. Then, rotate the leading edge (or "paddle") clockwise and move to the second node. Rotate the "paddle" again and walk forward four times total (starting from the first node) to land on a fifth node. This is the bit that represents your "encrypted bit". Store that bit in the ring, starting at the 0th place. Do the same thing for the second bit, all the way to the last bit, filling the rings clockwise from the outside ring and then again filling the inner ring clockwise.

The four "hops" and five nodes are represented by the five dots connected with a line at the bottom of the puzzle. The three hints show the five stages in order.

Reading the files as SVGs was crucial to analyzing the puzzle, as it made verifying that the 28 graph nodes corresponded to the 256 ring nodes. (Though most of us used Photoshop or Gimp first to identify this was true.) In hint #3, the svg made it possible to determine that there was an order to the paths taken for the 3rd and 4th hop.

We parsed hint #3 and mapped each line to closest node points the night that the hint was released (see parseFinalSteps.js). Cleaning the SVG, we took all of the coordinates, put them into nested arrays, and then used the same coordinates for the graph nodes provided from the original puzzle, and found the 6 closest points to each line end. (Only 2 closest are needed to produce the answer.) These nodes are used as a filter - any paths that don't cross these nodes are considered dead ends, and the problem (and programs) becomes tractable.

Hints 1 and 2 show how the encoding process works, and it gives away the very first bit in the private key (1). If you follow the algorithm outlined above by hand starting at Node #5, you'll land on Node #28, which is the same as the first ring node. The second hint eliminated the majority of our fringe theories and left us with the remaining theory, which hint #3 cemented.

Before hint #3, our programs could not resolve the paths to reverse engineer the private key. I even rented three different Amazon EC2 instances for an hour (including the behemoth r4.16xlarge) to try and run the code to completion - but the way the code was written, and the sheer number of possiblities meant that we hit the memory wall around ring nodes 70 or 100 out of 256 (depending on how you approach the problem).

The two C++ programs approach the problem in two ways: "walk-backwards-decrypt" attempts to start at the last ring node and work backwards to the first ring node, and "decrypt-guessing-encryption" attempts to start at the first ring node in the hint state (an unlikely idea before hint #3 came out) and guess what was encrypted and work toward the last ring node.

To get around the memory issue, we collected all of the paths that led to identical paddle configurations after each ring node was decrypted. The number of paths quickly becomes exponentially large, and storing the bit values for those paths without losing information meant consuming many hundreds of gigabytes of RAM. Even with Hint #3 to filter out the points, the memory issue is still overwhelming.

To get around this problem, we dump the collected keys every 64 ring nodes into files (after filling up 64 bit integers) and then start collecting the values again from scratch. This leaves us with a permutation of 4 sets of 64 keys, knowing only their order, but not which set of bits are related. This makes the problem solvable and the programs can now reach the 256th node, but it still gives us a minimum of a few million keys to work with. Simple to hash, but not simple to test generating private keys.

The nice thing about solving this puzzle is that both methods (and programs) give you the answer - you can work backwards, decrypting each bit one at a time, or you can guess what values were encrypted and work forward. And if you run either file, both of them find the answer and both land on the expected starting or ending paddle positions.

By using the outputs from both programs and finding only those sets of bits that appeared in both sets, we reduced the number of possible keys to about 32 thousand, and then ran all of them through gen_wif_single_file.js, which found the matching public key to resolve the answer.

We never got the SHA-256 hash to work.
