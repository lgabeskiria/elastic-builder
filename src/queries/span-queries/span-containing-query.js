'use strict';

const SpanLittleBigQueryBase = require('./span-little-big-base');

/**
 * Returns matches which enclose another span query. The span containing query
 * maps to Lucene `SpanContainingQuery`.
 *
 * Matching spans from big that contain matches from little are returned.
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-span-containing-query.html)
 *
 * @example
 * const spanQry = bob.spanContainingQuery()
 *  .little(bob.spanTermQuery('field1', 'foo'))
 *  .big(bob.spanNearQuery()
 *      .clauses([
 *          bob.spanTermQuery('field1', 'bar'),
 *          bob.spanTermQuery('field1', 'baz')
 *      ])
 *      .slop(5)
 *      .inOrder(true))
 *
 * @extends SpanLittleBigQueryBase
 */
class SpanContainingQuery extends SpanLittleBigQueryBase {

    /**
     * Creates an instance of `SpanContainingQuery`
     */
    constructor() {
        super('span_containing');
    }
}

module.exports = SpanContainingQuery;
