import * as lodash from 'lodash';

import { Injectable } from '@nestjs/common';

class Node {
  start: number;
  weight: number;

  constructor(start: number, weight: number) {
    this.start = start;
    this.weight = weight;
  }
}

@Injectable()
export class AppService {
  /**
   * Converts a sequence of `0` and `1` symbols in a string to the number of
   * consecutive `1` symbols if we can remove one `0` or move one `1` to fill a gap.
   *
   * It considers the sequence as a graph-like chain where a node cost is a number
   * of consecutive `1` symbols and a distance is a number of consecutive `0` symbols.
   *
   * @param {string} sequence
   * @return {*}  {number}
   * @memberof AppService
   */
  maxOnesSequence(sequence: string): number {
    const chain: Array<Node> = [];

    let nodeStart = 0;
    let nodeWeight = 0;

    for (const [idx, symbol] of sequence.split('').entries()) {
      if (symbol == '1') {
        if (nodeWeight == 0) nodeStart = idx;
        ++nodeWeight;
      } else if (nodeWeight > 0) {
        chain.push(new Node(nodeStart, nodeWeight));
        nodeWeight = 0;
      }
    }
    // add the latest group
    if (nodeWeight > 0) chain.push(new Node(nodeStart, nodeWeight));

    // one or zero nodes, count `1`
    if (chain.length < 2) return (sequence.match(/1/g) || []).length;

    // Longest sequence in a not modified sequence
    let best = 0;
    for (const node of chain) {
      if (node.weight > best) best = node.weight;
    }

    // Consider modified sequence
    const distances: Array<number> = [];

    const nodePairs = lodash.zip(
      chain.slice(0, chain.length - 1),
      chain.slice(1),
    );

    for (const [currNode, nextNode] of nodePairs) {
      const distance = nextNode.start - (currNode.start + currNode.weight);
      distances.push(distance);
    }

    for (const [idx, distance] of distances.entries()) {
      if (distance == 1) {
        // try to find a spare "1" to fill the gap
        let segment = 0;
        if (chain.length > 2) {
          // we can take 1 from another group, fill the gap
          segment = chain[idx].weight + chain[idx + 1].weight + 1;
        } else {
          // we can't take 1 from another group, remove the gap
          segment = chain[idx].weight + chain[idx + 1].weight;
        }
        if (segment > best) best = segment;
      } else {
        // try to find a spare "1" to add to the group
        let segment1 = 0;
        let segment2 = 0;
        if (chain.length >= 2) {
          segment1 = chain[idx].weight + 1;
          segment2 = chain[idx + 1].weight + 1;
        }
        if (segment1 > best) best = segment1;
        if (segment2 > best) best = segment2;
      }
    }
    return best;
  }
}
