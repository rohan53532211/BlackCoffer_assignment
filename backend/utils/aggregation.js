const Insight = require("../models/data");

const aggregateMetric = async ({
    groupBy,
    metric = null,
    operation = "count",
    limit = 10
}) => {

    const operations = {

        count: { $sum: 1 },

        avg: { $avg: `$${metric}` },

        sum: { $sum: `$${metric}` },

        max: { $max: `$${metric}` },

        min: { $min: `$${metric}` }

    };

    if (!operations[operation]) {

        throw new Error("Invalid aggregation operation.");

    }

    const pipeline = [

        {
            $match: {

                [groupBy]: {

                    $exists: true,

                    $ne: ""

                }

            }

        },

        {
            $group: {

                _id: `$${groupBy}`,

                value: operations[operation]

            }

        },

        {
            $sort: {

                value: -1

            }

        },

        {
            $limit: limit

        },

        {
            $project: {

                _id: 0,

                label: "$_id",

                value: 1

            }

        }

    ];

    return await Insight.aggregate(pipeline);

};

const aggregateByField = async (field, filters = {}) => {

    const query = {};

    Object.entries(filters).forEach(([key, value]) => {

        if (value && typeof value === "string" && value.trim() !== "") {

            query[key] = value.trim();

        }

    });

    const pipeline = [

        {
            $match: {

                ...query,

                [field]: {

                    $exists: true,

                    $ne: ""

                }

            }

        },

        {
            $group: {

                _id: `$${field}`,

                intensity: { $avg: "$intensity" },

                likelihood: { $avg: "$likelihood" },

                relevance: { $avg: "$relevance" },

                count: { $sum: 1 }

            }

        },

        {
            $sort: {

                count: -1

            }

        },

        {
            $project: {

                _id: 0,

                label: "$_id",

                intensity: { $round: ["$intensity", 2] },

                likelihood: { $round: ["$likelihood", 2] },

                relevance: { $round: ["$relevance", 2] },

                count: 1

            }

        }

    ];

    return await Insight.aggregate(pipeline);

};

module.exports = {

    aggregateMetric,

    aggregateByField

};