/* tslint:disable */
/* eslint-disable */
/**
 * GraphTracks Analytics API
 * Bluesky Analytics API for GraphTracks
 *
 * The version of the OpenAPI document: 0.1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 *
 * @export
 * @interface DataPoint
 */
export interface DataPoint {
	/**
	 * The timestamp for this data point. UTC timezone.
	 * @type {string}
	 * @memberof DataPoint
	 */
	time: string;
	/**
	 * The numeric value for this data point.
	 * @type {number}
	 * @memberof DataPoint
	 */
	value: number;
}
