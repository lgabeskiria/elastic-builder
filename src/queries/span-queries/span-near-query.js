'use strict';

const _ = require('lodash');

const {
    util: { checkType }
} = require('../../core');

const SpanQueryBase = require('./span-query-base');

/**
 * Matches spans which are near one another. One can specify `slop`, the maximum
 * number of intervening unmatched positions, as well as whether matches are
 * required to be in-order. The span near query maps to Lucene `SpanNearQuery`.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-span-near-query.html)
 *
 * @example
 * const spanQry = bob.spanNearQuery()
 *  .clauses([
 *      bob.spanTermQuery('field', 'value1'),
 *      bob.spanTermQuery('field', 'value2'),
 *      bob.spanTermQuery('field', 'value3')
 *  ])
 *  .slop(12)
 *  .inOrder(false);
 *
 * @extends SpanQueryBase
 */
class SpanNearQuery extends SpanQueryBase {

    /**
     * Creates an instance of `SpanNearQuery`
     */
    constructor() {
        super('span_near');
    }

    /**
     * Sets the clauses element which is a list of one or more other span type queries.
     *
     * @param {Array<SpanQueryBase>} clauses
     * @returns {SpanNearQuery} returns `this` so that calls can be chained.
     * @throws {TypeError} If parameter `clauses` is not an instance of Array or if
     * any member of the array is not an instance of `SpanQueryBase`.
     */
    clauses(clauses) {
        checkType(clauses, Array);
        _.invokeMap(clauses, clause => checkType(clause, SpanQueryBase));

        this._queryOpts.clauses = clauses;
        return this;
    }

    /**
     * Configures the `slop`(default is 0), the maximum number of intervening
     * unmatched positions permitted.
     *
     * @param {number} slop A positive integer value, defaults is 0.
     * @returns {SpanNearQuery} returns `this` so that calls can be chained.
     */
    slop(slop) {
        this._queryOpts.slop = slop;
        return this;
    }

    // TODO: Add documentation for inOrder

    /**
     *
     * @param {boolean} enable
     * @returns {SpanNearQuery} returns `this` so that calls can be chained.
     */
    inOrder(enable) {
        this._queryOpts.in_order = enable;
        return this;
    }
}

module.exports = SpanNearQuery;
